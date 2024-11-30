const express = require("express");
const { getRevenueReport, getPropertyCounts, getTotalRevenueForHost , getHostSummary , getDailySummaryForHost   } = require("../controllers/reportController");
const { authToken, requireRole } = require("../middleware/authProvider");
const router = express.Router();

// Single route to get revenue report for a specific date range
router.get("/revenue", getRevenueReport);
router.get("/counts", getPropertyCounts);

// New route to get the total revenue for a specific host
router.get("/revenue/total", getTotalRevenueForHost);  // Add this route for host's total revenue

router.get("/host-summary", authToken , getHostSummary);
router.get("/daily-summary", authToken, getDailySummaryForHost);

module.exports = router;
