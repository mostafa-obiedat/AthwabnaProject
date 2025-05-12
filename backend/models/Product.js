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
  sold: {
    type: Number,
    default: 0
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
        type: Number, required: true, min: 1, max: 5
      }, // التقييم (من 1 إلى 5)
      comment: {
        type: String,
      },
      createdAt: { type: Date, default: Date.now }, // تعليق المستخدم
    },
  ],// ✅ أضف هذا السطر لحقل المتوسط
  averageRating: {
    type: Number,
    default: 0,
  },
  createdAt: Date, // تاريخ إضافة المنتج
  updatedAt: Date, // تاريخ آخر تحديث
});
productSchema.methods.calculateAverageRating = async function () {
  const product = this;

  if (product.ratings && product.ratings.length > 0) {
    const sum = product.ratings.reduce((acc, rating) => {
      // تأكد أن rating.rating هو رقم صالح
      const num = Number(rating.rating);
      return acc + (isNaN(num) ? 0 : num);
    }, 0);

    const average = sum / product.ratings.length;
    product.averageRating = parseFloat(average.toFixed(1)); // تقريب إلى منزلة عشرية واحدة
  } else {
    product.averageRating = 0; // تعيين قيمة افتراضية إذا لم يكن هناك تقييمات
  }

  await product.save();
};

module.exports = mongoose.model("Product", productSchema);
