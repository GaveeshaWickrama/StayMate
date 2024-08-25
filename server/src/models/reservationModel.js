const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reservationSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  property: {
    type: Schema.Types.ObjectId,
    ref: "Property",
    required: true,
  },
  sectionId: {
    type: Schema.Types.ObjectId,
    required: true,
  },
  checkInDate: {
    type: Date,
    required: true,
  },
  checkOutDate: {
    type: Date,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  noOfGuests: {
    type: Number,
    required: true,
  },
  paymentStatus: {
    type: Boolean,
    default: false,
  },
  paymentDetails: {
    paymentId: String,
    paymentMethod: String,
  },
  payoutStatus: {
    type: String,
    enum: ["pending", "paid"],
    default: "pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ["upcoming", "ongoing", "completed"],
    default: "upcoming",
  },
});

// Static method to update reservation statuses
reservationSchema.statics.updateStatuses = async function () {
  try {
    const now = new Date();
    const startOfDay = new Date(now.setHours(0, 0, 0, 0));
    const endOfDay = new Date(now.setHours(23, 59, 59, 999));

    // Update reservations to "ongoing" if checkInDate is today and status is "upcoming"
    const ongoingReservations = await this.updateMany(
      {
        checkInDate: { $gte: startOfDay, $lte: endOfDay },
        status: "upcoming",
      },
      { $set: { status: "ongoing" } }
    );

    // Update reservations to "completed" if checkOutDate is in the past and status is "ongoing"
    const completedOngoingReservations = await this.updateMany(
      {
        checkOutDate: { $lt: startOfDay }, // Check-out date is before today
        status: "ongoing",
      },
      { $set: { status: "completed" } }
    );

    // Update reservations to "completed" if checkOutDate is in the past and status is "upcoming"
    const completedUpcomingReservations = await this.updateMany(
      {
        checkOutDate: { $lt: startOfDay }, // Check-out date is before today
        status: "upcoming",
      },
      { $set: { status: "completed" } }
    );

    console.log(
      `${ongoingReservations.nModified} reservations updated to ongoing.`
    );
    console.log(
      `${completedOngoingReservations.nModified} reservations updated to completed (from ongoing).`
    );
    console.log(
      `${completedUpcomingReservations.nModified} reservations updated to completed (from upcoming).`
    );
  } catch (error) {
    console.error("Error updating reservation statuses:", error);
  }
};

module.exports = mongoose.model("Reservation", reservationSchema);
