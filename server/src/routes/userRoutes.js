const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authToken, requireRole } = require('../middleware/authProvider');

// get self user info (id stored in jwt token)
router.get('/', authToken, requireRole('user', 'admin', 'guest', 'host', 'technician'), userController.getUser);

// patch self user info (id stored in jwt token)
router.patch('/', authToken, requireRole('user', 'admin', 'guest', 'host', 'technician'), userController.updateUser);

module.exports = router;
