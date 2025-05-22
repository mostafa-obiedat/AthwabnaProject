const User = require("../models/User");
const Payment = require("../models/Payment");
const Coupon = require("../models/Coupon")
const jwt = require("jsonwebtoken");

// إنشاء توكن JWT
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "1d" });
};

// exports.checkAuth = (req, res) => {
//   res.status(200).json({
//     isAuthenticated: true,
//     user: req.user,
//   });
// };
// تسجيل مستخدم جديد
exports.register = async (req, res) => {
  try {
    const { username, email, password, phonenumber } = req.body;

    // التحقق من وجود المستخدم مسبقًا
    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ message: "User already exists" });

    // إنشاء مستخدم جديد
    const user = await User.create({ username, email, password, phonenumber });

    // إنشاء توكن
    const token = generateToken(user._id);
    console.log("Generated Token:", token);
    // إرسال التوكن في الكوكيز
    res
      .cookie("token", token, { httpOnly: true })
      .status(201)
      .json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// تسجيل الدخول
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "البريد الإلكتروني أو كلمة المرور غير صحيحة" });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ message: "البريد الإلكتروني أو كلمة المرور غير صحيحة" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    // إرسال الـ Token في الكوكيز
    res.cookie("token", token, {
      httpOnly: true,
    });
    console.log("Generated Token:", token);
    res.status(200).json({ message: "تم تسجيل الدخول بنجاح" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getUserProfile = async (req, res) => {
  
  try {
    const user = req.user; // جاي من authmiddleware
    
    const coupons = await Coupon.find({ usedBy: user._id });
    // جلب بيانات المستخدم + سجل المدفوعات
    const payments = await Payment.find({ userId: user._id }).populate('productId', 'name');

    res.json({
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        phonenumber: user.phonenumber,
        profileImage: user.profileImage,
        createdAt: user.createdAt,
        // ممكن تضيف أكثر
      },
      payments,
      coupons,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'خطأ في جلب بيانات البروفايل' });
  }
};

exports.updateUserProfile = async (req, res) => {
  try {
    const userId = req.user._id;
    const { username, email, phonenumber } = req.body; // تغيير من name إلى username

    const updatedFields = {
      username, // استخدام username بدلاً من name
      email,
      phonenumber,
      updatedAt: Date.now(),
    };

    if (req.file) {
      updatedFields.profileImage = `/uploads/${req.file.filename}`;
    }

    const updatedUser = await User.findByIdAndUpdate(
      userId, 
      updatedFields, 
      { 
        new: true,
        select: 'username email phonenumber profileImage createdAt' // تحديث الحقول المطلوبة
      }
    ).lean();

    if (!updatedUser) {
      return res.status(404).json({ message: "المستخدم غير موجود" });
    }

    res.status(200).json({ 
      message: "تم التحديث بنجاح",
      username: updatedUser.username // إرجاع username بدلاً من user
    });
  } catch (error) {
    console.error("❌ خطأ في تحديث البروفايل:", error);
    res.status(500).json({ 
      message: "فشل في تحديث البيانات",
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};