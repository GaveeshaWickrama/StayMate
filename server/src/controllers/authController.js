const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validator = require('validator');
const otpGenerator = require('otp-generator');
const User = require('../models/userModel');
const OTP = require('../models/otpModel');
const transporter = require('../config/emailConfig');

const ALLOWED_ROLES = ['guest', 'host', 'technician', 'moderator'];

async function loginUser(req, res) {
    const { email, password } = req.body;

    if (!email || !password ) {
        return res.status(400).json({ message: "Email or Password not defined" });
    }

    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (!user) {
        return res.status(400).json({ message: "Email not found" });
    }

    try {
        if (await bcrypt.compare(password, user.password)) {
            const accessToken = jwt.sign(
                { userId: user._id, email: user.email, role: user.role, firstName: user.firstName, lastName: user.lastName, gender: user.gender, picture: user.picture },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '24h' } // Token expires in 24 hours
            );
            res.json({
                accessToken: accessToken,
                user: { id: user._id, email: user.email, role: user.role, firstName: user.firstName, lastName: user.lastName, gender: user.gender, picture: user.picture  }
            });
        } else {
            res.status(401).json({ message: "Incorrect Email or Password" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send();
    }
}

async function verifyOtp(req, res) {
    const { email, otp, role } = req.body;

    if (!email || !otp || !role) {
        return res.status(400).json({ message: 'Invalid Input' });
    }

    if (!ALLOWED_ROLES.includes(role)) {
        return res.status(400).json({ message: "Invalid role" });
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

        const user = new User(otpEntry.userDetails);
        await user.save();

        await OTP.deleteOne({ email, otp });

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

async function requestRegisterTechnician(req, res) {
    try {
        const { email, password, role, nicPassport, phone, gender, firstName, lastName, location, subRole } = req.body;

        if (!email || !password || !role || !nicPassport || !phone || !gender || !firstName || !lastName || !location || !subRole) {
            return res.status(400).json({ message: "All fields are required." });
        }

        if (!ALLOWED_ROLES.includes(role) || role !== 'technician') {
            return res.status(400).json({ message: "Invalid role" });
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: "Invalid email format." });
        }

        const normalizedEmail = email.toLowerCase().trim();
        const existingUser = await User.findOne({ email: normalizedEmail });

        if (existingUser) {
            return res.status(400).json({ message: "Email already in use." });
        }

        if (password.length < 8) {
            return res.status(400).json({ message: "Password must be at least 8 characters long." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUserDetails = {
            email: normalizedEmail,
            password: hashedPassword,
            role,
            nicPassport,
            phone,
            gender,
            firstName,
            lastName
        };

        const existingOtp = await OTP.findOne({ email: normalizedEmail });

        if (existingOtp) {
            const currentTime = Date.now();
            const timeDifference = (currentTime - existingOtp.lastOtpTime) / 1000;
            const waitTime = (2 * existingOtp.otpCount) * 20;

            if (timeDifference < waitTime) {
                return res.status(429).json({ message: `Please wait ${(Math.round(waitTime - timeDifference))} seconds before requesting a new OTP.` });
            }

            existingOtp.otpCount += 1;
            existingOtp.lastOtpTime = currentTime;
            existingOtp.otp = otpGenerator.generate(4, { upperCaseAlphabets: false, specialChars: false });
            existingOtp.userDetails = newUserDetails;
            await existingOtp.save();

            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: normalizedEmail,
                subject: 'Email Verification OTP',
                text: `Your OTP for email verification is: ${existingOtp.otp}. It is valid for 5 minutes.`,
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
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
            const otp = otpGenerator.generate(4, { upperCaseAlphabets: false, specialChars: false });
            const otpEntry = new OTP({ email: normalizedEmail, otp, userDetails: newUserDetails });
            await otpEntry.save();

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
                    console.log('OTP email sent');
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

async function requestRegisterUser(req, res) {
    try {
        const { email, password, role, nicPassport, phone, gender, firstName, lastName } = req.body;

        if (!email || !password || !role || !nicPassport || !phone || !gender || !firstName || !lastName) {
            return res.status(400).json({ message: "All fields are required." });
        }

        if (!ALLOWED_ROLES.includes(role) || role === 'technician') {
            return res.status(400).json({ message: "Invalid role" });
        }

        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: "Invalid email format." });
        }

        const normalizedEmail = email.toLowerCase().trim();
        const existingUser = await User.findOne({ email: normalizedEmail });

        if (existingUser) {
            return res.status(400).json({ message: "Email already in use." });
        }

        if (password.length < 8) {
            return res.status(400).json({ message: "Password must be at least 8 characters long." });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUserDetails = {
            email: normalizedEmail,
            password: hashedPassword,
            role,
            nicPassport,
            phone,
            gender,
            firstName,
            lastName
        };

        const existingOtp = await OTP.findOne({ email: normalizedEmail });

        if (existingOtp) {
            const currentTime = Date.now();
            const timeDifference = (currentTime - existingOtp.lastOtpTime) / 1000;
            const waitTime = (2 * existingOtp.otpCount) * 20;

            if (timeDifference < waitTime) {
                return res.status(429).json({ message: `Please wait ${(Math.round(waitTime - timeDifference))} seconds before requesting a new OTP.` });
            }

            existingOtp.otpCount += 1;
            existingOtp.lastOtpTime = currentTime;
            existingOtp.otp = otpGenerator.generate(4, { upperCaseAlphabets: false, specialChars: false });
            existingOtp.userDetails = newUserDetails;
            await existingOtp.save();

            const mailOptions = {
                from: process.env.EMAIL_USER,
                to: normalizedEmail,
                subject: 'Email Verification OTP',
                text: `Your OTP for email verification is: ${existingOtp.otp}. It is valid for 5 minutes.`,
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
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
            const otp = otpGenerator.generate(4, { upperCaseAlphabets: false, specialChars: false });
            const otpEntry = new OTP({ email: normalizedEmail, otp, userDetails: newUserDetails });
            await otpEntry.save();

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
                    console.log('OTP email sent');
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

async function requestRegister(req, res) {
    const { role } = req.body;

    if (role === 'technician') {
        return requestRegisterTechnician(req, res);
    } else {
        return requestRegisterUser(req, res);
    }
}

module.exports = {
    loginUser,
    requestRegister,
    verifyOtp
};
