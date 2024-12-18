const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const reservationController = require("../controllers/reservationController");
const { authToken, requireRole } = require("../middleware/authProvider");

// Get all moderators
router.get(
  "/moderators",
  authToken,
  requireRole("admin"),
  adminController.getModerators
);

// Get one single moderator
router.get(
  "/moderator/:id",
  authToken,
  requireRole("admin"),
  adminController.getModerator
);

// Get one single moderator
router.patch(
  "/moderator/:id",
  authToken,
  requireRole("admin"),
  adminController.getModerator
);

// Create a new moderator
router.post(
  "/moderators",
  authToken,
  requireRole("admin"),
  adminController.createModerator
);

// Delete a moderator
router.delete(
  "/moderators/:id",
  authToken,
  requireRole("admin"),
  adminController.deleteModerator
);

// Get all users (guests and hosts)
router.get(
  "/users",
  authToken,
  requireRole("admin"),
  adminController.getAllUsers
);

// Create a new user
router.post(
  "/users",
  authToken,
  requireRole("admin"),
  adminController.createUser
);

// Get a single user by ID
router.get(
  "/users/:id",
  authToken,
  requireRole("admin"),
  adminController.getUser
);

// Update a single user by ID
router.patch(
  "/users/:id",
  authToken,
  requireRole("admin"),
  adminController.updateUser
);

// Delete a single user by ID
router.delete(
  "/users/:id",
  authToken,
  requireRole("admin"),
  adminController.deleteUser
);

// Get profile details of the authenticated admin
router.get(
  "/viewProfile",
  authToken,
  requireRole("admin"),
  adminController.viewProfile
);

// Update profile details of the authenticated admin
router.put(
  "/viewProfile",
  authToken,
  requireRole("admin"),
  adminController.updateProfile
);

// Get payment details
router.get(
  "/payments",
  authToken,
  requireRole("admin"),
  reservationController.getPaymentDetails
);

router.get(
  "/users/role/:role",
  // authToken, // Ensure the request is authenticated
  // requireRole("admin"), // Restrict access to admins
  adminController.getUsersByRole
);

router.get('/technicians', adminController.getAllTechnicians);
router.get('/hosts', adminController.getAllHosts);
router.get('/guests', adminController.getAllGuests);



router.get("/summary-counts", adminController.getSummaryCounts);
router.get("/registrations-by-day", adminController.getRegistrationsByDay);
module.exports = router;
