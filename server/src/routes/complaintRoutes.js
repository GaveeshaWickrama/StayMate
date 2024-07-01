const express = require('express');
const router = express.Router();
const complaintController = require('../controllers/complaintController');
const { authToken, requireRole } = require('../middleware/authProvider');
const upload = require('../middleware/multer'); // Import the upload configuration

// get self user info (id stored in jwt token)
/* router.get('/',authToken,requireRole('guest'), complaintController.raiseComplaint); */
router.post('/raisecomplaint',authToken,requireRole('guest'), upload.array('photos'), complaintController.raiseComplaint);

module.exports = router;