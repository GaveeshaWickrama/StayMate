const express = require("express");
const router = express.Router();
const reviewController = require("../controllers/reviewController");
const { authToken, requireRole } = require("../middleware/authProvider"); // Adjust as necessary

// add review
router.post(
  "/add",
  authToken,
  requireRole("guest"),
  reviewController.addReview
);
router.get(
  "/hostreviews",
  authToken,
  requireRole("host"),
  reviewController.getHostReviews
);

// // view review
// router.get( "/view", authToken, requireRole("host"), reviewController.getPropertyReviews );

module.exports = router;
