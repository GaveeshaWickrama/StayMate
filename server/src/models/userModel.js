const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  role: {
    type: String,
    required: true,
    enum: ["guest", "host", "technician", "admin", "moderator"],
    default: "guest",
  },
  nicPassport: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  gender: {
    type: String,
    required: true,
    enum: ["male", "female", "other"],
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  assigned: {
    type: Number,
  },
  picture: {
    type: String,
  },
  createdOn: {
    type: Date,
    default: Date.now,
  },

 
    // other fields
    location: { type: String, required: true },
    // other fields
    address: { type: String, required: true },
});

module.exports = mongoose.model("User", userSchema);
