const express = require('express');
const router = express.Router();
const { getWorkshopDetails, rate } = require('../controllers/workshopDetailsController');

// GET /api/workshops/:id
router.get('/:id', getWorkshopDetails);
router.post('/:id/rate', rate);

module.exports = router;
