const express = require('express');
const workshopController = require('../controllers/workshopController');
const router = express.Router();

// جلب كل الورشات أو إنشاء ورشة جديدة
router
  .route('/')
  .get(workshopController.getWorkshops)
  .post(workshopController.createWorkshop);

// التسجيل في ورشة معينة
router.post('/:id/register', workshopController.register);

module.exports = router;
