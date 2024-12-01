const express = require("express");
const router = express.Router();
const {
  getAllHosts,
  deleteHost,
  getReviews,
  rateHost,
} = require("../controllers/hostController");

// Routes
router.get("/", getAllHosts);  // Fetch all hosts
router.delete("/:id", deleteHost);  // Delete a specific host
router.get("/:id/reviews", getReviews);  // Get reviews for a host
router.post("/:id/reviews", rateHost);  // Rate a host

module.exports = router;
