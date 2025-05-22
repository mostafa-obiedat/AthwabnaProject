// const express = require("express");
// const auth = require("../controllers/adminController");
// const { getOverviewStats } = require("../controllers/adminController");
// const authMiddleware = require("../middlewares/authMiddleware");
// const isAdmin = require("../middlewares/isAdmin");
// const router = express.Router();

// router.post("/register", auth.registerAdmin);
// router.post("/login", auth.loginAdmin);// routes/adminRoutes.js أو أي ملف مشابه
// router.get('/overview', authMiddleware, isAdmin, getOverviewStats);

const express = require('express');
const router = express.Router(); 
const admin = require("../controllers/adminController");
const authMiddleware = require('../middlewares/authMiddleware');
const isAdmin = require("../middlewares/isAdmin")
const upload = require("../middlewares/upload")


router.get('/overview', authMiddleware, isAdmin, admin.getOverviewStats);
router.get('/products', authMiddleware, isAdmin, admin.getProducts);
router.get("/workshops", authMiddleware, isAdmin, admin.getWorkshops) 
router.get('/customers', authMiddleware, isAdmin, admin.getCustomers);
router.get('/orders', authMiddleware, isAdmin, admin.getOrders)
// router.post('/settings', authMiddleware, isAdmin, admin.saveSettings)
router.put("/users/:id", authMiddleware, isAdmin, admin.updateUser);
router.delete("/users/:id", authMiddleware, isAdmin, admin.deleteUser);
router.get("/messages", authMiddleware, isAdmin, admin.getMessages);
router.post('/reply', authMiddleware, isAdmin, admin.replyToMessage);
router.post("/workshops", authMiddleware, isAdmin, upload.single("image"), admin.createWorkshop);
router.put("/workshops/:id", authMiddleware, isAdmin, upload.single("image"), admin.updateWorkshop);
router.delete("/workshops/:id", authMiddleware, isAdmin, admin.deleteWorkshop);
router.get("/settings", authMiddleware, isAdmin, admin.getAdminInfo);
router.put("/update-info", authMiddleware, isAdmin, admin.updateAdmin);
router.put("/update-password", authMiddleware, isAdmin, admin.updatePassword);
router.get("/notifications", admin.getNotifications);
router.put("/notifications/:id/mark-read", admin.markAsRead);


module.exports = router;