const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const userRoute = require("./routes/userRoutes");
const adminRoute = require("./routes/adminRoutes");
const adminProductRoutes = require("./routes/adminProductRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const checkoutRoutes = require("./routes/checkoutRoutes");
const ordersRoutes = require("./routes/ordersRoutes");
const favoriteRoutes = require("./routes/favoriteRoutes");
const workshopRoutes = require('./routes/workshops');
const workshopDetailsRoutes = require('./routes/workshopDetailsRoutes');
const paymentRoutes = require("./routes/paymentRoutes");
const contactRoutes = require("./routes/contactRoutes")
const accessoriesRoutes = require("./routes/accessoriesRoutes")
//---------------------------
// Middleware
//---------------------------
dotenv.config();
const app = express();
app.use(
  cors({
    origin: "http://localhost:5173", // أو النطاق الخاص بك
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
app.use('/uploads', express.static('uploads'));
app.use("/api/users", userRoute);
app.use("/api/admin", adminRoute);
app.use("/api/admin", adminProductRoutes);
app.use("/api/products", productRoutes);
// app.get("/api/auth/check", (req, res) => {
//   if (req.user) {
//     // إذا كان المستخدم مسجل الدخول
//     res.status(200).json({ isAuthenticated: true });
//   } else {
//     // إذا كان المستخدم غير مسجل
//     res.status(200).json({ isAuthenticated: false });
//   }
// });
app.use("/api/cart", cartRoutes);
app.use("/api/checkout", checkoutRoutes);
app.use("/api/orders", ordersRoutes);
app.use("/api/favorites", favoriteRoutes);
app.use('/api/workshops', workshopRoutes);
app.use('/api/workshops', workshopDetailsRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/contacts", contactRoutes)
// في ملف server.js أو app.js

//---------------------------
// ERROR HANDLERS
//---------------------------
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

//---------------------------
// Connect SERVER
//---------------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
