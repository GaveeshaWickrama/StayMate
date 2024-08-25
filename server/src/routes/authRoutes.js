const express = require('express');
const router = express.Router();
const { loginUser, requestRegister, verifyOtp, checkNicPhone } = require('../controllers/authController');

router.post('/login', loginUser);
router.post('/register', requestRegister);
router.post('/verify-otp', verifyOtp);
router.post('/check-nic-phone', checkNicPhone);

module.exports = router;
