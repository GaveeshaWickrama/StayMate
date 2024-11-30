const User = require("../models/userModel");
const Technician = require("../models/technicianModel");
const PropertyOwner = require("../models/propertyOwnerModel");
const mongoose = require("mongoose");

// Get all users
const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get a single user (My Profile)
const getUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid user ID" });
  }

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ error: "No such user" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// View Profile (URL-based ID)
const viewProfile = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid user ID" });
  }

  try {
    let user;

    if (req.user.role === "technician") {
      // Fetch technician details
      const technicianDetails = await Technician.findOne({ userId: id });
      const userDetails = await User.findById(id);

      if (!technicianDetails || !userDetails) {
        return res.status(404).json({ error: "No such user" });
      }

      // Merge user and technician details
      user = {
        ...userDetails._doc,
        ...technicianDetails._doc,
      };
    } else {
      // For non-technicians
      user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ error: "No such user" });
      }
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error viewing profile:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

// Edit Profile
const editProfile = async (req, res) => {
  console.log("VVVVVVVVVVVVVVVVVVVVVVVVVVVV came inside edit here");
  const id = req.user.userId;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid user ID" });
  }

  try {
    const updateData = { ...req.body };

    // If a file is uploaded, update the picture field
    if (req.file && req.file.path) {
      updateData.picture = req.file.path.replace(/\\/g, "/");
    }

    const user = await User.findOneAndUpdate(
      { _id: id },
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!user) {
      return res.status(404).json({ error: "No such user" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error editing profile:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};









const addAccountNo = async (req, res) => {
  const id = req.user.userId;
  console.log("User ID:", id);

  // Optional: If you're handling file uploads, you can log or process the file.
  // console.log("Uploaded file:", req.file);

  // Validate the user ID
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid user ID" });
  }

  try {
    // Create an update object with the data from the request body
    const updateData = { ...req.body };

    // Find the user by ID and update the account number or other fields
    const user = await User.findOneAndUpdate(
      { _id: id },
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!user) {
      return res.status(400).json({ error: "No such user" });
    }

    // Send the updated user data back to the client
    res.status(200).json(user);
  } catch (error) {
    console.error("Error updating Account No:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};






//delete user
const deleteUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid user ID" });
  }

  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ error: "No such user" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get All Property Owners
const getPropertyOwners = async (req, res) => {
  try {
    // Fetch all users with the role 'host'
    const propertyOwners = await User.find({ role: "host" });

    // Fetch additional details for each property owner and merge with user data
    const detailedPropertyOwners = await Promise.all(
      propertyOwners.map(async (owner) => {
        const ownerDetails = await PropertyOwner.findOne({ userId: owner._id });

        // Merge user and additional property owner details (if available)
        return {
          ...owner._doc, // User data
          ...ownerDetails?._doc, // Property owner data, if it exists
        };
      })
    );

    res.status(200).json(detailedPropertyOwners);
  } catch (error) {
    console.error("Error fetching property owners:", error);
    res.status(500).json({ error: "Failed to fetch property owners." });
  }
};

module.exports = {
  getUsers,
  getUser,
  viewProfile,
  editProfile,
  deleteUser,
  viewProfile,
  addAccountNo,
};
