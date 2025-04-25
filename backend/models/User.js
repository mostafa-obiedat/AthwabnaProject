const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phonenumber: {
    type: Number,
    required: true,
  },
  profileImage: {
    type: String,
    default: "",
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  savedAddresses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Address" }],
  orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],
  coupons: [{ type: mongoose.Schema.Types.ObjectId, ref: "Coupon" }],
  likedProducts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Products", // Correct reference to "News"
    },
  ],
}, { timestamps: true }); 

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// userSchema.methods.toggleLike = function (articleId) {
//   const index = this.likedArticles.indexOf(articleId);
//   if (index === -1) {
//     this.likedArticles.push(articleId);  // Add to liked articles
//   } else {
//     this.likedArticles.splice(index, 1);  // Remove from liked articles
//   }
//   return this.save();
// };

// Password comparison method
userSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

module.exports = mongoose.model("User", userSchema);
