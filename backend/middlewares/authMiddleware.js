// const jwt = require("jsonwebtoken");

// const protect = (req, res, next) => {
//   const token = req.cookies?.token || req.headers.authorization?.split(" ")[1]; // ⬅️ التحقق من مصدرين
//   if (!token)
//     return res.status(401).json({ message: "No token, authorization denied" });

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.userId = decoded.userId;
//     next();
//   } catch (error) {
//     res.status(401).json({ message: "Invalid token" });
//   }
// };

// module.exports = protect;

// authMiddleware.js
// const jwt = require("jsonwebtoken");

// const protect = (req, res, next) => {
//   const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];

//   if (!token) {
//     return res.status(401).json({
//       message: "غير مصرح به، يرجى تسجيل الدخول",
//       code: "UNAUTHORIZED",
//     });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = { id: decoded.userId }; // ⬅️ التعديل هنا ليكون متوافقاً مع req.user.id
//     next();
//   } catch (error) {
//     res.status(401).json({
//       message: "توكن غير صالح",
//       code: "INVALID_TOKEN",
//     });
//   }
// };

// module.exports = protect;

const jwt = require("jsonwebtoken");
const User = require("../models/User");

module.exports = async (req, res, next) => {
  try {
    // 1. الحصول على التوكن من الكوكيز
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "غير مصرح. الرجاء تسجيل الدخول",
      });
    }

    // 2. التحقق من التوكن
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 3. البحث عن المستخدم في قاعدة البيانات
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "المستخدم غير موجود",
      });
    }

    // 4. إضافة المستخدم إلى request object
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
