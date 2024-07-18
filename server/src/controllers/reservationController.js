const Reservation = require("../models/reservationModel");
const Property = require("../models/propertyModel");
const User = require("../models/userModel");

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
//get reservations for user(guest or host)
const getReservations = async (req, res) => {
  const userId = req.user.userId;
  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    let reservations;

    if (user.role === "host") {
      const properties = await Property.find({ host_id: userId });

      //extract propertyids
      const propertyIds = properties.map((property) => property._id);

      //find reservations for those properties
      reservations = await Reservation.find({ property: { $in: propertyIds } })
        .populate("property")
        .populate("user");
    } else {
      reservations = await Reservation.find({ user: userId }).populate(
        "property"
      );
    }
    res.status(200).json(reservations);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error!" });
  }
};
module.exports = {
  addReservation,
  getReservations,
};
