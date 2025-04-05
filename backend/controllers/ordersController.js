const Order = require("../models/Order");

// الحصول على جميع طلبات المستخدم
exports.getUserOrders = async (req, res) => {
  try {
    const userId = req.user.id; // افترضنا أن لديك نظام مصادقة
    const orders = await Order.find({ user: userId })
      .populate("items.product", "name price image")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "حدث خطأ أثناء جلب الطلبات",
      error: error.message,
    });
  }
};
