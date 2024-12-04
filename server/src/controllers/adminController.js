const User = require("../models/userModel");
const mongoose = require("mongoose");
const Technician = require("../models/technicianModel");
const Property = require("../models/propertyModel"); // Assuming you have a Property model
const Reservation = require("../models/reservationModel");
const Host = require("../models/hostModel");
const Guest = require("../models/guestModel");

// Get all Moderators
const getModerators = async (req, res) => {
  try {
    const users = await User.find({ role: "moderator" }).sort({ createdAt: -1 });
    res.status(200).json(users);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//getting a single moderator
const getModerator = async (req, res) => {
  const { id } = req.params;

  // Ensure the id is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid Moderator ID" });
  }

  try {
    // Fetch the moderator by id
    const moderator = await User.findById(id);
    if (!moderator || moderator.role !== 'moderator') {
      return res.status(404).json({ error: "Moderator not found" });
    }

    // Send the moderator data as response
    res.status(200).json(moderator);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//update a mod
const updateModerator = async (req, res) => {
  const { id } = req.params;

  // Ensure the id is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid Moderator ID" });
  }

  try {
    // Fetch the moderator by id
    const moderator = await User.findById(id);
    if (!moderator || moderator.role !== "moderator") {
      return res.status(404).json({ error: "Moderator not found" });
    }

    // Update the moderator's fields from the request body
    Object.keys(req.body).forEach((key) => {
      moderator[key] = req.body[key];
    });

    // Save the updated moderator
    const updatedModerator = await moderator.save();
    res.status(200).json(updatedModerator);
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

// Get all Hosts
const getAllHosts = async (req, res) => {
  try {
    const hosts = await Host.find().populate(
      "userId",
      "firstName lastName email phone"
    ); // Optionally populate user fields
    res.status(200).json(hosts);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all guests
const getAllGuests = async (req, res) => {
  try {
    const guests = await Guest.find().populate(
      "userId",
      "firstName lastName email phone"
    ); // Optionally populate user fields
    res.status(200).json(guests);
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


const getUsersByRole = async (req, res) => {
  const { role } = req.params; // Get the role from the request parameters

  // Validate the role
  const validRoles = ["guest", "host", "technician", "admin", "moderator"];
  if (!validRoles.includes(role)) {
    return res.status(400).json({ error: "Invalid role specified" });
  }

  try {
    // Fetch users with the specified role
    const users = await User.find({ role }).sort({ createdAt: -1 }); // Sort by creation date (newest first)

    if (users.length === 0) {
      return res.status(404).json({ message: "No users found for the specified role." });
    }

    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users by role:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


const getSummaryCounts = async (req, res) => {
  try {
    // Fetch total user count
    const totalUsers = await User.countDocuments();

    // Fetch total property count
    const totalProperties = await Property.countDocuments();

    // Fetch total upcoming reservations (including ongoing)
    const upcomingReservations = await Reservation.countDocuments({
      status: { $in: ["upcoming", "ongoing"] },
    });

    // Fetch total completed reservations
    const completedReservations = await Reservation.countDocuments({
      status: "completed",
    });

    // Send the counts as response
    res.status(200).json({
      totalUsers,
      totalProperties,
      upcomingReservations,
      completedReservations,
    });
  } catch (error) {
    console.error("Error fetching summary counts:", error);
    res.status(500).json({ error: "Failed to fetch summary counts" });
  }
};

const getRegistrationsByDay = async (req, res) => {
  const { startDate, endDate } = req.query;

  // Validate date range
  if (!startDate || !endDate) {
    return res
      .status(400)
      .json({ error: "Please provide both startDate and endDate." });
  }

  try {
    // Ensure the dates are valid
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (isNaN(start) || isNaN(end)) {
      return res.status(400).json({ error: "Invalid date format." });
    }

    // Generate a full date range
    const dateRange = [];
    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      dateRange.push(d.toISOString().slice(0, 10)); // Format as YYYY-MM-DD
    }

    // Query for host and guest registrations grouped by date
    const registrations = await User.aggregate([
      {
        $match: {
          role: { $in: ["guest", "host"] }, // Filter only guests and hosts
          createdOn: { $gte: start, $lte: end }, // Filter by date range
        },
      },
      {
        $group: {
          _id: {
            date: { $dateToString: { format: "%Y-%m-%d", date: "$createdOn" } },
            role: "$role",
          },
          count: { $sum: 1 },
        },
      },
      {
        $group: {
          _id: "$_id.date",
          registrations: {
            $push: { role: "$_id.role", count: "$count" },
          },
        },
      },
      {
        $sort: { _id: 1 }, // Sort by date
      },
    ]);

    // Convert the results into a map for easy lookup
    const registrationMap = new Map();
    registrations.forEach((entry) => {
      const data = { date: entry._id };
      entry.registrations.forEach((reg) => {
        data[reg.role] = reg.count;
      });
      registrationMap.set(entry._id, data);
    });

    // Create the final output with all dates
    const formattedResult = dateRange.map((date) => {
      const data = registrationMap.get(date) || { date };
      data.guest = data.guest || 0;
      data.host = data.host || 0;
      return data;
    });

    res.status(200).json(formattedResult);
  } catch (error) {
    console.error("Error fetching registrations by day:", error);
    res.status(500).json({ error: "Internal server error" });
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
  getAllGuests,
  getAllHosts,
  getModerator,
  updateModerator,
  getUsersByRole,
  getSummaryCounts,
  getRegistrationsByDay,
};
