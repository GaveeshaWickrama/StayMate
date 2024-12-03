const express = require('express');
const router = express.Router();
const notificationsController = require('../controllers/notificationsController');
const { authToken, requireRole } = require('../middleware/authProvider');

router.get('/getNotifications',authToken,requireRole('guest','host','technician','moderator','admin'),notificationsController.getNotifications);
router.patch('/updateReadStatus',authToken,requireRole('guest','host','technician','moderator','admin'),notificationsController.updateReadStatus);

module.exports = router;
