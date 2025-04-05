const express = require("express");
const cart = require("../controllers/cartController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// Route لجلب تفاصيل السلة
// router.get("/", authMiddleware, cart.getCart);
// // Route لإضافة منتج إلى السلة
// router.post("/add", authMiddleware, cart.addToCart);

router.use(authMiddleware); // ⬅️ تطبيق middleware على جميع routes

router.get("/", cart.getCart);
router.post("/add", cart.addToCart);

module.exports = router;
