const express = require("express");
const { getRevenueReport , getPropertyCounts } = require("../controllers/reportController");
const router = express.Router();

// Single route to get revenue report for a specific date range
router.get("/revenue", getRevenueReport);
router.get("/counts", getPropertyCounts);

module.exports = router;
