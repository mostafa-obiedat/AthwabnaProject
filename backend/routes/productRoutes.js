const express = require("express");
const product = require("../controllers/productController");
const accessories = require("../controllers/accessoriesController");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

// Route لجلب المنتجات الخاصة بالرجال
router.get("/men", product.getMenProducts);
router.get("/women", product.getWomenProducts);
router.get("/kids", product.getKidsProducts);
router.get("/menaccessories", accessories.MenAccessories);
router.get("/womenaccessories", accessories.WomenAccessories);
router.get("/offers", product.offers);
router.get('/bestsellers', product.getBestSellers);
router.get("/:id", product.getProductById);
// Route لجلب المنتجات ذات الصلة (من نفس الفئة)
router.get("/related/:category", product.getRelatedProducts);
// router.post("/products/:productId/rate", authMiddleware, product.rateProduct);
router.post("/rate/:id", authMiddleware, product.rateProduct);





module.exports = router;
