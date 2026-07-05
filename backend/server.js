require("dotenv").config(); // يجب تحميل متغيرات البيئة قبل استيراد أي ملف يعتمد عليها

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const adminProductRoutes = require("./routes/adminProductRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const checkoutRoutes = require("./routes/checkoutRoutes");
const ordersRoutes = require("./routes/ordersRoutes");
const favoriteRoutes = require("./routes/favoriteRoutes");
const workshopRoutes = require("./routes/workshops");
const workshopDetailsRoutes = require("./routes/workshopDetailsRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const contactRoutes = require("./routes/contactRoutes");

//---------------------------
// Middleware
//---------------------------
const app = express();
app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

//---------------------------
// Connect DB
//---------------------------
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  });

//---------------------------
// ROUTES
//---------------------------
app.use("/uploads", express.static("uploads"));
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/admin", adminProductRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/checkout", checkoutRoutes);
app.use("/api/orders", ordersRoutes);
app.use("/api/favorites", favoriteRoutes);
app.use("/api/workshops", workshopRoutes);
app.use("/api/workshops", workshopDetailsRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/contacts", contactRoutes);

//---------------------------
// ERROR HANDLER
//---------------------------
app.use((err, req, res, next) => {
  console.error(err.stack);
  if (res.headersSent) return next(err);
  res.status(500).json({ success: false, message: "Something went wrong!" });
});

//---------------------------
// START SERVER
//---------------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
