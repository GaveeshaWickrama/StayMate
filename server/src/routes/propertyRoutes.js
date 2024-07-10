const express = require('express');
const router = express.Router();
const propertyController = require('../controllers/propertyController');
const { authToken, requireRole } = require('../middleware/authProvider'); // Adjust as necessary
const upload = require('../middleware/multer'); // Import multer middleware

// Create a new property (accessible by hosts and admins)
router.post('/add', authToken, requireRole('host', 'admin'), upload.array('images', 10), propertyController.createProperty);

// Get properties by host ID (accessible by hosts and admins)
router.get('/host-properties', authToken, requireRole('host', 'admin'), propertyController.getPropertiesByHostId);

// Get property by ID
router.get('/:id', propertyController.getPropertyById);

// Get host details for a property
router.get('/:id/host', propertyController.getPropertyHostById);

// Get all properties with optional geospatial querying and pagination
router.get('/', propertyController.getAllProperties);

module.exports = router;


