import React, { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../context/auth";
import {
  FaMoneyBillWave,
  FaHome,
  FaClipboardList,
  FaCheckCircle,
} from "react-icons/fa";
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

import DatePicker from "react-datepicker"; // Install react-datepicker with `npm install react-datepicker`
import "react-datepicker/dist/react-datepicker.css"; // Import styles for the date picker

// GreetingBox Component
function GreetingBox({ name }) {
  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-lg mb-8">
      <h1 className="text-4xl font-bold text-gray-800">Hello, {name}!</h1>
    </div>
  );
}

// Main Host Dashboard
function HostPage() {
  const { token } = useAuth();

  // State for summary data
  const [summary, setSummary] = useState({
    totalRevenue: 0,
    totalBookings: 0,
    activeBookings: 0,
    propertyCount: 0,
  });

  // State for graphs data
  const [graphData, setGraphData] = useState([]);

  // State for date range
  const [startDate, setStartDate] = useState(() => {
    const twoMonthsAgo = new Date();
    twoMonthsAgo.setMonth(twoMonthsAgo.getMonth() - 2);
    return twoMonthsAgo;
  });
  const [endDate, setEndDate] = useState(new Date());

  // Fetch host summary data
  useEffect(() => {
    const fetchHostSummary = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/reports/host-summary`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setSummary(response.data);
      } catch (error) {
        console.error("Error fetching host summary:", error);
      }
    };

    if (token) fetchHostSummary();
  }, [token]);

  // Fetch graph data based on date range
  useEffect(() => {
    const fetchGraphData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/reports/daily-summary`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            params: {
              startDate: startDate.toISOString().split("T")[0],
              endDate: endDate.toISOString().split("T")[0],
            },
          }
        );
        setGraphData(response.data);
      } catch (error) {
        console.error("Error fetching graph data:", error);
      }
    };

    if (token) fetchGraphData();
  }, [token, startDate, endDate]);

  // Calculate the net revenue for the host
  const netRevenue = summary.totalRevenue * 0.9;

  return (
    <main className="p-6 min-h-screen bg-gradient-to-r from-blue-50 to-blue-100">
      <GreetingBox name="Host User" />

      <h3 className="text-4xl font-bold text-gray-800 mb-8">Dashboard</h3>

      {/* Top 4 Summary Boxes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white shadow-xl p-6 rounded-lg flex flex-col items-center transform transition duration-300 hover:scale-105">
          <FaMoneyBillWave className="text-5xl text-green-600 mb-3 animate-pulse" />
          <h3 className="text-xl font-semibold text-gray-700">Net Revenue</h3>
          <p className="text-2xl font-bold text-gray-900">
            LKR {netRevenue.toLocaleString()}
          </p>
        </div>
        <div className="bg-white shadow-lg p-6 rounded-lg flex flex-col items-center">
          <FaClipboardList className="text-5xl text-purple-600 mb-3" />
          <h3 className="text-xl font-semibold text-gray-700">Total Properties</h3>
          <p className="text-2xl font-bold text-gray-900">
            {summary.propertyCount}
          </p>
        </div>
        <div className="bg-white shadow-xl p-6 rounded-lg flex flex-col items-center transform transition duration-300 hover:scale-105">
          <FaClipboardList className="text-5xl text-purple-600 mb-3 animate-pulse" />
          <h3 className="text-xl font-semibold text-gray-700">Total Bookings</h3>
          <p className="text-2xl font-bold text-gray-900">
            {summary.totalBookings}
          </p>
        </div>
        <div className="bg-white shadow-xl p-6 rounded-lg flex flex-col items-center transform transition duration-300 hover:scale-105">
          <FaCheckCircle className="text-5xl text-orange-600 mb-3 animate-pulse" />
          <h3 className="text-xl font-semibold text-gray-700">Active Bookings</h3>
          <p className="text-2xl font-bold text-gray-900">
            {summary.activeBookings}
          </p>
        </div>
      </div>

      {/* Date Range Selector */}
      <div className="bg-white shadow-lg p-6 rounded-lg flex px-10 items-center mb-8">
        <div>
          <h3 className="text-xl font-semibold px-10 text-gray-700">Select Date Range</h3>
        </div>
        <div className="flex space-x-4">
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            maxDate={endDate}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            className="border rounded-lg p-2"
          />
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            minDate={startDate}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            className="border rounded-lg p-2"
          />
        </div>
      </div>

      {/* Graphs Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Total Bookings Per Date Line Chart */}
        <div className="bg-white shadow-xl p-6 rounded-lg transform transition duration-300 hover:scale-105">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Total Bookings Per Date
          </h3>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={graphData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="totalBookings" stroke="#8884d8" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Total Revenue Per Day Line Chart */}
        <div className="bg-white shadow-xl p-6 rounded-lg transform transition duration-300 hover:scale-105">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Total Revenue Per Day
          </h3>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={graphData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="totalRevenue" stroke="#82ca9d" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </main>
  );
}

export default HostPage;
