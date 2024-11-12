const cron = require("node-cron");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY); // Initialize Stripe
const Reservation = require("../models/reservationModel");

const schedulePayouts = () => {
  cron.schedule("0 0 * * *", async () => {
    // Runs every day at midnight
    try {
      const reservationsToPayout = await Reservation.find({
        checkInDate: { $lte: new Date() },
        payoutStatus: "pending",
      }).populate("property");

      for (const reservation of reservationsToPayout) {
        try {
          const payoutAmount = reservation.totalPrice * 0.9;
          await stripe.transfers.create({
            amount: payoutAmount * 100, // Amount in cents
            currency: "lkr",
            destination: reservation.property.host_id.stripeAccountId, // Stripe account ID of the host
          });

          reservation.payoutStatus = "paid";
          await reservation.save();
        } catch (error) {
          console.error(
            `Payout failed for reservation ${reservation._id}:`,
            error
          );
        }
      }
    } catch (error) {
      console.error("Error scheduling payouts:", error);
    }
  });
};

module.exports = { schedulePayouts };
