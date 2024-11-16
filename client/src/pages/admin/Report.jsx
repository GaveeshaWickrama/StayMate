import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import axios from "axios";
import { useAuth } from "../../context/auth";

// Colors for Pie Chart
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#FF0000", "#800080"];

// Utility function to distribute values randomly
const generateRandomAllocations = (total) => {
  const allocations = Array.from({ length: 12 }, () => Math.random());
  const totalAllocations = allocations.reduce((sum, val) => sum + val, 0);
  return allocations.map((value) => (value / totalAllocations) * total);
};

// Generate monthly data for the line chart
const generateMonthlyData = (totalRevenue, totalPayoutToHosts) => {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const revenueAllocations = generateRandomAllocations(totalRevenue);
  const expenseAllocations = generateRandomAllocations(totalPayoutToHosts);

  return months.map((month, index) => ({
    name: month,
    revenue: revenueAllocations[index],
    expense: expenseAllocations[index],
  }));
};

// Generate yearly data for the line chart
const generateYearlyData = (totalRevenue, totalPayoutToHosts) => {
  const years = ["2020", "2021", "2022", "2023", "2024"];
  const revenueAllocations = generateRandomAllocations(totalRevenue);
  const expenseAllocations = generateRandomAllocations(totalPayoutToHosts);

  return years.map((year, index) => ({
    name: year,
    revenue: revenueAllocations[index],
    expense: expenseAllocations[index],
  }));
};

function Report() {
  // State variables
  const { token } = useAuth(); // Authentication context
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalPayoutToHosts, setTotalPayoutToHosts] = useState(0);
  const [reportData, setReportData] = useState([]);
  const [selectedTab, setSelectedTab] = useState("monthly");
  const [staticLocationData, setStaticLocationData] = useState([]);
  const [propertyData, setPropertyData] = useState([
    { propertyName: "Property A", bookings: 200 },
    { propertyName: "Property B", bookings: 150 },
    { propertyName: "Property C", bookings: 100 },
    { propertyName: "Property D", bookings: 50 },
  ]);

  // Fetch data from backend
  useEffect(() => {
    const fetchData = async () => {
      if (!token) return;

      try {
        // Fetch payment data
        const paymentResponse = await axios.get(
          `${import.meta.env.VITE_API_URL}/admin/payments`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        calculateTotals(paymentResponse.data);

        // Fetch location data
        const locationResponse = await axios.get(
          `${import.meta.env.VITE_API_URL}/admin/properties-by-location`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setStaticLocationData(locationResponse.data);

        // Fetch most booked property data
        const propertyResponse = await axios.get(
          `${import.meta.env.VITE_API_URL}/admin/most-booked-properties`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setPropertyData(propertyResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [token]);

  // Calculate totals from payment data
  const calculateTotals = (payments) => {
    const totalRev = payments.reduce((sum, payment) => sum + payment.totalAmount, 0);
    const totalPayout = payments.reduce((sum, payment) => sum + payment.amountToHost, 0);

    setTotalRevenue(totalRev);
    setTotalPayoutToHosts(totalPayout);
    setReportData(generateMonthlyData(totalRev, totalPayout));
  };

  // Handle tab switching (Monthly/Yearly)
  const handleTabClick = (tab) => {
    setSelectedTab(tab);
    const dataGenerator = tab === "monthly" ? generateMonthlyData : generateYearlyData;
    setReportData(dataGenerator(totalRevenue, totalPayoutToHosts));
  };

  // Download chart data as CSV
  const downloadChartData = (filename, data) => {
    const csvContent = [
      ["Period", "Revenue", "Expense"],
      ...data.map((item) => [item.name, item.revenue, item.expense]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `${filename}.csv`;
    anchor.click();
    URL.revokeObjectURL(url);
  };

  // Download pie chart data as CSV
  const downloadPieChartData = () => {
    const csvContent = [
      ["Location", "Value"],
      ...staticLocationData.map((item) => [item.location, item.count]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "Location_Data.csv";
    anchor.click();
    URL.revokeObjectURL(url);
  };

  return (
    <main className="p-10 bg-blue-50 min-h-screen">
      <h3 className="text-4xl font-semibold text-center text-blue-700 mb-8 shadow-md p-4 rounded-xl bg-white">
        Reports 
      </h3>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Bar Chart */}
        <ChartContainer title="Most Booked Properties">
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={propertyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="propertyName" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="bookings" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
          <DownloadButton onClick={() => downloadChartData("Properties", propertyData)} />
        </ChartContainer>

        {/* Line Chart */}
        <ChartContainer title={`Income vs Expenses (${selectedTab})`}>
          <div className="flex justify-center gap-4 mb-4">
            {["monthly", "yearly"].map((tab) => (
              <button
                key={tab}
                className={`px-4 py-2 text-sm rounded-xl transition-all duration-200 ${
                  selectedTab === tab
                    ? "bg-blue-600 text-white shadow-lg"
                    : "bg-gray-200 hover:bg-gray-300"
                }`}
                onClick={() => handleTabClick(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={reportData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="revenue" stroke="#8884d8" />
              <Line type="monotone" dataKey="expense" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
          <DownloadButton onClick={() => downloadChartData(selectedTab, reportData)} />
        </ChartContainer>

        {/* Pie Chart */}
        <ChartContainer title="Properties by Location">
          <ResponsiveContainer width="100%" height={350}>
            <PieChart>
              <Pie
                data={staticLocationData}
                dataKey="count"
                nameKey="location"
                outerRadius={120} // Increased outer radius for larger pie
                label
              >
                {staticLocationData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <DownloadButton onClick={downloadPieChartData} />
        </ChartContainer>
      </div>
    </main>
  );
}

// Reusable Chart Container Component
const ChartContainer = ({ title, children }) => (
  <div className="bg-white p-6 rounded-lg shadow-lg">
    <h4 className="text-2xl font-semibold text-center mb-6 text-blue-700">{title}</h4>
    {children}
  </div>
);

// Download Button
const DownloadButton = ({ onClick }) => (
  <button
    onClick={onClick}
    className="mt-4 py-2 px-3 bg-blue-600 text-white text-sm rounded-xl hover:bg-blue-700 transition duration-200"
  >
    Download Chart Data
  </button>
);

export default Report;
