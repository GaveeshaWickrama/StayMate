const express = require('express');
const router = express.Router();
const propertyController = require('../controllers/propertyController');
const { authToken, requireRole } = require('../middleware/authProvider'); // Adjust as necessary
const upload = require('../middleware/multer'); // Import multer middleware

// Create a new property (accessible by hosts and admins)
router.post('/add', authToken, requireRole('host', 'admin'), upload.array('images', 10), propertyController.createProperty);

router.get('/host-properties', authToken, requireRole('host', 'admin'), propertyController.getPropertiesByHostId);
// router.get('/host-properties', authToken, requireRole('host', 'admin'), propertyController.getPropertiesByHostId);
// Get property by ID
router.get('/:id', propertyController.getPropertyById);

module.exports = router;


