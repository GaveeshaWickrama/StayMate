const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/reviewController");
const { authToken, requireRole } = require("../middleware/authProvider"); // Adjust as necessary

// Add review
router.post("/add", authToken, requireRole("guest"), reviewController.addReview);

// Get host reviews
router.get("/hostreviews", authToken, requireRole("host"), reviewController.getHostReviews);

module.exports = router;
