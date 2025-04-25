const express = require("express");
const favorites = require("../controllers/favoriteController");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

router.post('/add', authMiddleware, favorites.addToFavorites);
router.get('/', authMiddleware, favorites.getFavorites);
router.delete('/:productId', authMiddleware, favorites.removeFromFavorites);

module.exports = router;
