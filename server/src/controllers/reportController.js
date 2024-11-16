const Reservation = require("../models/reservationModel");

const getRevenueReport = async (req, res) => {
  const { startDate, endDate, status } = req.query;

  // Validate input
  if (!startDate || !endDate) {
    return res.status(400).json({ error: "Please provide startDate and endDate." });
  }

  try {
    // Convert strings to Date objects
    const start = new Date(startDate);
    const end = new Date(endDate);

    // Build the query based on the `status` parameter
    const query = {
      checkOutDate: { $gte: start, $lte: end },
    };

    if (status === "paid") {
      query.paymentStatus = true; // Only fetch paid reservations
    } else if (status === "pending") {
      query.paymentStatus = false; // Only fetch pending reservations
    }
    // If no `status` is provided, fetch all reservations (both paid and pending)

    // Fetch reservations based on the query
    const reservations = await Reservation.find(query);

    // Group total cash flow by date
    const revenueByDate = {};

    reservations.forEach((reservation) => {
      const checkOutDate = reservation.checkOutDate.toISOString().split("T")[0]; // Format as YYYY-MM-DD
      const totalPrice = reservation.totalPrice;

      // Initialize the date in the map if not present
      if (!revenueByDate[checkOutDate]) {
        revenueByDate[checkOutDate] = 0;
      }

      // Add totalPrice to the date's total
      revenueByDate[checkOutDate] += totalPrice;
    });

    // Format the result as an array
    const revenueSummary = Object.keys(revenueByDate).map((date) => ({
      date,
      totalCashFlow: revenueByDate[date],
    }));

    // Return the result
    res.status(200).json({
      revenueSummary,
      startDate,
      endDate,
      status: status || "all", // Return the status filter applied
    });
  } catch (error) {
    console.error("Error fetching revenue report:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { getRevenueReport };
