const jwt = require("jsonwebtoken");

// إنشاء توكن JWT — يستخدم في تسجيل الدخول وإنشاء الحساب
const generateToken = (userId, role) =>
  jwt.sign(role ? { userId, role } : { userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "1d",
  });

// خيارات الكوكيز الموحدة للتوكن
const authCookieOptions = { httpOnly: true };

module.exports = { generateToken, authCookieOptions };
