const express = require("express");
const product = require("../controllers/productController");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

// قوائم المنتجات حسب الفئة
router.get("/men", product.getMenProducts);
router.get("/women", product.getWomenProducts);
router.get("/kids", product.getKidsProducts);
router.get("/menaccessories", product.getMenAccessories);
router.get("/womenaccessories", product.getWomenAccessories);
router.get("/offers", product.offers);
router.get("/bestsellers", product.getBestSellers);

// المنتجات ذات الصلة (من نفس الفئة)
router.get("/related/:category", product.getRelatedProducts);

// التقييم يتطلب تسجيل الدخول
router.post("/rate/:id", authMiddleware, product.rateProduct);

// تفاصيل منتج معين — يبقى آخر route حتى لا يلتقط المسارات الثابتة الأخرى
router.get("/:id", product.getProductById);

module.exports = router;
