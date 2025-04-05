const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
  }, // اسم المنتج
  description: {
    type: String,
  }, // وصف المنتج
  price: {
    type: Number,
  },
  category: {
    type: String,
    enum: ["men", "women", "kids"],
  },
  size: [String], // الأحجام المتاحة (مثل ['S', 'M', 'L'])
  color: [String], // الألوان المتاحة
  images: [String], // روابط صور المنتج
  stock: {
    type: Number,
  }, // الكمية المتاحة في المخزون
  ratings: [
    {
      userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      }, // معرف المستخدم الذي قام بالتقييم
      rating: {
        Number,
      }, // التقييم (من 1 إلى 5)
      comment: {
        type: String,
      }, // تعليق المستخدم
    },
  ],
  createdAt: Date, // تاريخ إضافة المنتج
  updatedAt: Date, // تاريخ آخر تحديث
});

module.exports = mongoose.model("Product", productSchema);
