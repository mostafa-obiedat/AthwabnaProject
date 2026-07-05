const jwt = require("jsonwebtoken");
const User = require("../models/User");

// التحقق من التوكن في الكوكيز وجلب المستخدم وإضافته إلى req.user
module.exports = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "غير مصرح. الرجاء تسجيل الدخول",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "المستخدم غير موجود",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Authentication error:", error);
    res.status(401).json({
      success: false,
      message: "جلسة غير صالحة. الرجاء تسجيل الدخول مرة أخرى",
    });
  }
};
