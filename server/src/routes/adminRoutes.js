const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { authToken, requireRole } = require('../middleware/authProvider');

// Get all moderators
router.get('/moderators', authToken, requireRole('admin'), adminController.getModerators);

// Create a new moderator
router.post('/moderators', authToken, requireRole('admin'), adminController.createModerator);

// Get all users
router.get('/users', authToken, requireRole('admin'), adminController.getAllUsers);

// Create a user
router.post('/users', authToken, requireRole('admin'), adminController.createUser);

// Get single user
router.get('/users/:id', authToken, requireRole('admin'), adminController.getUser);

// Update single user
router.patch('/users/:id', authToken, requireRole('admin'), adminController.updateUser);

// Delete single user
router.delete('/users/:id', authToken, requireRole('admin'), adminController.deleteUser);

// Get profile details
router.get('/viewProfile', authToken, requireRole('admin'), adminController.viewProfile);

// Update profile details
router.put('/viewProfile', authToken, requireRole('admin'), adminController.updateProfile);

// Get all technicians
router.get('/technicians', adminController.getAllTechnicians);

module.exports = router;
