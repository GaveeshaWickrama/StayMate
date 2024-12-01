const mongoose = require('mongoose');

// Define the schema for ResetOTP
const resetOTPSchema = new mongoose.Schema({
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
        index: { expires: '60m' }, // TTL index to expire OTPs after 5 minutes
    },
    otpCount: {
        type: Number,
        default: 1,
    },
    lastOtpTime: {
        type: Date,
        default: Date.now,
    }
});

// Create the model
const ResetOTP = mongoose.model('ResetOTP', resetOTPSchema);

// Export the model
module.exports = ResetOTP;
