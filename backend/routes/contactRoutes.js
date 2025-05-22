const express = require("express");
const router = express.Router();
const { createContact, getFeedbacks } = require("../controllers/contactController");

router.post("/create", createContact);
router.get('/feedbacks', getFeedbacks);

module.exports = router;