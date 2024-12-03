import React, { useEffect, useState } from "react";
import {
  FaMoneyBillWave,
  FaUserTie,
  FaHome,
  FaCalendarCheck,
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
import axios from "axios";
import { useAuth } from "../../context/auth";

// GreetingBox Component
function GreetingBox({ name }) {
  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-md mb-8">
      <h1 className="text-4xl font-bold text-gray-800">Hello, {name}!</h1>
    </div>
  );
}

function AdminDashboard() {
  const { token } = useAuth();
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalProperties, setTotalProperties] = useState(0);
  const [upcomingBookings, setUpcomingBookings] = useState(0);
  const [completedBookings, setCompletedBookings] = useState(0);
  const [registrationData, setRegistrationData] = useState([]);
  const [startDate, setStartDate] = useState(
    new Date(new Date().setDate(new Date().getDate() - 7)).toISOString().slice(0, 10)
  ); // Default to one week ago
  const [endDate, setEndDate] = useState(new Date().toISOString().slice(0, 10)); // Default to today

  useEffect(() => {
    const fetchSummaryCounts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/admin/summary-counts`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = response.data;
        setTotalUsers(data.totalUsers);
        setTotalProperties(data.totalProperties);
        setUpcomingBookings(data.upcomingReservations);
        setCompletedBookings(data.completedReservations);
      } catch (error) {
        console.error("Error fetching summary counts:", error);
      }
    };

    const fetchRegistrationData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/admin/registrations-by-day`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            params: { startDate, endDate },
          }
        );
        setRegistrationData(response.data);
      } catch (error) {
        console.error("Error fetching registration data:", error);
      }
    };

    if (token) {
      fetchSummaryCounts();
      fetchRegistrationData();
    }
  }, [token, startDate, endDate]);

  return (
    <main
      className="p-6 min-h-screen"
      style={{
        background:
          "linear-gradient(to right, rgba(240, 248, 255, 0.8), rgba(240, 248, 255, 0.8)), url(/path-to-your-background-image.jpg)",
        backgroundSize: "cover",
        backgroundBlendMode: "overlay",
      }}
    >
      <GreetingBox name="Admin" />

      <h3 className="text-4xl font-bold text-gray-800 mb-8">Dashboard</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white shadow-lg p-6 rounded-lg flex flex-col items-center transform transition duration-300 hover:scale-105">
          <FaUserTie className="text-5xl text-blue-600 mb-3" />
          <h3 className="text-xl font-semibold text-gray-700">Total Users</h3>
          <p className="text-2xl font-bold text-gray-900">{totalUsers}</p>
        </div>
        <div className="bg-white shadow-lg p-6 rounded-lg flex flex-col items-center transform transition duration-300 hover:scale-105">
          <FaHome className="text-5xl text-purple-600 mb-3" />
          <h3 className="text-xl font-semibold text-gray-700">
            Total Properties
          </h3>
          <p className="text-2xl font-bold text-gray-900">{totalProperties}</p>
        </div>
        <div className="bg-white shadow-lg p-6 rounded-lg flex flex-col items-center transform transition duration-300 hover:scale-105">
          <FaCalendarCheck className="text-5xl text-orange-600 mb-3" />
          <h3 className="text-xl font-semibold text-gray-700">
            Upcoming Bookings
          </h3>
          <p className="text-2xl font-bold text-gray-900">{upcomingBookings}</p>
        </div>
        <div className="bg-white shadow-lg p-6 rounded-lg flex flex-col items-center transform transition duration-300 hover:scale-105">
          <FaMoneyBillWave className="text-5xl text-green-600 mb-3" />
          <h3 className="text-xl font-semibold text-gray-700">
            Completed Bookings
          </h3>
          <p className="text-2xl font-bold text-gray-900">
            {completedBookings}
          </p>
        </div>
      </div>

      <div className="flex justify-between items-center mb-8">
        <div>
          <label className="mr-2">Start Date:</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="p-2 border rounded"
          />
          <label className="ml-4 mr-2">End Date:</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="p-2 border rounded"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white shadow-lg p-6 rounded-lg transform transition duration-300 hover:scale-105">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Guests</h3>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart
              data={registrationData}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="guest"
                stroke="#8884d8"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white shadow-lg p-6 rounded-lg transform transition duration-300 hover:scale-105">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Hosts</h3>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart
              data={registrationData}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="host"
                stroke="#82ca9d"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </main>
  );
}

export default AdminDashboard;
