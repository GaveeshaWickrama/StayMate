const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/userModel');



async function loginUser(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email or Password not defined" });
    }

    const user = await User.findOne({ email: email.toLowerCase().trim() });
    if (user == null) {
        return res.status(400).json({ message: "Email not found" });
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


module.exports = {
    loginUser,

};