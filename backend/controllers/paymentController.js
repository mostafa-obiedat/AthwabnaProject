const { createPayPalOrder, createProductOrder } = require("../services/paypalService");
const Payment = require("../models/Payment");
const Coupon = require("../models/Coupon"); 

exports.createOrder = async (req, res) => {
  try {
    const { price } = req.body;

    if (!price) {
      return res.status(400).json({ message: "السعر مطلوب" });
    }

    const orderID = await createPayPalOrder(price);
    res.status(200).json({ orderID });
  } catch (error) {
    console.error("Error in createOrder:", error.message);
    res.status(500).json({ message: "فشل إنشاء الطلب", error: error.message });
  }
};

exports.createProductPayment = async (req, res) => {
  try {
    const { purchase_units, couponCode } = req.body;

    let totalPrice = parseFloat(purchase_units[0].amount.value);
    const description = purchase_units[0].items
      .map(item => `${item.quantity}x ${item.name}`)
      .join(', ');

    // افحص الكوبون لو موجود
    if (couponCode) {
      const coupon = await Coupon.findOne({ code: couponCode, isActive: true });

      if (!coupon) {
        return res.status(400).json({ message: 'الكوبون غير صالح' });
      }

      const now = new Date();
      if (now < coupon.validFrom || now > coupon.validUntil) {
        return res.status(400).json({ message: 'الكوبون منتهي أو لم يبدأ بعد' });
      }

      if (coupon.maxUses && coupon.currentUses >= coupon.maxUses) {
        return res.status(400).json({ message: 'تم استخدام الكوبون لأقصى عدد مرات' });
      }

      if (coupon.minOrderAmount && totalPrice < coupon.minOrderAmount) {
        return res.status(400).json({ message: `يجب أن تكون قيمة الطلب على الأقل ${coupon.minOrderAmount}` });
      }

      // احسب الخصم
      if (coupon.discountType === 'percentage') {
        const discount = (coupon.discountValue / 100) * totalPrice;
        totalPrice -= discount;
      } else if (coupon.discountType === 'fixed') {
        totalPrice -= coupon.discountValue;
      }

      // تأكد ما ينزل السعر عن صفر
      totalPrice = Math.max(totalPrice, 0).toFixed(2);
    }

    const orderData = await createProductOrder(totalPrice, description)

    res.status(200).json({ orderID: orderData.id });
  } catch (error) {
    console.error("PayPal Product Order Error:", error);
    res.status(500).json({ message: 'فشل إنشاء الطلب مع PayPal' });
  }
};


// exports.createProductPayment = async (req, res) => {
//   try {
//     const { purchase_units } = req.body;
    
//     const totalPrice = purchase_units[0].amount.value;
//     const description = purchase_units[0].items
//       .map(item => `${item.quantity}x ${item.name}`)
//       .join(', ');
    
//     const orderData = await createProductOrder(totalPrice, description);
    
//     res.status(200).json({ orderID: orderData.id });
//   } catch (error) {
//     console.error("PayPal Product Order Error:", error);
//     res.status(500).json({ message: 'فشل إنشاء الطلب مع PayPal' });
//   }
// };

// exports.getPaymentHistory = async (req, res) => {
//   try {
//     const userId = req.user.id;

//     const payments = await Payment.find({ user: userId }).sort({ createdAt: -1 });

//     res.json({ success: true, payments });
//   } catch (error) {
//     console.error('Error fetching history:', error);
//     res.status(500).json({ success: false, message: 'فشل في جلب سجل المدفوعات' });
//   }
// };

// exports.capture = async (req, res) => {
//   const { orderID } = req.body;

//   if (!orderID) {
//     return res.status(400).json({ success: false, message: 'Missing order ID' });
//   }

//   try {
//     const request = new paypal.orders.OrdersCaptureRequest(orderID);
//     request.requestBody({});
//     const capture = await client.execute(request);

//     return res.json({ success: true, data: capture.result });
//   } catch (error) {
//     console.error('PayPal capture error:', error);
//     return res.status(500).json({ success: false, message: 'Capture failed' });
//   }
// };

