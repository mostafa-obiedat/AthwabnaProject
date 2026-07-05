const { createPayPalOrder, createProductOrder } = require("../services/paypalService");
const Coupon = require("../models/Coupon");
const asyncHandler = require("../utils/asyncHandler");

// إنشاء طلب PayPal (لتسجيل الورشات)
exports.createOrder = asyncHandler(async (req, res) => {
  const { price } = req.body;

  if (!price) {
    return res.status(400).json({ message: "السعر مطلوب" });
  }

  const orderID = await createPayPalOrder(price);
  res.status(200).json({ orderID });
}, "فشل إنشاء الطلب");

// إنشاء طلب PayPal لشراء المنتجات مع دعم الكوبونات
exports.createProductPayment = asyncHandler(async (req, res) => {
  const { purchase_units, couponCode } = req.body;

  let totalPrice = parseFloat(purchase_units[0].amount.value);
  const description = purchase_units[0].items
    .map((item) => `${item.quantity}x ${item.name}`)
    .join(", ");

  // التحقق من الكوبون وتطبيق الخصم
  if (couponCode) {
    const coupon = await Coupon.findOne({ code: couponCode, isActive: true });

    if (!coupon) {
      return res.status(400).json({ message: "الكوبون غير صالح" });
    }

    const now = new Date();
    if (now < coupon.validFrom || now > coupon.validUntil) {
      return res.status(400).json({ message: "الكوبون منتهي أو لم يبدأ بعد" });
    }

    if (coupon.maxUses && coupon.currentUses >= coupon.maxUses) {
      return res.status(400).json({ message: "تم استخدام الكوبون لأقصى عدد مرات" });
    }

    if (coupon.minOrderAmount && totalPrice < coupon.minOrderAmount) {
      return res.status(400).json({
        message: `يجب أن تكون قيمة الطلب على الأقل ${coupon.minOrderAmount}`,
      });
    }

    if (coupon.discountType === "percentage") {
      totalPrice -= (coupon.discountValue / 100) * totalPrice;
    } else if (coupon.discountType === "fixed") {
      totalPrice -= coupon.discountValue;
    }

    // تأكد ما ينزل السعر عن صفر
    totalPrice = Math.max(totalPrice, 0).toFixed(2);
  }

  const orderData = await createProductOrder(totalPrice, description);
  res.status(200).json({ orderID: orderData.id });
}, "فشل إنشاء الطلب مع PayPal");
