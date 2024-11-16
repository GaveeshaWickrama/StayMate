import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import axios from "axios";
import { useAuth } from "../../../context/auth";

function Revenue() {
  const { token } = useAuth();

  // Default date range: 1 year before and 1 year after today
  const currentDate = new Date();
  const defaultStartDate = new Date(currentDate);
  defaultStartDate.setFullYear(currentDate.getFullYear() - 1);
  const defaultEndDate = new Date(currentDate);
  defaultEndDate.setFullYear(currentDate.getFullYear() + 1);

  const [startDate, setStartDate] = useState(defaultStartDate.toISOString().split("T")[0]);
  const [endDate, setEndDate] = useState(defaultEndDate.toISOString().split("T")[0]);
  const [combinedData, setCombinedData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [graphType, setGraphType] = useState("TotalRevenue");

  const PLATFORM_PERCENTAGE = 10; // Assume the platform takes 20% of the total revenue

  const fetchRevenueData = async () => {
    setLoading(true);
    try {
      const [paidResponse, pendingResponse, allResponse] = await Promise.all([
        axios.get(`${import.meta.env.VITE_API_URL}/reports/revenue`, {
          headers: { Authorization: `Bearer ${token}` },
          params: { startDate, endDate, status: "paid" },
        }),
        axios.get(`${import.meta.env.VITE_API_URL}/reports/revenue`, {
          headers: { Authorization: `Bearer ${token}` },
          params: { startDate, endDate, status: "pending" },
        }),
        axios.get(`${import.meta.env.VITE_API_URL}/reports/revenue`, {
          headers: { Authorization: `Bearer ${token}` },
          params: { startDate, endDate, status: "all" },
        }),
      ]);

      // Merge data into a single array with Paid, Pending, and All values
      const combined = {};
      const processData = (data, type) => {
        data.forEach((item) => {
          const platformCut = (item.totalCashFlow || 0) * (PLATFORM_PERCENTAGE / 100);
          if (!combined[item.date]) combined[item.date] = { date: item.date };
          combined[item.date][`${type}TotalRevenue`] = item.totalCashFlow || 0;
          combined[item.date][`${type}PlatformProfit`] = platformCut || 0;
          combined[item.date][`${type}HostRevenue`] = (item.totalCashFlow || 0) - platformCut;
        });
      };

      processData(paidResponse.data.revenueSummary, "paid");
      processData(pendingResponse.data.revenueSummary, "pending");
      processData(allResponse.data.revenueSummary, "all");

      // Convert the combined object into an array
      const combinedArray = Object.values(combined);

      setCombinedData(combinedArray);
    } catch (error) {
      console.error("Error fetching revenue data:", error);
      alert("Failed to fetch revenue data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRevenueData(); // Fetch data on mount
  }, [token]);

  return (
    <div>
      <h4 className="text-xl font-semibold mb-4 text-center">Cash Flow Breakdown</h4>
      <div className="flex justify-center gap-4 mb-8">
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="p-2 border border-gray-300 rounded"
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="p-2 border border-gray-300 rounded"
        />
        <button
          onClick={fetchRevenueData}
          className="px-4 py-2 bg-black text-white rounded transition duration-200 ease-in-out"
        >
          Fetch Data
        </button>
      </div>

      <div className="flex justify-center gap-4 mb-8">
        <button
          onClick={() => setGraphType("HostRevenue")}
          className={`px-4 py-2 ${
            graphType === "HostRevenue" ? "bg-blue-700" : "bg-blue-500"
          } text-white rounded transition duration-200 ease-in-out`}
        >
          Host Revenue
        </button>
        <button
          onClick={() => setGraphType("PlatformProfit")}
          className={`px-4 py-2 ${
            graphType === "PlatformProfit" ? "bg-blue-700" : "bg-blue-500"
          } text-white rounded transition duration-200 ease-in-out`}
        >
          Platform Profit
        </button>
        <button
          onClick={() => setGraphType("TotalRevenue")}
          className={`px-4 py-2 ${
            graphType === "TotalRevenue" ? "bg-blue-700" : "bg-blue-500"
          } text-white rounded transition duration-200 ease-in-out`}
        >
          Total Revenue
        </button>
      </div>

      {loading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : combinedData.length > 0 ? (
        <ResponsiveContainer width="100%" height={400}>
          <LineChart
            data={combinedData}
            margin={{ top: 20, right: 30, left: 50, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" padding={{ left: 20, right: 20 }} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey={`paid${graphType}`}
              name={`Paid ${graphType.replace(/([A-Z])/g, " $1")}`}
              stroke="#0088FE"
              strokeWidth={2}
              activeDot={{ r: 8 }}
            />
            <Line
              type="monotone"
              dataKey={`pending${graphType}`}
              name={`Pending ${graphType.replace(/([A-Z])/g, " $1")}`}
              stroke="#FF8042"
              strokeWidth={2}
              activeDot={{ r: 8 }}
            />
            <Line
              type="monotone"
              dataKey={`all${graphType}`}
              name={`Paid & Pending ${graphType.replace(/([A-Z])/g, " $1")}`}
              stroke="#00C49F"
              strokeWidth={2}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <p className="text-center text-gray-500">No data available. Please select a date range.</p>
      )}
    </div>
  );
}

export default Revenue;
