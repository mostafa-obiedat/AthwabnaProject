const Order = require("../models/Order");
const Address = require("../models/Address");
const Coupon = require("../models/Coupon");
const User = require("../models/User");
const Product = require("../models/Product");

exports.applyCoupon = async (req, res) => {
  try {
    const { couponCode } = req.body;
    const userId = req.user._id;

    const coupon = await Coupon.findOne({ code: couponCode, isActive: true });
    if (!coupon) {
      return res
        .status(404)
        .json({ message: "كوبون غير صالح أو منتهي الصلاحية" });
    }

    // التحقق من صلاحية الكوبون
    if (coupon.validUntil < new Date()) {
      return res.status(400).json({ message: "انتهت صلاحية هذا الكوبون" });
    }

    if (coupon.maxUses && coupon.currentUses >= coupon.maxUses) {
      return res
        .status(400)
        .json({ message: "تم استخدام هذا الكوبون بالكامل" });
    }

    // إضافة الكوبون للمستخدم
    await User.findByIdAndUpdate(userId, {
      $addToSet: { coupons: coupon._id },
    });

    res.json({
      success: true,
      coupon: {
        code: coupon.code,
        discountType: coupon.discountType,
        discountValue: coupon.discountValue,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "حدث خطأ أثناء تطبيق الكوبون" });
  }
};

// controllers/checkoutController.js
exports.saveAddress = async (req, res) => {
  try {
    // التحقق من وجود مستخدم مصادق عليه
    if (!req.user || !req.user._id) {
      return res.status(401).json({
        success: false,
        message: "غير مصرح. الرجاء تسجيل الدخول",
      });
    }

    const { city, address, isDefault } = req.body;

    if (!city || !address) {
      return res.status(400).json({
        success: false,
        message: "المدينة والعنوان مطلوبان",
      });
    }

    const newAddress = new Address({
      user: req.user._id, // استخدام ID المستخدم من المصادقة
      city,
      address,
      isDefault: isDefault || false,
    });

    await newAddress.save();

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
  } catch (error) {
    console.error("Error saving address:", error);
    res.status(500).json({
      success: false,
      message: "حدث خطأ في الخادم أثناء حفظ العنوان",
      error: error.message,
    });
  }
};
exports.createOrder = async (req, res) => {
  try {
    const {
      products,
      shippingMethod,
      shippingAddressId,
      paymentMethod,
      couponCode,
    } = req.body;

    // التحقق من البيانات المطلوبة
    if (!products || !products.length || !shippingAddressId || !paymentMethod) {
      return res.status(400).json({
        success: false,
        message: "بيانات الطلب غير مكتملة",
      });
    }

    const userId = req.user._id;

    // حساب المجموع الفرعي
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

    // حساب رسوم الشحن
    let shippingFee = 0;
    if (shippingMethod === "aramex") {
      shippingFee = 5;
    } else if (shippingMethod === "local") {
      shippingFee = 3;
    }

    // تطبيق الكوبون إذا وجد
    let discountAmount = 0;
    if (couponCode) {
      const coupon = await Coupon.findOne({ code: couponCode });
      if (coupon) {
        if (coupon.discountType === "percentage") {
          discountAmount = subtotal * (coupon.discountValue / 100);
        } else {
          discountAmount = coupon.discountValue;
        }

        // تحديث استخدام الكوبون
        await Coupon.findByIdAndUpdate(coupon._id, {
          $inc: { currentUses: 1 },
          $addToSet: { usedBy: userId },
        });
      }
    }

    // حساب الإجمالي
    const total = subtotal + shippingFee - discountAmount;

    // إنشاء الطلب
    const order = new Order({
      user: userId,
      products: productsWithDetails,
      subtotal,
      shippingFee,
      total,
      shippingMethod,
      shippingAddress: shippingAddressId,
      paymentMethod,
      couponUsed: couponCode ? coupon._id : null,
      discountAmount,
    });

    await order.save();

    // إضافة الطلب للمستخدم
    await User.findByIdAndUpdate(userId, { $addToSet: { orders: order._id } });

    // معالجة الدفع
    // يمكنك هنا الاتصال بخدمة الدفع مثل Stripe أو Paymob

    res.status(201).json({
      success: true,
      order,
      message: "تم إنشاء الطلب بنجاح",
    });
  } catch (error) {
    console.error("Order creation error:", error);
    res.status(500).json({
      success: false,
      message: "حدث خطأ أثناء إنشاء الطلب",
      error: error.message,
    });
  }
};
