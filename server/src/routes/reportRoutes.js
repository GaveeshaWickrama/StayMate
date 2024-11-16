const express = require("express");
const { getRevenueReport } = require("../controllers/revenueController");
const router = express.Router();

// Route to get revenue report for a date range
router.get("/report", getRevenueReport);

module.exports = router;
