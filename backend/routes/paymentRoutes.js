const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/paymentController");
const { captureOrder } = require("../services/paypalService");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/create-paypal-order", paymentController.createOrder);
router.post("/paypal/product", paymentController.createProductPayment);
router.post("/capture-paypal-order", authMiddleware, captureOrder);

module.exports = router;
