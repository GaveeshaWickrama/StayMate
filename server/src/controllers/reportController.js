const Reservation = require("../models/reservationModel");
const Property = require("../models/propertyModel");

const getRevenueReport = async (req, res) => {
  const { startDate, endDate, status, hostId } = req.query; // Get hostId from query

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

    if (hostId) {
      query.host_id = hostId; // Filter by host_id if provided
    }

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
      hostId: hostId || "all", // Return hostId filter applied if any
    });
  } catch (error) {
    console.error("Error fetching revenue report:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


const getPropertyCounts = async (req, res) => {
    try {
      // Aggregation pipeline to group by type, district, and status and get counts
      const typeCounts = await Property.aggregate([
        { $group: { _id: "$type", count: { $sum: 1 } } },
        { $project: { _id: 0, type: "$_id", count: 1 } }
      ]);
  
      const districtCounts = await Property.aggregate([
        { $group: { _id: "$location.district", count: { $sum: 1 } } },
        { $project: { _id: 0, district: "$_id", count: 1 } }
      ]);
  
      const statusCounts = await Property.aggregate([
        { $group: { _id: "$status", count: { $sum: 1 } } },
        { $project: { _id: 0, status: "$_id", count: 1 } }
      ]);
  
      // Combine all counts into a single response
      res.status(200).json({
        typeCounts,
        districtCounts,
        statusCounts
      });
    } catch (error) {
      console.error("Error fetching property counts:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };

  const getTotalRevenueForHost = async (req, res) => {
    const { hostId } = req.query;  // Get hostId from query
  
    // Validate input
    if (!hostId) {
      return res.status(400).json({ error: "Please provide hostId." });
    }
  
    try {
      // Build the query to filter reservations by hostId
      const query = { host_id: hostId, paymentStatus: true };  // Only include paid reservations
  
      // Fetch reservations based on the query
      const reservations = await Reservation.find(query);
  
      // Calculate total revenue
      const totalRevenue = reservations.reduce((sum, reservation) => {
        return sum + reservation.totalPrice;  // Sum all the totalPrice values
      }, 0);
  
      // Return the result
      res.status(200).json({
        totalRevenue,
        hostId
      });
    } catch (error) {
      console.error("Error fetching total revenue for host:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };

module.exports = { getRevenueReport , getPropertyCounts, getTotalRevenueForHost   };
