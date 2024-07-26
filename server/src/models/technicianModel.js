const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); // Add bcrypt for hashing passwords
const User = require('./userModel')

const { Schema } = mongoose; // Import Schema directly


const technicianSchema = new mongoose.Schema({

  _id: {
    type: Schema.Types.ObjectId,
    default: function () {
      return new mongoose.Types.ObjectId();
    },
    validate: {
      validator: async function (value) {
        const user = await User.findOne({ _id: value, role: 'technician' });
        return !!user;
      },
      message: 'The provided ID does not exist as a technician in the User collection'
    }
  },

  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  location: {
    type: String
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 8
  },
  role: {
    type: String,
    required: true,
    enum: ['guest', 'host', 'technician', 'admin', 'moderator'], // Specifies the allowable roles
    default: 'technician' // Default role when none is specified
  },
  proPic: { type: String },

}, {
  timestamps: true, // Adds createdAt and updatedAt timestamps
  collection: 'technicians' // Explicitly set the collection name
});

module.exports = mongoose.model('technician', technicianSchema);
