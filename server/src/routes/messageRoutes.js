const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');
const { authToken, requireRole } = require('../middleware/authProvider');

router.post("/send/:id",authToken,requireRole('guest','host','technician'),messageController.sendMessage);
router.get("/:id",authToken,requireRole('guest','host','technician'),messageController.getMessages);

module.exports = router;