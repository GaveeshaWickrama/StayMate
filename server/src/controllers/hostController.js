const Host = require("../models/hostModel");
const Complaint = require("../models/complaintModel");
const User = require("../models/userModel");
const mongoose = require("mongoose");

// Function to get host data with user details
const getHostWithUserDetails = async (matchCondition = {}) => {
  return await Host.aggregate([
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

const getAllHosts = async (req, res) => {
  try {
    const hosts = await getHostWithUserDetails();

    if (!hosts.length) {
      return res.status(404).json({ message: "No hosts found" });
    }
    res.status(200).json(hosts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const getReviews = async (req, res) => {
  let id = req.params.hostId;
  console.log("This is the host ID received in the backend:", id);

  if (id) {
    id = mongoose.Types.ObjectId.createFromHexString(id);
  }

  console.log(id);
  console.log("Host review collection name:", Host.collection.name);

  try {
    const host = await Host.findOne({ userId: id });
    const reviews = host?.reviews;

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

async function getHostById(req, res) {
  let id = req.params.id;

  id = mongoose.Types.ObjectId.createFromHexString(id);

  try {
    const hostDetails = await Host.findById(id).populate("userId").exec();

    if (!hostDetails) {
      return res.status(404).json({ message: "Host not found" });
    }
    res.status(200).json(hostDetails);
  } catch (error) {
    console.error("Error fetching host details:", error);
    res.status(500).json({
      message: "An error occurred while fetching host details",
      error,
    });
  }
}

const rateHost = async (req, res) => {
  const { rating, review, userId, complaintID, hostId } = req.body;

  try {
    if (!hostId || !rating || !userId) {
      return res.status(400).json({ error: "Required values missing" });
    }

    const host = await Host.findById(hostId);

    const complaint = await Complaint.findOne({
      _id: complaintID,
      status: "jobCompleted",
    });

    if (!host || !complaint) {
      return res.status(404).json({ error: "Host or complaint not found" });
    }

    if (!Array.isArray(host.reviews)) {
      host.reviews = [];
    }

    console.log("You are here");

    // Add the new review
    host.reviews.push({
      reviewerId: userId,
      rating,
      review,
      complaintID,
    });

    console.log(host.reviews);

    // Optionally update the overall rating
    const totalRatings = host.reviews.length;
    const totalScore = host.reviews.reduce(
      (sum, review) => sum + review.rating,
      0
    );
    host.rating = totalScore / totalRatings;

    await host.save();

    res.status(200).json({
      message: "Thank you for your feedback",
      host,
    });
  } catch (error) {
    console.error("Error publishing rating:", error);
    res.status(500).json({ message: "Error publishing rating", error });
  }
};

console.log("Host collection name:", Host.collection.name);

module.exports = {
  getReviews,
  getHostById,
  getAllHosts,
  rateHost,
  getHostWithUserDetails,
};
