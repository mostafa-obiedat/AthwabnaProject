const express = require("express");
const router = express.Router();
const admin = require("../controllers/adminController");
const authMiddleware = require("../middlewares/authMiddleware");
const isAdmin = require("../middlewares/isAdmin");
const upload = require("../middlewares/upload");

// الإشعارات (بدون تحقق أدمن — كما كانت)
router.get("/notifications", admin.getNotifications);
router.put("/notifications/:id/mark-read", admin.markAsRead);

// جميع المسارات التالية تتطلب تسجيل دخول + صلاحية أدمن
router.use(authMiddleware, isAdmin);

router.get("/overview", admin.getOverviewStats);
router.get("/products", admin.getProducts);
router.get("/customers", admin.getCustomers);
router.get("/orders", admin.getOrders);

router.put("/users/:id", admin.updateUser);
router.delete("/users/:id", admin.deleteUser);

router.get("/messages", admin.getMessages);
router.post("/reply", admin.replyToMessage);

router.get("/workshops", admin.getWorkshops);
router.post("/workshops", upload.single("image"), admin.createWorkshop);
router.put("/workshops/:id", upload.single("image"), admin.updateWorkshop);
router.delete("/workshops/:id", admin.deleteWorkshop);

router.get("/settings", admin.getAdminInfo);
router.put("/update-info", admin.updateAdmin);
router.put("/update-password", admin.updatePassword);

module.exports = router;
