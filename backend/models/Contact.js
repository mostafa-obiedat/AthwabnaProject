const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    messageType: {
      type: String,
      enum: ['inquiry', 'feedback'], // نوع الرسالة (استفسار أو فيدباك)
      required: true,
      default: 'inquiry'
    },
    rating: {
      type: Number,
      min: 1,
      max: 5,
      required: function() { return this.messageType === 'feedback'; } // مطلوب فقط للفيدباك
    },
    message: {
      type: String,
      required: true,
    },
    repliedAt: {
      type: Date,
      default: null,
    },
    isReplied: {
      type: Boolean,
      default: false,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Contact", contactSchema);