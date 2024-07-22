// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const { loginUser, requestRegister, verifyOtp } = require('../controllers/authController');

// Main authentication routes
router.post('/login', loginUser);
router.post('/register', requestRegister);
router.post('/verify-otp', verifyOtp);

// Mock login route for testing
router.post('/mock-login', (req, res) => {
    const { email, password } = req.body;

    // For demonstration purposes, we will use a mock check
    if (email === 'user1@gmail.com' && password === 'user1@123') {
        res.status(200).json({ message: 'Login successful' });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
});

module.exports = router;



