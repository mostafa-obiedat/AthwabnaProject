// models/Payment.js
const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  productId: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
  }],
  coupon: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Coupon',
    default: null
  },
  orderId: String,
  transactionId: String,
  amount: String,
  currency: String,
  status: String,
  payerEmail: String,
  createTime: String,
}, { timestamps: true });

module.exports = mongoose.model("Payment", paymentSchema);
