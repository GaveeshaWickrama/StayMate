const Review = require("../models/reviewModel");
const User = require("../models/userModel"); // Import User model
const Property = require("../models/propertyModel"); // Import Property model
const Reservation = require("../models/reservationModel");
// const asyncHandler = require("express-async-handler");

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

// //Get reviews for properties owned by the host
// const getPropertyReviews = asyncHandler(async (req, res) => {
//   const hostId = req.user._id;

//   try {
//     const reviews = await Review.find({ "property.owner": hostId })
//       .populate("user", "email")
//       .populate("property", "title");

//     res.json(reviews);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error" });
//   }
// });

module.exports = {
  addReview,
  // getPropertyReviews,
};
