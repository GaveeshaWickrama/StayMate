const express = require("express");
const router = express.Router();
const reservationController = require("../controllers/reservationController");
const { authToken, requireRole } = require("../middleware/authProvider"); // Adjust as necessary

// book a property
router.post(
  "/add",
  authToken,
  requireRole("guest"),
  reservationController.addReservation
);
router.get(
  "/get",
  authToken,
  requireRole("guest", "host", "admin"),
  reservationController.getReservations
);

module.exports = router;
