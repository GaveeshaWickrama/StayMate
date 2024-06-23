const Reservation = require("../models/reservationModel");

// add a reservation
const addReservation = async (req, res) => {
  const {
    property,
    checkInDate,
    checkOutDate,
    totalPrice,
    noOfGuests,
    paymentStatus,
  } = req.body;

  // Extract user ID from the token payload
  const user = req.user.userId;

  if (
    !user ||
    !property ||
    !checkInDate ||
    !checkOutDate ||
    !totalPrice ||
    !noOfGuests
  ) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const reservation = new Reservation({
      user,
      property,
      checkInDate,
      checkOutDate,
      totalPrice,
      noOfGuests,
      paymentStatus: paymentStatus || false,
    });

    const newReservation = await reservation.save();
    res.status(201).json(newReservation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  addReservation,
};
