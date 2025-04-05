const express = require("express");
const auth = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

router.post("/register", auth.register);
router.post("/login", auth.login);
router.get("/check", authMiddleware, (req, res) => {
  res.json({ isAuthenticated: true, user: req.user });
});
router.get("/check", auth.checkAuth);
module.exports = router;
