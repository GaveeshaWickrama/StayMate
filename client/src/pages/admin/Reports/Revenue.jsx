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
  PieChart,
  Pie,
  Cell,
} from "recharts";
import axios from "axios";
import { useAuth } from "../../../context/auth";

function Revenue() {
  const { token } = useAuth();

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
  const [hostPercentage, setHostPercentage] = useState(0);
  const [sitePercentage, setSitePercentage] = useState(0);

  const PLATFORM_PERCENTAGE = 10;
  const COLORS = ["#4CAF50", "#FF5722"];

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

      const combined = {};
      let totalHostRevenue = 0;
      let totalPlatformProfit = 0;

      const processData = (data, type) => {
        data.forEach((item) => {
          const platformCut = (item.totalCashFlow || 0) * (PLATFORM_PERCENTAGE / 100);
          if (!combined[item.date]) combined[item.date] = { date: item.date };
          combined[item.date][`${type}TotalRevenue`] = item.totalCashFlow || 0;
          combined[item.date][`${type}PlatformProfit`] = platformCut || 0;
          combined[item.date][`${type}HostRevenue`] = (item.totalCashFlow || 0) - platformCut;

          totalPlatformProfit += platformCut || 0;
          totalHostRevenue += (item.totalCashFlow || 0) - platformCut;
        });
      };

      processData(paidResponse.data.revenueSummary, "paid");
      processData(pendingResponse.data.revenueSummary, "pending");
      processData(allResponse.data.revenueSummary, "all");

      const combinedArray = Object.values(combined);
      const totalRevenue = totalHostRevenue + totalPlatformProfit;
      setHostPercentage(((totalHostRevenue / totalRevenue) * 100).toFixed(2));
      setSitePercentage(((totalPlatformProfit / totalRevenue) * 100).toFixed(2));

      setCombinedData(combinedArray);
    } catch (error) {
      console.error("Error fetching revenue data:", error);
      alert("Failed to fetch revenue data. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const downloadCSV = (chartData, fileName) => {
    const headers = Object.keys(chartData[0]).join(",");
    const rows = chartData.map((row) =>
      Object.values(row)
        .map((value) => `"${value}"`)
        .join(",")
    );
    const csvContent = [headers, ...rows].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${fileName}.csv`;
    link.click();
  };

  useEffect(() => {
    fetchRevenueData();
  }, [token]);

  return (
    <div className="flex flex-wrap gap-8 p-4 bg-gray-100 min-h-screen">
      {/* Line Chart Box */}
      <div className="w-full md:w-2/3 bg-white p-8 shadow-xl rounded-lg">
        <h4 className="text-2xl font-bold mb-6 text-center text-gray-700">Cash Flow Breakdown</h4>
        <div className="flex justify-center gap-4 mb-6">
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="p-2 border border-gray-300 rounded focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={fetchRevenueData}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition duration-200"
          >
            Fetch Data
          </button>
        </div>

        <div className="flex justify-center gap-4 mb-4">
          {["HostRevenue", "PlatformProfit", "TotalRevenue"].map((type) => (
            <button
              key={type}
              onClick={() => setGraphType(type)}
              className={`px-4 py-2 ${
                graphType === type ? "bg-blue-700" : "bg-blue-500"
              } text-white rounded hover:bg-blue-600 transition duration-200`}
            >
              {type.replace(/([A-Z])/g, " $1")}
            </button>
          ))}
        </div>

        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : combinedData.length > 0 ? (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart
              data={combinedData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey={`paid${graphType}`}
                stroke="#4CAF50"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey={`pending${graphType}`}
                stroke="#FF5722"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey={`all${graphType}`}
                stroke="#2196F3"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-center text-gray-500">No data available.</p>
        )}
        <button
          onClick={() => downloadCSV(combinedData, "revenue_line_chart")}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Download Data
        </button>
      </div>

      {/* Pie Chart Box */}
      <div className="w-full md:w-1/8 lg:w-1/2 bg-white p-0.1 shadow-xl rounded-lg">
        <h4 className="text-2xl font-bold mb-6 text-center text-gray-700">Revenue Distribution</h4>
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie
              data={[
                { name: "Host Revenue", value: Number(hostPercentage) },
                { name: "Platform Profit", value: Number(sitePercentage) },
              ]}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={150}
              label={({ name, percent }) =>
                `${name}: ${(percent * 100).toFixed(2)}%`
              }
              labelStyle={{
                fontSize: "14px",
                fontWeight: "bold",
              }}
            >
              {COLORS.map((color, index) => (
                <Cell key={`cell-${index}`} fill={color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
        <button
          onClick={() => downloadCSV([
            { name: "Host Revenue", value: hostPercentage },
            { name: "Platform Profit", value: sitePercentage }
          ], "revenue_pie_chart")}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Download Data
        </button>
      </div>
    </div>
  );
}

export default Revenue;
