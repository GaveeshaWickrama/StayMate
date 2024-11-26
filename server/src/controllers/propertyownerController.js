const mongoose = require("mongoose");
const User = require("../models/userModel");
const Property = require("../models/propertyModel"); // Assuming there's a Property model related to PropertyOwners
const PropertyOwner = require("../models/PropertyOwnerModel"); // Assuming reviews for property owners

const PropertyOwnerSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    address: {
      type: String,
      required: true,
    },
    properties: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Property", // Reference to Property model
      },
    ],
    reviews: [
      {
        reviewerId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User", // Reference to the User who reviewed the property owner
          required: true,
        },
        rating: {
          type: Number,
          min: 1,
          max: 5,
          required: true,
        },
        review: {
          type: String,
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    rating: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

// Method to calculate the overall rating based on reviews
PropertyOwnerSchema.methods.calculateRating = async function () {
  const totalRatings = this.reviews.length;
  if (totalRatings === 0) return 0;

  const totalScore = this.reviews.reduce((sum, review) => sum + review.rating, 0);
  this.rating = totalScore / totalRatings;
  await this.save();
};

// Function to get property owner data with user details
const getPropertyOwnerWithUserDetails = async (matchCondition = {}) => {
  return await PropertyOwner.aggregate([
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
    {
      $lookup: {
        from: "properties",
        localField: "_id",
        foreignField: "ownerId", // Assuming the property has an ownerId field
        as: "propertiesDetails",
      },
    },
    {
      $unwind: {
        path: "$propertiesDetails",
        preserveNullAndEmptyArrays: true,
      },
    },
  ]);
};

// Function to get all property owners
const getAllPropertyOwners = async (req, res) => {
  try {
    const propertyOwners = await getPropertyOwnerWithUserDetails();

    if (!propertyOwners.length) {
      return res.status(404).json({ message: "No property owners found" });
    }
    res.status(200).json(propertyOwners);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Function to get reviews of a specific property owner
const getReviews = async (req, res) => {
  const { id } = req.params;
  try {
    const reviews = await PropertyOwnerReview.find({ propertyOwnerId: id });

    if (!reviews.length) {
      return res.status(404).json({ message: "No reviews found" });
    }
    res.status(200).json(reviews);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// Function to rate a property owner
const ratePropertyOwner = async (req, res) => {
  const { rating, review, userId, propertyOwnerId } = req.body;

  try {
    if (!propertyOwnerId || !rating || !userId) {
      return res.status(400).json({ error: "Required values missing" });
    }

    const propertyOwner = await PropertyOwner.findById(propertyOwnerId);
    if (!propertyOwner) {
      return res.status(404).json({ error: "Property owner not found" });
    }

    // Add the new review to the property owner's review array
    propertyOwner.reviews.push({
      reviewerId: userId,
      rating,
      review,
    });

    // Update the overall rating of the property owner
    await propertyOwner.calculateRating();

    res.status(200).json({ message: "Thank you for your feedback" });
  } catch (error) {
    console.error("Error publishing rating:", error);
    res.status(500).json({ message: "Error publishing rating", error });
  }
};

// Method to get property owner details by ID
async function getPropertyOwnerById(req, res) {
  let id = req.params.id;

  id = mongoose.Types.ObjectId.createFromHexString(id);

  try {
    const propertyOwnerDetails = await PropertyOwner.findById(id)
      .populate("userId")
      .populate("properties");

    if (!propertyOwnerDetails) {
      return res.status(404).json({ message: "Property owner not found" });
    }
    res.status(200).json(propertyOwnerDetails);
  } catch (error) {
    console.error("Error fetching property owner details:", error);
    res.status(500).json({ message: "An error occurred while fetching property owner details", error });
  }
}

module.exports = {
  getAllPropertyOwners,
  getReviews,
  ratePropertyOwner,
  getPropertyOwnerById,
  getPropertyOwnerWithUserDetails,
};
