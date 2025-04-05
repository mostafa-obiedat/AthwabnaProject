const express = require("express");
const product = require("../controllers/productController"); // استيراد الـ Controller

const router = express.Router();

// Route لجلب المنتجات الخاصة بالرجال
router.get("/men", product.getMenProducts);
router.get("/women", product.getWomenProducts);
router.get("/kids", product.getKidsProducts);
router.get("/:id", product.getProductById);
// Route لجلب المنتجات ذات الصلة (من نفس الفئة)
router.get("/related/:category", product.getRelatedProducts);

module.exports = router;
