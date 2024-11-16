const Reservation = require("../models/reservationModel");

const getRevenueReport = async (req, res) => {
  const { startDate, endDate, websiteCutPercent = 10 } = req.query;

  // Validate input
  if (!startDate || !endDate) {
    return res.status(400).json({ error: "Please provide startDate and endDate." });
  }

  try {
    // Convert strings to Date objects
    const start = new Date(startDate);
    const end = new Date(endDate);

    // Fetch paid reservations within the date range
    const reservations = await Reservation.find({
      createdAt: { $gte: start, $lte: end },
      paymentStatus: true, // Only include paid reservations
    });

    // Calculate total cash flow, website cut, and payout to hosts
    let totalCashFlow = 0;
    reservations.forEach((reservation) => {
      totalCashFlow += reservation.totalPrice;
    });

    const websiteCut = (totalCashFlow * websiteCutPercent) / 100;
    const payoutToHosts = totalCashFlow - websiteCut;

    // Return the calculated data
    res.status(200).json({
      totalCashFlow,
      websiteCut,
      payoutToHosts,
      startDate,
      endDate,
    });
  } catch (error) {
    console.error("Error fetching revenue report:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { getRevenueReport };
