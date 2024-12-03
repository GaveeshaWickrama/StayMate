const Reservation = require("../models/reservationModel");
const Property = require("../models/propertyModel");
const User = require("../models/userModel");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// Function to update reservation statuses
const updateReservationStatuses = async () => {
  try {
    const updateCounts = await Reservation.updateStatuses();
    console.log(
      `${updateCounts.ongoingCount} reservations updated to ongoing.`,
      `${updateCounts.completedFromOngoingCount} reservations updated to completed (from ongoing).`,
      `${updateCounts.completedFromUpcomingCount} reservations updated to completed (from upcoming).`
    );
  } catch (error) {
    console.error("Error updating reservation statuses:", error.message);
  }
};

// Add a new reservation
const addReservation = async (req, res) => {
  const {
    property,
    sectionId,
    checkInDate,
    checkOutDate,
    totalPrice,
    noOfGuests,
    paymentMethodId,
  } = req.body;

  const user = req.user.userId;

  if (
    !user ||
    !property ||
    !sectionId ||
    !checkInDate ||
    !checkOutDate ||
    !totalPrice ||
    !noOfGuests ||
    !paymentMethodId
  ) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(totalPrice * 100), // Stripe requires the amount in cents
      currency: "lkr",
      payment_method: paymentMethodId,
      confirm: true,
    });

    const reservation = new Reservation({
      user,
      property,
      sectionId,
      checkInDate,
      checkOutDate,
      totalPrice,
      noOfGuests,
      paymentStatus: true,
      paymentDetails: {
        paymentId: paymentIntent.id,
        paymentMethod: paymentIntent.payment_method,
      },
    });

    const newReservation = await reservation.save();
    res.status(201).json(newReservation);
  } catch (error) {
    console.error("Error creating reservation:", error.message);
    res.status(500).json({ message: "Failed to create reservation. Please try again." });
  }
};

// Get reservations for a user
const getReservations = async (req, res) => {
  const userId = req.user.userId;

  try {
    // Update reservation statuses before fetching data
    await Reservation.updateStatuses();

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    let reservations;

    if (user.role === "admin") {
      // Admin can view all reservations
      reservations = await Reservation.find()
        .populate({
          path: "property",
          populate: { path: "host_id", select: "firstName lastName" },
        })
        .populate("user", "firstName lastName");
    } else if (user.role === "host") {
      // Hosts can view reservations for their properties
      const properties = await Property.find({ host_id: userId });
      const propertyIds = properties.map((property) => property._id);

      reservations = await Reservation.find({ property: { $in: propertyIds } })
        .populate("property", "title images")
        .populate("user", "firstName lastName");
    } else {
      // Regular users can view their own reservations
      reservations = await Reservation.find({ user: userId })
        .populate("property", "title images")
        .populate("user", "firstName lastName");
    }

    res.status(200).json(reservations);
  } catch (error) {
    console.error("Error fetching reservations:", error.message);
    res.status(500).json({ message: "Failed to fetch reservations." });
  }
};

// Fetch payment details for admin
const getPaymentDetails = async (req, res) => {
  try {
    const reservations = await Reservation.find()
      .populate({
        path: "property",
        populate: { path: "host_id", select: "firstName lastName" },
      })
      .populate("user", "firstName lastName")
      .select("totalPrice paymentStatus checkInDate checkOutDate");

    const enrichedReservations = reservations.map((reservation) => {
      const totalAmount = reservation.totalPrice || 0;
      const serviceFee = totalAmount * 0.1; // Example: 10% service fee
      const amountToHost = totalAmount - serviceFee;

      const hostFullName = `${reservation.property?.host_id?.firstName || "Unknown"} ${
        reservation.property?.host_id?.lastName || ""
      }`;

      return {
        reservationId: reservation._id,
        totalAmount,
        serviceFee,
        amountToHost,
        paymentStatus: reservation.paymentStatus || false,
        hostName: hostFullName,
        title: reservation.property?.title || "No Title",
        checkInDate: reservation.checkInDate,
        checkOutDate: reservation.checkOutDate,
      };
    });

    res.status(200).json(enrichedReservations);
  } catch (error) {
    console.error("Error fetching payment details:", error.message);
    res.status(500).json({ message: "Failed to fetch payment details." });
  }
};

module.exports = {
  addReservation,
  getReservations,
  getPaymentDetails,
  updateReservationStatuses,
};
