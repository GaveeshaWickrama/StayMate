const express = require('express');
const router = express.Router();
const { loginUser, requestRegister, verifyOtp, checkNicPhone } = require('../controllers/authController');
const { requestPasswordReset, resetPassword } = require('../controllers/resetpasswordController');

router.post('/login', loginUser);
router.post('/register', requestRegister);
router.post('/verify-otp', verifyOtp);
router.post('/check-nic-phone', checkNicPhone);

router.post('/request-password-reset', requestPasswordReset);  // Fixed route to match front-end
router.post('/reset-password', resetPassword);
module.exports = router;
