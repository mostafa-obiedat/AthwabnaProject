const express = require("express");
const router = express.Router();
const ordersController = require("../controllers/ordersController");
const authMiddleware = require("../middlewares/authMiddleware");

// طرق محمية تتطلب مصادقة
router.get("/my-orders", authMiddleware, ordersController.getUserOrders);

module.exports = router;
