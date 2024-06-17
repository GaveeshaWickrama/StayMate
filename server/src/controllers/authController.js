const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validator = require('validator');
const otpGenerator = require('otp-generator');
const User = require('../models/userModel');
const OTP = require('../models/otpModel');
const transporter = require('../config/emailConfig');

async function loginUser(req, res) {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
        return res.status(400).json({ message: "Email, Password, or Role not defined" });
    }

    const user = await User.findOne({ email: email.toLowerCase().trim(), role });
    if (!user) {
        return res.status(400).json({ message: "Email or Role not found" });
    }

    try {
        if (await bcrypt.compare(password, user.password)) {
            const accessToken = jwt.sign(
                { userId: user._id, email: user.email, role: user.role },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '24h' } // Token expires in 24 hours
            );
            res.json({
                accessToken: accessToken,
                user: { id: user._id, email: user.email, role: user.role }
            });
        } else {
            res.status(401).json({ message: "Incorrect Email or Password" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send();
    }
}

async function requestRegister(req, res) {
    try {
        const { email, password, role } = req.body;

        if (!email || !password || !role) {
            return res.status(400).json({ message: "Email, Password, or Role not defined" });
        }

        // Validate email format
        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: "Invalid email format." });
        }

        // Check if email and role combination already exists
        const normalizedEmail = email.toLowerCase().trim();
        const existingUser = await User.findOne({ email: normalizedEmail, role });
        if (existingUser) {
            return res.status(400).json({ message: "Email and Role already in use." });
        }

        if (password.length < 8) {
            return res.status(400).json({ message: "Password must be at least 8 characters long." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUserDetails = {
            email: normalizedEmail,
            password: hashedPassword,
            role
        };

        // Check if an OTP request has already been sent
        const existingOtp = await OTP.findOne({ email: normalizedEmail, 'userDetails.role': role });
        if (existingOtp) {
            const currentTime = Date.now();
            const timeDifference = (currentTime - existingOtp.lastOtpTime) / 1000; // in seconds
            const waitTime = (2 * existingOtp.otpCount) * 20; // 40s 80s 160s etc ..

            if (timeDifference < waitTime) {
                return res.status(429).json({ message: `Please wait ${(waitTime - timeDifference)} S before requesting a new OTP.` });
            }

            // Update OTP count and lastOtpTime
            existingOtp.otpCount += 1;
            existingOtp.lastOtpTime = currentTime;
            existingOtp.otp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false });
            existingOtp.userDetails = newUserDetails;
            await existingOtp.save();

            // Send OTP email
            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: normalizedEmail,
                subject: 'Email Verification OTP',
                text: `Your OTP for email verification is: ${existingOtp.otp}. It is valid for 5 minutes.`,
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (false) {
                    console.error('Error sending OTP email:', error);
                    return res.status(500).json({ message: 'Error sending OTP email' });
                } else {
                    console.log('OTP email sent');
                    return res.status(201).json({
                        message: 'OTP sent to email. Please check your email to verify your account.',
                    });
                }
            });
        } else {
            // Generate OTP
            const otp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false });
            const otpEntry = new OTP({ email: normalizedEmail, otp, userDetails: newUserDetails });
            await otpEntry.save();

            // Send OTP email
            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: normalizedEmail,
                subject: 'Email Verification OTP',
                text: `Your OTP for email verification is: ${otp}. It is valid for 5 minutes.`,
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (false) {
                    console.error('Error sending OTP email:', error);
                    return res.status(500).json({ message: 'Error sending OTP email' });
                } else {
                    console.log('OTP email sent:', info.response);
                    return res.status(201).json({
                        message: 'OTP sent to email. Please check your email to verify your account.',
                    });
                }
            });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
}

async function verifyOtp(req, res) {
    const { email, otp, role } = req.body;

    if (!email || !otp || !role) {
        return res.status(400).json({ message: 'Email, OTP, and Role are required' });
    }

    try {
        const emailfound = await OTP.findOne({ email });

        if (!emailfound) {
            return res.status(400).json({ message: 'Registration request not found' });
        }

        const otpEntry = await OTP.findOne({ email, otp });

        if (!otpEntry) {
            return res.status(400).json({ message: 'Invalid OTP' });
        }

        // Create user
        const user = new User(otpEntry.userDetails);
        await user.save();

        // Delete the OTP entry after verification
        await OTP.deleteOne({ email, otp });

        // Generate JWT token
        const accessToken = jwt.sign(
            { userId: user._id, email: user.email, role: user.role },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '24h' }
        );

        res.status(200).json({
            message: 'Email verified and user account created successfully',
            accessToken: accessToken,
            user: { id: user._id, email: user.email, role: user.role }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = {
    loginUser,
    requestRegister,
    verifyOtp
};
