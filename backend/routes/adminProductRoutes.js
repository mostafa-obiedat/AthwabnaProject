// routes/adminProductRoutes.js
const express = require("express");
const router = express.Router();
const productController = require("../controllers/adminProductController");
const authMiddleware = require("../middlewares/authMiddleware");
const upload = require("../middlewares/upload")

// تأكد إنك تحط authMiddleware.isAdmin لو عندك تحقق من الصلاحيات
// router.get("/products", authMiddleware, productController.getAllProducts);
router.post("/products", authMiddleware, upload.array("images", 5), productController.createProduct);
router.put("/products/:id", authMiddleware, upload.array("images", 5), productController.updateProduct);
router.delete("/products/:id", authMiddleware, productController.deleteProduct);

module.exports = router;