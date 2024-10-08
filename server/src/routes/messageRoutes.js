const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');
const { authToken, requireRole } = require('../middleware/authProvider');

router.get('/',authToken,requireRole('guest','host','technician','moderator'),messageController.getContacts)
router.post("/send/:id",authToken,requireRole('guest','host','technician','moderator'),messageController.sendMessage);
router.get("/:id",authToken,requireRole('guest','host','technician','moderator'),messageController.getMessages);
router.get("/createOrSelectConversation/:id",authToken,requireRole('guest','host','technician','moderator'),messageController.createOrSelectConversation);

module.exports = router;