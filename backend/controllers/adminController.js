const Order = require("../models/Order");
const Product = require("../models/Product");
const User = require("../models/User");
const Contact = require("../models/Contact");
const Workshop = require("../models/Workshop");
const Notification = require("../models/Notification");
const nodemailer = require("nodemailer");
const bcrypt = require("bcryptjs");
const asyncHandler = require("../utils/asyncHandler");
const { buildPagination } = require("../utils/productQuery");

// إحصائيات لوحة التحكم: مستخدمين/منتجات/طلبات/إيرادات/الأكثر مبيعاً
exports.getOverviewStats = asyncHandler(async (req, res) => {
  const [usersCount, productsCount, orders] = await Promise.all([
    User.countDocuments(),
    Product.countDocuments(),
    Order.find().populate("products.product"),
  ]);

  const totalRevenue = orders.reduce((acc, order) => acc + order.total, 0);

  // إيرادات كل شهر
  const monthlyRevenue = Array(12).fill(0);
  orders.forEach((order) => {
    const month = new Date(order.createdAt).getMonth();
    monthlyRevenue[month] += order.total || 0;
  });

  // تحليل الزبائن حسب فئة المنتجات المشتراة + مبيعات كل منتج
  const genderCounts = { men: 0, women: 0, kids: 0 };
  const productSales = {};

  orders.forEach((order) => {
    order.products.forEach((item) => {
      const product = item.product;
      if (!product) return;

      if (genderCounts[product.category] !== undefined) {
        genderCounts[product.category] += item.quantity;
      }

      const productId = product._id.toString();
      if (!productSales[productId]) {
        productSales[productId] = { sold: 0, name: product.name, price: product.price };
      }
      productSales[productId].sold += item.quantity;
    });
  });

  const totalCustomerBasedOnPurchase =
    genderCounts.men + genderCounts.women + genderCounts.kids;

  const topProducts = Object.values(productSales)
    .sort((a, b) => b.sold - a.sold)
    .slice(0, 5);

  res.status(200).json({
    success: true,
    data: {
      usersCount,
      productsCount,
      ordersCount: orders.length,
      totalRevenue,
      monthlyRevenue,
      totalCustomers: totalCustomerBasedOnPurchase,
      genderStats: genderCounts,
      topProducts,
    },
  });
}, "حدث خطأ أثناء جلب البيانات");

// جلب المنتجات مع بحث وباجنيشن
exports.getProducts = asyncHandler(async (req, res) => {
  const { search = "" } = req.query;
  const { page, limit, skip } = buildPagination(req.query.page, req.query.limit || 10);

  const query = { name: { $regex: search, $options: "i" } };

  const [total, products] = await Promise.all([
    Product.countDocuments(query),
    Product.find(query).skip(skip).limit(limit),
  ]);

  res.json({
    data: products,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  });
}, "Failed to fetch products");

// جلب الورشات مع بحث وباجنيشن
exports.getWorkshops = asyncHandler(async (req, res) => {
  const { search = "" } = req.query;
  const { page, limit, skip } = buildPagination(req.query.page, req.query.limit || 6);

  const query = { title: { $regex: search, $options: "i" } };

  const [workshops, total] = await Promise.all([
    Workshop.find(query).skip(skip).limit(limit).sort({ createdAt: -1 }),
    Workshop.countDocuments(query),
  ]);

  res.json({
    workshops,
    totalPages: Math.ceil(total / limit),
    currentPage: page,
  });
}, "حدث خطأ أثناء جلب الورشات");

// إنشاء ورشة جديدة
exports.createWorkshop = asyncHandler(async (req, res) => {
  const workshop = new Workshop({
    ...req.body,
    image: req.file ? `/uploads/${req.file.filename}` : "",
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  await workshop.save();
  res.status(201).json(workshop);
}, "Failed to create workshop");

// تعديل ورشة
exports.updateWorkshop = asyncHandler(async (req, res) => {
  const updateData = { ...req.body, updatedAt: new Date() };
  if (req.file) {
    updateData.image = `/uploads/${req.file.filename}`;
  }

  const workshop = await Workshop.findByIdAndUpdate(req.params.id, updateData, {
    new: true,
  });

  if (!workshop) return res.status(404).json({ error: "Workshop not found" });
  res.json(workshop);
}, "Failed to update workshop");

// حذف ورشة
exports.deleteWorkshop = asyncHandler(async (req, res) => {
  const workshop = await Workshop.findByIdAndDelete(req.params.id);
  if (!workshop) return res.status(404).json({ error: "Workshop not found" });
  res.json({ message: "Workshop deleted successfully" });
}, "Failed to delete workshop");

// جلب الزبائن مع بحث وباجنيشن
exports.getCustomers = asyncHandler(async (req, res) => {
  const { search = "" } = req.query;
  const { page, limit, skip } = buildPagination(req.query.page, req.query.limit || 10);

  const query = {
    role: "user",
    username: { $regex: search, $options: "i" },
  };

  const [customers, total] = await Promise.all([
    User.find(query)
      .select("-password")
      .populate("savedAddresses")
      .populate("orders")
      .populate("coupons")
      .populate("likedProducts")
      .limit(limit)
      .skip(skip),
    User.countDocuments(query),
  ]);

  res.json({
    data: customers,
    currentPage: page,
    totalPages: Math.ceil(total / limit),
    totalCustomers: total,
  });
}, "Failed to fetch customers");

// تعديل بيانات مستخدم
exports.updateUser = asyncHandler(async (req, res) => {
  const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  if (!updatedUser) {
    return res.status(404).json({ message: "User not found" });
  }
  res.json(updatedUser);
}, "Error updating user");

// حذف مستخدم
exports.deleteUser = asyncHandler(async (req, res) => {
  const deletedUser = await User.findByIdAndDelete(req.params.id);
  if (!deletedUser) {
    return res.status(404).json({ message: "User not found" });
  }
  res.json({ message: "User deleted successfully" });
}, "Error deleting user");

// جلب الطلبات مع باجنيشن
exports.getOrders = asyncHandler(async (req, res) => {
  const { page, limit, skip } = buildPagination(req.query.page, req.query.limit || 10);

  const [totalOrders, orders] = await Promise.all([
    Order.countDocuments(),
    Order.find()
      .populate("shippingAddress")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit),
  ]);

  res.json({
    data: orders,
    currentPage: page,
    totalPages: Math.ceil(totalOrders / limit),
    totalOrders,
  });
}, "فشل في جلب الطلبات");

// جلب رسائل التواصل (الاستفسارات)
exports.getMessages = asyncHandler(async (req, res) => {
  const messages = await Contact.find({ messageType: "inquiry" }).sort({
    createdAt: -1,
  });
  res.json(messages);
}, "Failed to fetch messages");

// الرد على رسالة عبر البريد الإلكتروني
exports.replyToMessage = asyncHandler(async (req, res) => {
  const { to, subject, text, messageId } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  await transporter.sendMail({
    from: `AthwabnaCompany ${process.env.EMAIL_USERNAME}`,
    to,
    subject,
    text,
    cc: process.env.EMAIL_USERNAME, // نسخة إلى الأدمن
  });

  await Contact.findByIdAndUpdate(messageId, {
    isReplied: true,
    repliedAt: new Date(),
  });

  res.status(200).json({ message: "Reply sent successfully" });
}, "Failed to send reply");

// جلب معلومات الأدمن (الاسم + الهاتف)
exports.getAdminInfo = asyncHandler(async (req, res) => {
  res.json({ name: req.user.username, phonenumber: req.user.phonenumber });
}, "Server error");

// تحديث معلومات الأدمن
exports.updateAdmin = asyncHandler(async (req, res) => {
  const { name, phone } = req.body;
  req.user.username = name;
  req.user.phonenumber = phone;
  await req.user.save();
  res.json({ message: "Info updated" });
}, "Server error");

// تحديث كلمة مرور الأدمن
exports.updatePassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  const isMatch = await bcrypt.compare(oldPassword, req.user.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Incorrect current password" });
  }

  req.user.password = newPassword;
  await req.user.save();
  res.json({ message: "Password updated" });
}, "Server error");

// جلب آخر الإشعارات
exports.getNotifications = asyncHandler(async (req, res) => {
  const notifications = await Notification.find()
    .sort({ createdAt: -1 })
    .limit(20);
  res.json({ data: notifications });
}, "Error fetching notifications");

// تعليم إشعار كمقروء
exports.markAsRead = asyncHandler(async (req, res) => {
  await Notification.findByIdAndUpdate(req.params.id, { isRead: true });
  res.json({ message: "Marked as read" });
}, "Failed to update notification");
