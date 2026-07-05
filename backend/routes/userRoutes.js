const express = require("express");
const auth = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");
const upload = require("../middlewares/upload");
const router = express.Router();

const logout = (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logged out successfully" });
};

router.post("/register", auth.register);
router.post("/login", auth.login);

router.get("/check", authMiddleware, (req, res) => {
  res.json({ isAuthenticated: true, user: req.user });
});
router.get("/me", authMiddleware, (req, res) => {
  res.json(req.user);
});

router.get("/profile", authMiddleware, auth.getUserProfile);
router.put(
  "/profile/update",
  authMiddleware,
  upload.single("profileImage"),
  auth.updateUserProfile
);

router.post("/logout", logout);
router.get("/adminlogout", logout);

module.exports = router;
