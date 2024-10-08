const express = require('express');
const router = express.Router();
const moderatorController = require('../controllers/moderatorController');
const { authToken, requireRole } = require('../middleware/authProvider');

//view all pending properties which are to be listed
router.get('/viewNewProperties', authToken, requireRole('moderator'), moderatorController.viewPendingProperties);

//accept pending property
router.get('/acceptProperty/:id', authToken, requireRole('moderator'), moderatorController.accept);

//reject pending property
router.post('/rejectProperty/:id', authToken, requireRole('moderator'), moderatorController.reject);

module.exports = router;
