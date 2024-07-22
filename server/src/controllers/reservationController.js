const Reservation = require("../models/reservationModel");
const Property = require("../models/propertyModel");
const User = require("../models/userModel");

// Function to update reservation statuses based on checkOutDate and checkInDate
const updateReservationStatuses = async () => {
  try {
    await Reservation.updateStatuses();
  } catch (error) {
    console.error("Error updating reservation statuses:", error);
  }
};
// add a reservation
const addReservation = async (req, res) => {
  const {
    property,
    sectionId,
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
    !sectionId ||
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
      sectionId,
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
//get reservations for user(guest ,host or admin)
const getReservations = async (req, res) => {
  const userId = req.user.userId;
  console.log("UserId:", userId);
  try {
    await Reservation.updateStatuses(); // Update statuses before fetching reservations

    const user = await User.findById(userId);
    console.log(user);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    let reservations;

    if (user.role === "admin") {
      // Fetch all reservations for admin
      reservations = await Reservation.find()
        .populate({
          path: "property",
          populate: {
            path: "host_id",
            select: "firstName lastName",
          },
        })
        .populate("user", "firstName lastName");
    } else if (user.role === "host") {
      const properties = await Property.find({ host_id: userId });

      // Extract property ids
      const propertyIds = properties.map((property) => property._id);

      // Find reservations for those properties
      reservations = await Reservation.find({ property: { $in: propertyIds } })
        .populate("property")
        .populate("user");
    } else {
      // Fetch reservations for the guest user
      reservations = await Reservation.find({ user: userId })
        .populate("property")
        .populate("user", "firstName lastName");
    }

    res.status(200).json(reservations);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server Error!" });
  }
};

//function to fetch Payment details to admin
const getPaymentDetails = async (req, res) => {
  try {
    // Fetch reservations with total amount
    const reservations = await Reservation.find({})
      .populate("property", "host_id title")
      .populate({
        path: "property",
        populate: { path: "host_id", select: "firstName lastName" },
      })
      .populate({
        path: "user",
        select: "firstName lastName", // Populate user with firstName and lastName
      })
      .select("totalPrice paymentStatus checkInDate checkOutDate");

    // Calculate service fee and amount to host, and format response
    const enrichedReservations = reservations.map((reservation) => {
      const totalAmount = reservation.totalPrice;
      const serviceFee = totalAmount * 0.1; // 10% service fee
      const amountToHost = totalAmount - serviceFee;
      const hostFirstName = reservation.property.host_id.firstName;
      const hostLastName = reservation.property.host_id.lastName;
      const hostFullName = `${hostFirstName} ${hostLastName}`;

      return {
        reservationId: reservation._id,
        totalAmount,
        serviceFee,
        amountToHost,
        paymentStatus: reservation.paymentStatus,
        hostName: hostFullName,
        title: reservation.property.title,
        checkInDate: reservation.checkInDate,
        checkOutDate: reservation.checkOutDate,
      };
    });

    res.status(200).json(enrichedReservations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  addReservation,
  getReservations,
  getPaymentDetails,
  updateReservationStatuses,
};
