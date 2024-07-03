const Review = require("../models/reviewModel");

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
  getHostReviews,
};

