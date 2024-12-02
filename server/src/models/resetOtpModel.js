const mongoose = require('mongoose');

const resetOtpSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    otp: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        index: { expires: '10m' }, // OTP expires after 10 minutes
    },
    otpCount: {
        type: Number,
        default: 1,
    },
    lastOtpTime: {
        type: Date,
        default: Date.now,
    },
    isUsed: {
        type: Boolean,
        default: false, // Flag to check if the OTP has been used
    },
});

module.exports = mongoose.model('ResetOTP', resetOtpSchema);
