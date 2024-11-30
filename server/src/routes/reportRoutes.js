const express = require("express");
const { getRevenueReport, getPropertyCounts, getTotalRevenueForHost } = require("../controllers/reportController");
const router = express.Router();

// Single route to get revenue report for a specific date range
router.get("/revenue", getRevenueReport);
router.get("/counts", getPropertyCounts);

// New route to get the total revenue for a specific host
router.get("/revenue/total", getTotalRevenueForHost);  // Add this route for host's total revenue

module.exports = router;
