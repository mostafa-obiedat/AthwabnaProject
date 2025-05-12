const express = require("express");
const auth = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");
const upload = require("../middlewares/upload");
const router = express.Router();

router.post("/register", auth.register);
router.post("/login", auth.login);
router.get("/check", authMiddleware, (req, res) => {
  res.json({ isAuthenticated: true, user: req.user });
});
router.get("/check", auth.checkAuth);
router.get('/profile', authMiddleware, auth.getUserProfile);
router.put(
  "/profile/update",
  authMiddleware,
  upload.single("profileImage"), // حقل الصورة اسمه profileImage
  auth.updateUserProfile,
);

router.get('/logout', (req, res) => {
  res.clearCookie('token'); // أو اسم الكوكيز المستخدم
  res.status(200).json({ message: "Logged out successfully" });
});

module.exports = router;
