const bcrypt = require('bcrypt');
const otpGenerator = require('otp-generator');
const ResetOTP = require('../models/resetOtpModel'); // Import ResetOTP
const User = require('../models/userModel'); // User model
const transporter = require('../config/emailConfig'); // Email config

// Request password reset by generating OTP
async function requestPasswordReset(req, res) {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ message: "Email is required" });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const user = await User.findOne({ email: normalizedEmail });

    if (!user) {
        return res.status(400).json({ message: "Email not found" });
    }

    try {
        const existingOtp = await ResetOTP.findOne({ email: normalizedEmail });
        console.log(existingOtp)
        if (existingOtp && !existingOtp.isUsed) {
            const currentTime = Date.now();
            const timeDifference = (currentTime - existingOtp.lastOtpTime) / 1000;
            const waitTime = (2 * existingOtp.otpCount) * 20;

            if (timeDifference < waitTime) {
                return res.status(429).json({
                    message: `Please wait ${(Math.round(waitTime - timeDifference))} seconds before requesting a new OTP.`,
                });
            }

            // Update existing OTP
            existingOtp.otpCount += 1;
            existingOtp.lastOtpTime = currentTime;
            existingOtp.otp = otpGenerator.generate(4, { upperCaseAlphabets: false, specialChars: false });
            await existingOtp.save();

            sendOtpEmail(existingOtp.otp, normalizedEmail, res);
        } else {
            // Create a new OTP entry
            const otp = otpGenerator.generate(4, { upperCaseAlphabets: false, specialChars: false });
            const otpEntry = new ResetOTP({
                email: normalizedEmail,
                otp,
            });

            await otpEntry.save();
            sendOtpEmail(otp, normalizedEmail, res);
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

// Helper function to send OTP email
function sendOtpEmail(otp, email, res) {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Password Reset OTP',
        text: `Your OTP for password reset is: ${otp}. It is valid for 10 minutes.`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) { //set to error
            console.error('Error sending OTP email:', error);
            return res.status(500).json({ message: 'Error sending OTP email' });
        } else {
            console.log('OTP email sent');
            return res.status(201).json({
                message: 'OTP sent to email. Please check your email to reset your password.',
            });
        }
    });
}

// Reset password using OTP
async function resetPassword(req, res) {
    const { email, otp, newPassword } = req.body;

    if (!email || !otp || !newPassword) {
        return res.status(400).json({ message: "Invalid Input" });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const otpEntry = await ResetOTP.findOne({ email: normalizedEmail, otp});

    if (!otpEntry) {
        return res.status(400).json({ message: "Invalid OTP or password reset request not found" });
    }

    if (newPassword.length < 8) {
        return res.status(400).json({ message: "Password must be at least 8 characters long." });
    }

    try {
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update user's password
        await User.updateOne({ email: normalizedEmail }, { password: hashedPassword });

        // Mark OTP as used
        otpEntry.isUsed = true;
        await otpEntry.save();

        res.status(200).json({ message: 'Password reset successful' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = {
    requestPasswordReset,
    resetPassword,
};
