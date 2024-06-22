const express = require('express');
const router = express.Router();
const propertyController = require('../controllers/propertyController');
const { authToken, requireRole } = require('../middleware/authProvider'); // Adjust as necessary

// Create a new property (accessible by hosts and admins)
router.post('/add', authToken, requireRole('host', 'admin'), propertyController.createProperty);

// Get all properties (accessible by all authenticated users)
router.get('/', authToken, requireRole('host', 'admin', 'guest', 'user', 'technician'), propertyController.getAllProperties);

// Get a single property by ID (accessible by all authenticated users)
router.get('/:id', authToken, requireRole('host', 'admin', 'guest', 'user', 'technician'), propertyController.getProperty);

// Update a property by ID (accessible by hosts and admins)
router.patch('/:id', authToken, requireRole('host', 'admin'), propertyController.updateProperty);

// Delete a property by ID (accessible by admins)
router.delete('/:id', authToken, requireRole('admin'), propertyController.deleteProperty);

// Get properties by coordinates (accessible by all authenticated users)
router.get('/search/by-coordinates', authToken, requireRole('host', 'admin', 'guest', 'user', 'technician'), propertyController.getPropertiesByCoordinates);

module.exports = router;
