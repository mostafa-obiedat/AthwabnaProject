const express = require("express");
const auth = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware")
const User = require("../models/User");
const router = express.Router();

router.post("/register", auth.register);
router.post("/login", auth.login);

module.exports = router;
