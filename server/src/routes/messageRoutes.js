const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');
const { authToken, requireRole } = require('../middleware/authProvider');

router.get('/',authToken,requireRole('guest','host','technician','moderator','admin'),messageController.getConversationsWithUnreadCount)
router.post("/send/:id",authToken,requireRole('guest','host','technician','moderator','admin'),messageController.sendMessage);
router.get("/:id",authToken,requireRole('guest','host','technician','moderator','admin'),messageController.getMessages);
router.get("/createOrSelectConversation/:id",authToken,requireRole('guest','host','technician','moderator','admin'),messageController.createOrSelectConversation);
router.get("/getTotalUnreadMessageCount/:id",authToken,requireRole('guest','host','technician','moderator','admin'),messageController.getTotalUnreadMessageCount);
router.patch("/updateReadStatus/:id",authToken,requireRole('guest','host','technician','moderator','admin'),messageController.updateReadStatus);

module.exports = router;