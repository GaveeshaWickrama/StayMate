const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");
const reservationController = require("../controllers/reservationController");
const { authToken, requireRole } = require("../middleware/authProvider");

//get all moderators
router.get(
  "/moderators",
  authToken,
  requireRole("admin"),
  adminController.getModerators
);

//create a new moderator
router.post(
  "/moderators",
  authToken,
  requireRole("admin"),
  adminController.createModerator
);
router.post(
  "/moderators",
  authToken,
  requireRole("admin"),
  adminController.createModerator
);

//delete a new moderator
router.delete(
  "/moderators/:id",
  authToken,
  requireRole("admin"),
  adminController.deleteModerator
);

// get all users
router.get(
  "/users",
  authToken,
  requireRole("admin"),
  adminController.getAllUsers
);

// create a user
router.post(
  "/users",
  authToken,
  requireRole("admin"),
  adminController.createUser
);

// get single user
router.get(
  "/users/:id",
  authToken,
  requireRole("admin"),
  adminController.getUser
);

// update single user
router.patch(
  "/users/:id",
  authToken,
  requireRole("admin"),
  adminController.updateUser
);

// delete single user
router.delete(
  "/users/:id",
  authToken,
  requireRole("admin"),
  adminController.deleteUser
);

//get profile details
router.get(
  "/viewProfile",
  authToken,
  requireRole("admin"),
  adminController.viewProfile
);

//get Payment Details
router.get(
  "/payments",
  authToken,
  requireRole("admin"),
  reservationController.getPaymentDetails
);

//update profile details
router.put(
  "/viewProfile",
  authToken,
  requireRole("admin"),
  adminController.updateProfile
);

module.exports = router;
