const express = require("express");
const cart = require("../controllers/cartController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

// جميع مسارات السلة تتطلب تسجيل الدخول
router.use(authMiddleware);

router.get("/", cart.getCart);
router.post("/add", cart.addToCart);

module.exports = router;
