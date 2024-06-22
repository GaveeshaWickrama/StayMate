const express = require('express');
const router = express.Router();
const propertyController = require('../controllers/propertiesController');
const { authToken, requireAdmin } = require('../middleware/authProvider'); // Adjust as necessary

// Create a new property
router.post('/', authToken, requireAdmin, propertyController.createProperty);

// Get all properties
router.get('/', propertyController.getAllProperties);

// Get a single property by ID
router.get('/:id', propertyController.getProperty);

// Update a property by ID
router.patch('/:id', authToken, requireAdmin, propertyController.updateProperty);

// Delete a property by ID
router.delete('/:id', authToken, requireAdmin, propertyController.deleteProperty);

// Get properties by coordinates
router.get('/search/by-coordinates', propertyController.getPropertiesByCoordinates);

module.exports = router;
