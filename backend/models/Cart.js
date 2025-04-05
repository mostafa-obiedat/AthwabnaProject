const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      quantity: {
        type: Number,
      }, // الكمية المطلوبة
      price: {
        type: Number,
      }, // سعر المنتج
    },
  ],
  totalAmount: {
    type: Number,
  }, // المبلغ الإجمالي للسلة
  createdAt: Date, // تاريخ إنشاء السلة
  updatedAt: Date, // تاريخ آخر تحديث
});

module.exports = mongoose.model("Cart", cartSchema);
