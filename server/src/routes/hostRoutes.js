const express = require('express');
const router = express.Router();
const hostController = require('../controllers/hostController'); // Adjust the path to your controller

router.get('/recent', hostController.getRecentBookings);
router.get('/total-income', hostController.getTotalMonthlyIncome);
router.get('/total-properties', hostController.getTotalProperties); // Added route for total properties

module.exports = router;
