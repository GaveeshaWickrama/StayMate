const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');
const { authToken, requireRole } = require('../middleware/authProvider');

router.get('/',authToken,requireRole('guest','host','technician','moderator'),messageController.getConversationsWithUnreadCount)
router.post("/send/:id",authToken,requireRole('guest','host','technician','moderator'),messageController.sendMessage);
router.get("/:id",authToken,requireRole('guest','host','technician','moderator'),messageController.getMessages);
router.get("/createOrSelectConversation/:id",authToken,requireRole('guest','host','technician','moderator'),messageController.createOrSelectConversation);
router.get("/getTotalUnreadMessageCount/:id",authToken,requireRole('guest','host','technician','moderator'),messageController.getTotalUnreadMessageCount);
router.patch("/updateReadStatus/:id",authToken,requireRole('guest','host','technician','moderator'),messageController.updateReadStatus);

module.exports = router;