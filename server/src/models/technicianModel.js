const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); // Add bcrypt for hashing passwords

const technicianSchema = new mongoose.Schema({
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
  }
}, {
  timestamps: true, // Adds createdAt and updatedAt timestamps
  collection: 'technicians' // Explicitly set the collection name
});

module.exports = mongoose.model('Technician', technicianSchema);