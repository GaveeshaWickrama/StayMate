const express = require('express');
const router = express.Router();
const complaintController = require('../controllers/complaintController');
const { authToken, requireRole } = require('../middleware/authProvider');

// get self user info (id stored in jwt token)
router.get('/',authToken,requireRole('guest'), complaintController.raiseComplaint);

module.exports = router;