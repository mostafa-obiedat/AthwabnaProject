const Order = require("../models/Order");
const Address = require("../models/Address");
const Coupon = require("../models/Coupon");
const User = require("../models/User");
const Product = require("../models/Product");
const Notification = require("../models/Notification");
const asyncHandler = require("../utils/asyncHandler");

// رسوم الشحن حسب طريقة التوصيل
const SHIPPING_FEES = { aramex: 5, local: 3 };

// تطبيق كوبون خصم والتحقق من صلاحيته
exports.applyCoupon = asyncHandler(async (req, res) => {
  const { couponCode, orderTotal } = req.body;
  const userId = req.user._id;

  const coupon = await Coupon.findOne({ code: couponCode, isActive: true });
  if (!coupon) {
    return res.status(404).json({ message: "كوبون غير صالح أو غير مفعل" });
  }

  const now = new Date();

  if (coupon.validFrom > now) {
    return res.status(400).json({ message: "هذا الكوبون غير متاح بعد" });
  }

  if (coupon.validUntil < now) {
    return res.status(400).json({ message: "انتهت صلاحية هذا الكوبون" });
  }

  if (coupon.maxUses && coupon.currentUses >= coupon.maxUses) {
    return res.status(400).json({ message: "تم استخدام هذا الكوبون بالكامل" });
  }

  if (coupon.usedBy.includes(userId)) {
    return res.status(400).json({ message: "لقد استخدمت هذا الكوبون من قبل" });
  }

  if (coupon.minOrderAmount && orderTotal < coupon.minOrderAmount) {
    return res.status(400).json({
      message: `الحد الأدنى لاستخدام الكوبون هو ${coupon.minOrderAmount} د.أ`,
    });
  }

  coupon.usedBy.push(userId);
  coupon.currentUses += 1;
  await coupon.save();

  res.json({
    success: true,
    coupon: {
      code: coupon.code,
      discountType: coupon.discountType,
      discountValue: coupon.discountValue,
    },
  });
}, "حدث خطأ أثناء تطبيق الكوبون");

// حفظ عنوان شحن جديد للمستخدم
exports.saveAddress = asyncHandler(async (req, res) => {
  const { city, address, isDefault } = req.body;

  if (!city || !address) {
    return res.status(400).json({
      success: false,
      message: "المدينة والعنوان مطلوبان",
    });
  }

  const newAddress = new Address({
    user: req.user._id,
    city,
    address,
    isDefault: isDefault || false,
  });

  await newAddress.save();
  await User.findByIdAndUpdate(req.user._id, {
    $push: { savedAddresses: newAddress._id },
  });

  // عنوان افتراضي واحد فقط لكل مستخدم
  if (newAddress.isDefault) {
    await Address.updateMany(
      { user: req.user._id, _id: { $ne: newAddress._id } },
      { $set: { isDefault: false } }
    );
  }

  res.status(201).json({
    success: true,
    address: newAddress,
  });
}, "حدث خطأ في الخادم أثناء حفظ العنوان");

// إنشاء طلب جديد
exports.createOrder = asyncHandler(async (req, res) => {
  const { products, shippingMethod, shippingAddressId, paymentMethod, couponCode } =
    req.body;

  if (!products || !products.length || !shippingAddressId || !paymentMethod) {
    return res.status(400).json({
      success: false,
      message: "بيانات الطلب غير مكتملة",
    });
  }

  const userId = req.user._id;

  // حساب المجموع الفرعي مع جلب أسعار المنتجات الفعلية
  let subtotal = 0;
  const productsWithDetails = await Promise.all(
    products.map(async (item) => {
      const product = await Product.findById(item.product);
      if (!product) {
        throw new Error(`المنتج غير موجود: ${item.product}`);
      }
      subtotal += product.price * item.quantity;
      return {
        product: item.product,
        quantity: item.quantity,
        price: product.price,
      };
    })
  );

  const shippingFee = SHIPPING_FEES[shippingMethod] || 0;

  // تطبيق الكوبون إذا وجد
  let discountAmount = 0;
  let coupon = null;
  if (couponCode) {
    coupon = await Coupon.findOne({ code: couponCode });
    if (coupon) {
      discountAmount =
        coupon.discountType === "percentage"
          ? subtotal * (coupon.discountValue / 100)
          : coupon.discountValue;

      await Coupon.findByIdAndUpdate(coupon._id, {
        $inc: { currentUses: 1 },
        $addToSet: { usedBy: userId },
      });
    }
  }

  const total = subtotal + shippingFee - discountAmount;

  const order = new Order({
    user: userId,
    products: productsWithDetails,
    subtotal,
    shippingFee,
    total,
    shippingMethod,
    shippingAddress: shippingAddressId,
    paymentMethod,
    couponUsed: coupon ? coupon._id : null,
    discountAmount,
  });

  await order.save();

  await Notification.create({
    message: `🚨 طلب جديد من ${req.user.username}`,
    type: "order",
  });

  await User.findByIdAndUpdate(userId, { $addToSet: { orders: order._id } });

  res.status(201).json({
    success: true,
    order,
    message: "تم إنشاء الطلب بنجاح",
  });
}, "حدث خطأ أثناء إنشاء الطلب");
