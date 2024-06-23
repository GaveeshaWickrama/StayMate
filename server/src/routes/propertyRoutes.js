const express = require('express');
const router = express.Router();
const propertyController = require('../controllers/propertyController');
const { authToken, requireRole } = require('../middleware/authProvider'); // Adjust as necessary

// Create a new property (accessible by hosts and admins)
router.post('/add', authToken, requireRole('host', 'admin'), propertyController.createProperty);

module.exports = router;
