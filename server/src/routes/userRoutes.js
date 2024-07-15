// In userController.js
const express = require('express');
const router = express.Router();
const authToken = require('../middleware/authToken');
const requireRole = require('../middleware/requireRole');
const userController = require('../controllers/userController'); // Import the user controller

async function getAllUsers(req, res) {
    try {
        const users = await User.find({});
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// Export the function
module.exports = {
    getUser,
    updateUser,
    getAllUsers, // Add this line
};

// In your user route file
router.get('/users', authToken, requireRole('admin'), userController.getAllUsers);
router.get('/users/:id', authToken, requireRole('admin'), userController.getUser);
