const Guest = require("../models/guestModel");
const Complaint = require("../models/complaintModel");
const User = require("../models/userModel");
const mongoose = require("mongoose");

// Function to get guest data with user details
const getGuestWithUserDetails = async (matchCondition = {}) => {
  return await Guest.aggregate([
    {
      $match: matchCondition,
    },
    {
      $lookup: {
        from: "users",
        localField: "userId",
        foreignField: "_id",
        as: "userDetails",
      },
    },
    {
      $unwind: "$userDetails",
    },
  ]);
};

const getAllGuests = async (req, res) => {
  try {
    const guests = await getGuestWithUserDetails();

    if (!guests.length) {
      return res.status(404).json({ message: "No guests found" });
    }
    res.status(200).json(guests);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const getReviews = async (req, res) => {
  let id = req.params.guestId;
  console.log("This is the guest ID received in the backend:", id); // userId

  if (id) {
    id = mongoose.Types.ObjectId.createFromHexString(id);
  }

  console.log(id);
  console.log("Guest review collection name:", Guest.collection.name);
  try {
    const guest = await Guest.findOne({ userId: id });
    const reviews = guest?.reviews;

    if (!reviews || !reviews.length) {
      console.log("No reviews found");
      return res.status(404).json({ message: "No reviews found" });
    }
    res.status(200).json(reviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

async function getGuestById(req, res) {
  let id = req.params.id;

  id = mongoose.Types.ObjectId.createFromHexString(id);

  try {
    const guestDetails = await Guest.findById(id)
      .populate("userId")
      .exec();

    if (!guestDetails) {
      return res.status(404).json({ message: "Guest not found" });
    }
    res.status(200).json(guestDetails);
  } catch (error) {
    console.error("Error fetching guest details:", error);
    res.status(500).json({
      message: "An error occurred while fetching guest details",
      error,
    });
  }
}

const rateGuest = async (req, res) => {
  const { rating, review, userId, complaintID, guestId } = req.body;

  try {
    if (!guestId || !rating || !userId) {
      return res.status(400).json({ error: "Required values missing" });
    }

    const guest = await Guest.findById(guestId);

    const complaint = await Complaint.findOne({
      _id: complaintID,
      status: "jobCompleted",
    });

    if (!guest || !complaint) {
      return res.status(404).json({ error: "Guest or complaint not found" });
    }

    if (!Array.isArray(guest.reviews)) {
      guest.reviews = [];
    }

    // Add the new review
    guest.reviews.push({
      reviewerId: userId,
      rating,
      review,
      complaintID,
    });

    // Optionally update the overall rating
    const totalRatings = guest.reviews.length;
    const totalScore = guest.reviews.reduce((sum, review) => sum + review.rating, 0);
    guest.rating = totalScore / totalRatings;
    await guest.save();

    res.status(200).json({
      message: "Thank you for your feedback",
      guest,
    });
  } catch (error) {
    console.error("Error publishing rating:", error);
    res.status(500).json({ message: "Error publishing rating", error });
  }
};

console.log("Guest collection name:", Guest.collection.name);

module.exports = {
  getReviews,
  getGuestById,
  getAllGuests,
  rateGuest,
  getGuestWithUserDetails,
};
