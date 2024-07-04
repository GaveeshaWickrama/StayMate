const Review = require("../models/reviewModel");
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

// Fetch reviews related to properties owned by the host
 const getHostReviews = async (req, res) => {
   const hostId = req.user.userId; // Assuming host ID is available in req.user

   try {
     const reviews = await Review.find({ "property.host": hostId })
       .populate("user", "username") // Populate the 'user' field with 'username'
       .populate("reservation", "booking_date") // Populate the 'reservation' field with 'booking_date'
       .populate("property", "name"); // Populate the 'property' field with 'name'

     res.status(200).json(reviews);
   } catch (error) {
     console.error("Error fetching host reviews:", error);
     res.status(500).json({ message: "Server error" });
   }
 };
module.exports = {
  addReview, getHostReviews
};