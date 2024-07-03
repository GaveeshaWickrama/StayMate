const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/reviewController");
const { authToken, requireRole } = require("../middleware/authProvider"); // Adjust middleware as needed

// Fetch reviews related to properties owned by the host
router.get("/reviews", authToken, requireRole("host"), reviewController.getHostReviews);

module.exports = router;


