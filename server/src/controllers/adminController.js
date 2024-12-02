const User = require("../models/userModel");
const mongoose = require("mongoose");
const Technician = require("../models/technicianModel");

// Get all Moderators
const getModerators = async (req, res) => {
  try {
    const users = await User.find({ role: "moderator" }).sort({ createdAt: -1 });
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Create a new moderator
const createModerator = async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    password,
    nicPassport,
    gender,
    address,
    role,
    phone,
  } = req.body;

  let emptyFields = [];

  if (!firstName) {
    emptyFields.push("firstName");
  } else if (!/^[A-Za-z]+$/.test(firstName)) {
    emptyFields.push("firstName: only letters are allowed without spaces");
  }

  if (!lastName) {
    emptyFields.push("lastName");
  } else if (!/^[A-Za-z]+$/.test(lastName)) {
    emptyFields.push("lastName: only letters are allowed without spaces");
  }

  if (!email) {
    emptyFields.push("email");
  }

  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all the fields.", emptyFields });
  }

  // Add to db
  try {
    const moderator = await User.create({
      firstName,
      lastName,
      email,
      password,
      nicPassport,
      gender,
      address,
      role,
      phone,
    });
    res.status(200).json(moderator);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a Moderator
const deleteModerator = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid Moderator ID" });
  }

  try {
    const moderator = await User.findOneAndDelete({ _id: id });
    if (!moderator) {
      return res.status(404).json({ error: "No such Moderator" });
    }
    res.status(200).json(moderator);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all Technicians
const getAllTechnicians = async (req, res) => {
  try {
    const technicians = await Technician.find().populate(
      "userId",
      "firstName lastName email phone"
    ); // Optionally populate user fields
    res.status(200).json(technicians);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Other User Functions
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({ role: { $in: ["guest", "host"] } }).sort({
      createdAt: -1,
    });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createUser = async (req, res) => {
  const user = new User(req.body);
  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "Not found" });
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "Not found" });

    Object.keys(req.body).forEach((key) => {
      user[key] = req.body[key];
    });

    const updatedUser = await user.save();
    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: "Not found" });
    res.json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const viewProfile = async (req, res) => {
  const userId = req.user.userId;

  try {
    const user = await User.findById(userId);
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "Invalid user ID" });
    }
    if (!user) return res.status(404).json({ message: "Not found" });

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateProfile = async (req, res) => {
  const userId = req.user.userId;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "Not found" });

    Object.keys(req.body).forEach((key) => {
      user[key] = req.body[key];
    });

    const updatedUser = await user.save();
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAllUsers,
  createUser,
  getUser,
  updateUser,
  deleteUser,
  viewProfile,
  updateProfile,
  getModerators,
  createModerator,
  deleteModerator,
  getAllTechnicians,
};
