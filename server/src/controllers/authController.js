const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const validator = require('validator');
const otpGenerator = require('otp-generator');
const User = require('../models/userModel');
const Technician = require('../models/technicianModel');
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

    const normalizedEmail = email.toLowerCase().trim();
    let userCreated = false;
    let technicianCreated = false;

    try {
        // Find the OTP entry
        const otpEntry = await OTP.findOne({ email: normalizedEmail, otp });

        if (!otpEntry) {
            return res.status(400).json({ message: 'Invalid OTP or registration request not found' });
        }

        // Create new user
        const user = new User({
            ...otpEntry.userDetails,
            email: normalizedEmail
        });
        await user.save();
        userCreated = true; // Flag indicating user creation success

        // Create Technician if role is 'technician'
        if (role === 'technician') {
            const { location, subRole } = otpEntry.userDetails.technicianDetails;

            const newTechnician = new Technician({
                userId: user._id,
                location: {
                    address: location.address,
                    latitude: location.latitude,
                    longitude: location.longitude,
                    district: location.district,
                    province: location.province,
                    zipcode: location.zipcode,
                    geocoding_response: location.geocoding_response
                },
                subRole,
                rating: 0 // Initial rating
            });

            await newTechnician.save();
            technicianCreated = true; // Flag indicating technician creation success
        }

        // Delete the OTP entry
        await OTP.deleteOne({ email: normalizedEmail, otp });

        // Generate access token
        const accessToken = jwt.sign(
            {
                userId: user._id,
                email: user.email,
                role: user.role,
                firstName: user.firstName,
                lastName: user.lastName,
                gender: user.gender,
                picture: user.picture
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '24h' }
        );

        // Respond with the new user and token
        res.status(200).json({
            message: 'Email verified and user account created successfully',
            accessToken: accessToken,
            user: {
                id: user._id,
                email: user.email,
                role: user.role,
                firstName: user.firstName,
                lastName: user.lastName,
                gender: user.gender,
                picture: user.picture
            }
        });
    } catch (error) {
        console.error(error);

        // Manual rollback if any operation fails
        if (userCreated) {
            try {
                await User.deleteOne({ email: normalizedEmail });
            } catch (deleteUserError) {
                console.error('Failed to rollback user creation:', deleteUserError);
            }
        }

        if (technicianCreated) {
            try {
                await Technician.deleteOne({ userId: user._id });
            } catch (deleteTechnicianError) {
                console.error('Failed to rollback technician creation:', deleteTechnicianError);
            }
        }

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

        const newTechnician = new Technician({
            userId: null, // will be set after the user is created
            location: {
                address: location.address,
                latitude: location.latitude,
                longitude: location.longitude,
                district: location.district,
                province: location.province,
                zipcode: location.zipcode,
                geocoding_response: location.geocoding_response
            },
            subRole,
            rating: 0 // Initial rating
        });

        const newUserDetails = {
            email: normalizedEmail,
            password: hashedPassword,
            role,
            nicPassport,
            phone,
            gender,
            firstName,
            lastName,
            technicianDetails: newTechnician
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


async function checkNicPhone(req, res) {
    const { nicPassport, phone } = req.body;

    if (!nicPassport || !phone) {
        return res.status(400).json({ message: 'NIC/Passport and Phone number are required' });
    }

    const userNic = await User.findOne({ nicPassport: nicPassport.trim() });
    if (userNic) {
        return res.status(400).json({ message: 'NIC/Passport is already in use' });
    }

    const userPhone = await User.findOne({ phone: phone.trim() });
    if (userPhone) {
        return res.status(400).json({ message: 'Phone number is already in use' });
    }

    res.status(200).json({ message: 'NIC/Passport and Phone number are available' });
}

module.exports = {
    checkNicPhone,
    loginUser,
    requestRegister,
    verifyOtp
};
