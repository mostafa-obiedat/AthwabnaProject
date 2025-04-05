const express = require("express");
const router = express.Router();
const checkoutController = require("../controllers/checkoutController");
const authMiddleware = require("../middlewares/authMiddleware");

// تطبيق كوبون
router.post("/apply-coupon", authMiddleware, checkoutController.applyCoupon);

// حفظ عنوان
router.post("/save-address", authMiddleware, checkoutController.saveAddress);

// إنشاء طلب
router.post("/create-order", authMiddleware, checkoutController.createOrder);

module.exports = router;
