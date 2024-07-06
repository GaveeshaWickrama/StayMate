// host.routes.js

const express = require('express');
const router = express.Router();
const hostController = require('./host.controller');

// Define routes
router.get('/api/recent-bookings', hostController.getRecentBookings);

module.exports = router;
