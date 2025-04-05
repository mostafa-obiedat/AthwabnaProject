const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  products: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      quantity: { type: Number, default: 1 },
      price: { type: Number, required: true },
    },
  ],
  subtotal: { type: Number, required: true },
  shippingFee: { type: Number, required: true },
  total: { type: Number, required: true },
  shippingMethod: { type: String, required: true },
  shippingAddress: { type: mongoose.Schema.Types.ObjectId, ref: "Address" },
  paymentMethod: { type: String, required: true },
  paymentStatus: { type: String, default: "pending" },
  orderStatus: { type: String, default: "processing" },
  couponUsed: { type: mongoose.Schema.Types.ObjectId, ref: "Coupon" },
  discountAmount: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Order", orderSchema);
