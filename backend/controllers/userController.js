const User = require("../models/User");
const Payment = require("../models/Payment");
const Coupon = require("../models/Coupon");
const asyncHandler = require("../utils/asyncHandler");
const { generateToken, authCookieOptions } = require("../utils/token");

// تسجيل مستخدم جديد
exports.register = asyncHandler(async (req, res) => {
  const { username, email, password, phonenumber } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ message: "User already exists" });
  }

  const user = await User.create({ username, email, password, phonenumber });
  const token = generateToken(user._id);

  res
    .cookie("token", token, authCookieOptions)
    .status(201)
    .json({ message: "User registered successfully" });
}, "حدث خطأ أثناء إنشاء الحساب");

// تسجيل الدخول
exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  const isMatch = user && (await user.matchPassword(password));
  if (!isMatch) {
    return res
      .status(400)
      .json({ message: "البريد الإلكتروني أو كلمة المرور غير صحيحة" });
  }

  const token = generateToken(user._id);
  res.cookie("token", token, authCookieOptions);
  res.status(200).json({ message: "تم تسجيل الدخول بنجاح" });
}, "حدث خطأ أثناء تسجيل الدخول");

// جلب بيانات البروفايل + سجل المدفوعات + الكوبونات المستخدمة
exports.getUserProfile = asyncHandler(async (req, res) => {
  const user = req.user; // جاي من authMiddleware

  const [coupons, payments] = await Promise.all([
    Coupon.find({ usedBy: user._id }),
    Payment.find({ userId: user._id }).populate("productId", "name"),
  ]);

  res.json({
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
      phonenumber: user.phonenumber,
      profileImage: user.profileImage,
      createdAt: user.createdAt,
    },
    payments,
    coupons,
  });
}, "خطأ في جلب بيانات البروفايل");

// تحديث بيانات البروفايل (مع صورة اختيارية)
exports.updateUserProfile = asyncHandler(async (req, res) => {
  const { username, email, phonenumber } = req.body;

  const updatedFields = {
    username,
    email,
    phonenumber,
    updatedAt: Date.now(),
  };

  if (req.file) {
    updatedFields.profileImage = `/uploads/${req.file.filename}`;
  }

  const updatedUser = await User.findByIdAndUpdate(req.user._id, updatedFields, {
    new: true,
    select: "username email phonenumber profileImage createdAt",
  }).lean();

  if (!updatedUser) {
    return res.status(404).json({ message: "المستخدم غير موجود" });
  }

  res.status(200).json({
    message: "تم التحديث بنجاح",
    username: updatedUser.username,
  });
}, "فشل في تحديث البيانات");
