// const mongoose = require('mongoose');

// const workshopSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   price: { type: Number, required: true },
//   image: { type: String, required: true },
//   description: { type: String, required: true },
//   ageRange: { type: String, required: true },
//   location: { type: String, required: true },
//   isFree: { type: Boolean, default: false }
// });

// module.exports = mongoose.model('Workshop', workshopSchema);

const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

const workshopSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  image: String,
  description: String,
  date: String,
  time: String,
  location: String,
  ageRange: String,
  price: {
    type: Number,
    default: 0,
  },
  isFree: {
    type: Boolean,
    default: false,
  },
  ratings: {
    type: [Number], // ← مصفوفة من الأرقام
    default: [],
  },
  registrations: [registrationSchema], // ← هنا المشكلة اللي كانت تظهر لك
});

workshopSchema.methods.getAverageRating = function () {
  if (this.ratings.length === 0) return 0;
  const sum = this.ratings.reduce((acc, rating) => acc + rating, 0);
  return (sum / this.ratings.length).toFixed(1); // يرجع رقم عشري 1
};

module.exports = mongoose.model('Workshop', workshopSchema);
