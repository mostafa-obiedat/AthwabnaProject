const mongoose = require("mongoose");

const couponSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  discountType: { type: String, enum: ["percentage", "fixed"], required: true },
  discountValue: { type: Number, required: true },
  minOrderAmount: { type: Number },
  validFrom: { type: Date, required: true },
  validUntil: { type: Date, required: true },
  isActive: { type: Boolean, default: true },
  usedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  maxUses: { type: Number },
  currentUses: { type: Number, default: 0 },
});

module.exports = mongoose.model("Coupon", couponSchema);
