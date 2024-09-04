const express = require('express');
const router = express.Router();
const notificationsController = require('../controllers/notificationsController');
const { authToken, requireRole } = require('../middleware/authProvider');

router.get('/getNotifications',authToken,requireRole('guest','host','technician','moderator'),notificationsController.getNotifications);

module.exports = router;
