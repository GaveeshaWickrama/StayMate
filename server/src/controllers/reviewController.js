const Review = require("../models/reviewModel");
const User = require("../models/userModel"); // Import User model
const Property = require("../models/propertyModel"); // Import Property model
const Reservation = require("../models/reservationModel");

// add a review
const addReview = async (req, res) => {
  const { reservationId, rating, comment } = req.body;

  // Extract user ID from the token payload
  const user = req.user.userId;

  if (!user || !reservationId || !rating || !comment) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Check if the reservation exists and belongs to the user
    const reservation = await Reservation.findOne({
      _id: reservationId,
      user: user,
    });

    if (!reservation) {
      return res.status(404).json({ message: "Reservation not found" });
    }

    const review = new Review({
      user,
      reservation: reservationId,
      property: reservation.property,
      rating,
      comment,
    });

    const newReview = await review.save();
    res.status(201).json(newReview);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const getHostReviews = async (req, res) => {
  const hostId = req.user.userId; // Assuming host ID is available in req.user

  try {
    // Find properties owned by the host
    const properties = await Property.find({ host_id: hostId }).select("_id");

    // Extract property IDs from properties array
    const propertyIds = properties.map((property) => property._id);

    // Find reviews related to the properties owned by the host
    const reviews = await Review.find({ property: { $in: propertyIds } })
      .populate({
        path: "user",
        select: "firstName lastName email role createdOn", // Select all user details you need
      })
      .populate({
        path: "property",
        select:
          "title description type total_unique_sections amenities images location created_at updated_at", // Select all property details you need
      })
      .exec();

    res.status(200).json(reviews);
  } catch (error) {
    console.error("Error fetching host reviews:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const getUserReviews = async (req, res) => {
  const userId = req.user.userId;

  try {
    const reviews = await Review.find({ user: userId })
      .populate({
        path: "user",
        select: "email firstName lastName role createdOn picture", // Include 'picture' field
      })
      .populate({
        path: "property",
        select:
          "title description type total_unique_sections amenities images location created_at updated_at", // Select all property details you need
      })
      .exec();

    // Map over the reviews to add full picture URL if needed
    const reviewsWithPicture = reviews.map((review) => {
      return review;
    });

    res.status(200).json(reviewsWithPicture);
  } catch (error) {
    console.error("Error fetching user reviews:", error);
    res.status(500).json({ message: "Server Error!" });
  }
};

// Function to get reviews for a specific property
const getPropertyReviews = async (req, res) => {
  const propertyId = req.params.propertyId; // Get property ID from request params

  try {
    // Find reviews related to the specified property
    const reviews = await Review.find({ property: propertyId })
      .populate({
        path: "user",
        select: "email firstName lastName picture createdOn", // Select user details
      })
      .populate({
        path: "property",
        select: "title description location", // Select property details (optional)
      })
      .exec();

    if (!reviews || reviews.length === 0) {
      return res
        .status(404)
        .json({ message: "No reviews found for this property" });
    }

    res.status(200).json(reviews);
  } catch (error) {
    console.error("Error fetching property reviews:", error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  addReview,
  getHostReviews,
  getUserReviews,
  getPropertyReviews,
};
