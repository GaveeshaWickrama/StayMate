const Technician = require("../models/technicianModel");
const User = require("../models/userModel");
const TechnicianReview = require("../models/technicianReviewModel");
const mongoose = require("mongoose");

// Function to get technician data with user details
const getTechnicianWithUserDetails = async (matchCondition = {}) => {
  return await Technician.aggregate([
    {
      $match: matchCondition
    },
    {
      $lookup: {
        from: 'users',
        localField: 'userId',
        foreignField: '_id',
        as: 'userDetails'
      }
    },
    {
      $unwind: '$userDetails'
    }
  ]);
};

const getAllTechnicians = async (req, res) => {
  try {
    const technicians = await getTechnicianWithUserDetails();

    if (!technicians.length) {
      return res.status(404).json({ message: "No technicians found" });
    }
    res.status(200).json(technicians);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const getTechnicianById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid technician ID" });
  }

  try {
    const technician = await getTechnicianWithUserDetails({ userId: new mongoose.Types.ObjectId(id) });

    if (!technician.length) {
      return res.status(404).json({ message: "Technician not found" });
    }
    res.status(200).json(technician[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const getReviews = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  console.log("Technician review collection name:", TechnicianReview.collection.name);
  try {
    console.log(res.data);
    const reviews = await TechnicianReview.find({ technicianId: id });
    if (!reviews.length) {
      console.log("No reviews found");
      return res.status(404).json({ message: "No reviews found" });
    }
    res.status(200).json(reviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

console.log("Technician collection name:", Technician.collection.name);

module.exports = {
  getReviews,
  getTechnicianById,
  getAllTechnicians,
};
