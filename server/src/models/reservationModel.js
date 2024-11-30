const mongoose = require("mongoose");

const reservationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  property: { type: mongoose.Schema.Types.ObjectId, ref: "Property", required: true },
  sectionId: { type: String, required: true },
  checkInDate: { type: Date, required: true },
  checkOutDate: { type: Date, required: true },
  totalPrice: { type: Number, required: true },
  noOfGuests: { type: Number, required: true },
  paymentStatus: { type: Boolean, default: false },
  status: { type: String, enum: ["upcoming", "ongoing", "completed"], default: "upcoming" },
  paymentDetails: {
    paymentId: { type: String },
    paymentMethod: { type: String },
  },
});

// Static method to update reservation statuses
reservationSchema.statics.updateStatuses = async function () {
  const now = new Date();

  try {
    // Update "upcoming" reservations to "ongoing"
    const ongoingResult = await this.updateMany(
      { status: "upcoming", checkInDate: { $lte: now }, checkOutDate: { $gte: now } },
      { status: "ongoing" }
    );
    // Update payoutStatus to "paid" if checkInDate is today or in the past and status is "ongoing" or "upcoming"
    const paidReservations = await this.updateMany(
      {
        checkInDate: { $lte: endOfDay },
        status: { $in: ["upcoming", "ongoing", "completed"] },
        payoutStatus: "pending",
      },
      { $set: { payoutStatus: "paid" } }
    );

    // Update "ongoing" reservations to "completed"
    const completedFromOngoingResult = await this.updateMany(
      { status: "ongoing", checkOutDate: { $lt: now } },
      { status: "completed" }
    );

    // Update "upcoming" reservations directly to "completed" (e.g., missed stays)
    const completedFromUpcomingResult = await this.updateMany(
      { status: "upcoming", checkInDate: { $lt: now }, checkOutDate: { $lt: now } },
      { status: "completed" }
    );

    console.log(
      `${ongoingReservations.nModified} reservations updated to ongoing.`
    );
    console.log(`${paidReservations.nModified} reservations updated to paid.`);
    console.log(
      `${completedOngoingReservations.nModified} reservations updated to completed (from ongoing).`
    );
    console.log(
      `${completedUpcomingReservations.nModified} reservations updated to completed (from upcoming).`
    );
  } catch (error) {
    console.error("Error updating reservation statuses:", error.message);
    throw error;
  }
};

module.exports = mongoose.model("Reservation", reservationSchema);
