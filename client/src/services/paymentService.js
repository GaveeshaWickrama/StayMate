import axios from "axios";

export const fetchPaymentsAndTotals = async (token) => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/admin/payments`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const { data } = response;

    let totalRevenue = 0;
    let totalAmountToHosts = 0;

    // Initialize objects to store monthly and weekly revenue
    const monthlyRevenue = {};
    const weeklyRevenue = {};

    console.log("Payments data:", data); // Debug: Log raw payments data

    // Process payments
    data.forEach((payment) => {
      totalRevenue += payment.serviceFee;
      totalAmountToHosts += payment.amountToHost;

      // Parse date
      const paymentDate = new Date(payment.date); // Ensure 'date' is in ISO format or convert accordingly

      // Format month as YYYY-MM
      const monthYear = `${paymentDate.getFullYear()}-${(
        paymentDate.getMonth() + 1
      )
        .toString()
        .padStart(2, "0")}`;

      // Aggregate monthly revenue
      if (!monthlyRevenue[monthYear]) {
        monthlyRevenue[monthYear] = 0;
      }
      monthlyRevenue[monthYear] += payment.serviceFee;

      // Format week as YYYY-WW
      const weekYear = `${paymentDate.getFullYear()}-${getWeekOfYear(
        paymentDate
      )
        .toString()
        .padStart(2, "0")}`;

      // Aggregate weekly revenue
      if (!weeklyRevenue[weekYear]) {
        weeklyRevenue[weekYear] = 0;
      }
      weeklyRevenue[weekYear] += payment.serviceFee;
    });

    console.log("Monthly revenue aggregated:", monthlyRevenue); // Debug: Log monthly revenue aggregation
    console.log("Weekly revenue aggregated:", weeklyRevenue); // Debug: Log weekly revenue aggregation

    // Convert monthlyRevenue object to array of objects
    const monthlyRevenueArray = Object.keys(monthlyRevenue).map((key) => ({
      name: key, // Format as 'YYYY-MM'
      revenue: monthlyRevenue[key],
    }));

    // Convert weeklyRevenue object to array of objects
    const weeklyRevenueArray = Object.keys(weeklyRevenue).map((key) => ({
      name: key, // Format as 'YYYY-WW'
      revenue: weeklyRevenue[key],
    }));

    console.log("Monthly revenue array:", monthlyRevenueArray); // Debug: Log final monthly revenue array
    console.log("Weekly revenue array:", weeklyRevenueArray); // Debug: Log final weekly revenue array

    return {
      payments: data,
      totalRevenue,
      totalAmountToHosts,
      monthlyRevenue: monthlyRevenueArray,
      weeklyRevenue: weeklyRevenueArray,
    };
  } catch (error) {
    console.error("Error fetching payments:", error);
    return {
      payments: [],
      totalRevenue: 0,
      totalAmountToHosts: 0,
      monthlyRevenue: [],
      weeklyRevenue: [],
    };
  }
};

// Helper function to get week number of the year
const getWeekOfYear = (date) => {
  const start = new Date(date.getFullYear(), 0, 1);
  const diff = date - start + (start.getDay() + 1) * 86400000;
  const oneWeek = 604800000; // Number of milliseconds in a week
  return Math.ceil(diff / oneWeek);
};
