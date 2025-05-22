const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  discount: {
    type: Number,
    default: 0, // 0 يعني لا يوجد خصم
  },
  offerEndDate: {
  type: Date,
  },
  sold: { type: Number, default: 0 },
  category: {
    type: String,
    enum: ['men', 'women', 'kids', 'accessory-men', 'accessory-women']
  },
  size: [String], // فقط للملابس
  color: [String],
  images: [String],
  stock: Number,
  type: {
    type: String,
    enum: ['product', 'accessory'],
    default: 'product'
  },
  ratings: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      rating: { type: Number, required: true, min: 1, max: 5 },
      comment: String,
      createdAt: { type: Date, default: Date.now },
    }
  ],
  averageRating: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: Date,
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
