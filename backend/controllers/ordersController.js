const Order = require("../models/Order");
const asyncHandler = require("../utils/asyncHandler");

// جلب جميع طلبات المستخدم الحالي (authMiddleware يوفر req.user)
exports.getUserOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id })
    .populate("products.product", "name price image")
    .sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    data: orders,
  });
}, "Server error while fetching orders");

// جلب تفاصيل الطلب بعد الدفع (صفحة الشكر)
exports.thankYou = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)
    .populate("user", "name email")
    .populate("shippingAddress");

  if (!order) {
    return res.status(404).json({ message: "الطلب غير موجود" });
  }

  // التأكد أن المستخدم الحالي هو صاحب الطلب (أو admin)
  const isOwner = order.user._id.toString() === req.user._id.toString();
  if (!isOwner && req.user.role !== "admin") {
    return res.status(403).json({ message: "ليس لديك صلاحية لعرض هذا الطلب" });
  }

  res.status(200).json({ order });
}, "خطأ في الخادم");
