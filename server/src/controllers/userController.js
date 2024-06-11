const User = require('../models/userModel');
const bcrypt = require('bcrypt');

const userController = {
  createUser: async (req, res) => {
    try {
      const { email, password, role } = req.body;

      // Check if the user already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user
      const newUser = new User({
        email,
        password: hashedPassword,
        role
      });

      // Save the user to the database
      const savedUser = await newUser.save();

      res.status(201).json({
        message: 'User created successfully',
        user: {
          id: savedUser._id,
          email: savedUser.email,
          role: savedUser.role,
          createdOn: savedUser.createdOn
        }
      });
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  }
};

module.exports = userController;
