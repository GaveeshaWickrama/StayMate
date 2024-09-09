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
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalPayoutToHosts, setTotalPayoutToHosts] = useState(0);
  const [monthlyData, setMonthlyData] = useState([]);
  const [yearlyData, setYearlyData] = useState([]);
  const [view, setView] = useState("monthly");

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/admin/payments`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = response.data;
        calculateTotals(data);
      } catch (error) {
        console.error("Error fetching payments:", error);
      }
    };

    const fetchUserCounts = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/admin/users`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = response.data;

        const guestCount = data.guest || 0;
        const hostCount = data.host || 0;

        // Simulate monthly data
        const simulatedMonthlyData = [
          { month: "January", customers: guestCount, propertyOwners: hostCount },
          { month: "February", customers: guestCount + 10, propertyOwners: hostCount + 5 },
          { month: "March", customers: guestCount + 15, propertyOwners: hostCount + 12 },
          { month: "April", customers: guestCount + 20, propertyOwners: hostCount + 15 },
          { month: "May", customers: guestCount + 26, propertyOwners: hostCount + 20 },
          { month: "June", customers: guestCount + 30, propertyOwners: hostCount + 24 },
          { month: "July", customers: guestCount + 35, propertyOwners: hostCount + 30 },
        ];

        // Simulate yearly data
        const simulatedYearlyData = [
          { year: "2020", customers: guestCount * 12, propertyOwners: hostCount * 12 },
          { year: "2021", customers: guestCount * 15, propertyOwners: hostCount * 15 },
          { year: "2022", customers: guestCount * 18, propertyOwners: hostCount * 18 },
          { year: "2023", customers: guestCount * 20, propertyOwners: hostCount * 20 },
        ];

        setMonthlyData(simulatedMonthlyData);
        setYearlyData(simulatedYearlyData);
      } catch (error) {
        console.error("Error fetching user counts:", error);
      }
    };

    if (token) {
      fetchPayments();
      fetchUserCounts();
    }
  }, [token]);

  const calculateTotals = (payments) => {
    let totalRev = 0;
    let totalPayout = 0;

    payments.forEach((payment) => {
      totalRev += payment.totalAmount;
      totalPayout += payment.amountToHost;
    });

    setTotalRevenue(totalRev);
    setTotalPayoutToHosts(totalPayout);
  };

  const data = view === "monthly" ? monthlyData : yearlyData;
  const dataKey = view === "monthly" ? "month" : "year";

  return (
    <main
      className="p-6 min-h-screen"
      style={{
        background: 'linear-gradient(to right, rgba(240, 248, 255, 0.8), rgba(240, 248, 255, 0.8)), url(/path-to-your-background-image.jpg)',
        backgroundSize: 'cover',
        backgroundBlendMode: 'overlay',
      }}
    >
      <GreetingBox name="Jeo Deo" />

      <h3 className="text-4xl font-bold text-gray-800 mb-8">Dashboard</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white shadow-lg p-6 rounded-lg flex flex-col items-center transform transition duration-300 hover:scale-105">
          <FaMoneyBillWave className="text-5xl text-green-600 mb-3" />
          <h3 className="text-xl font-semibold text-gray-700">Total Revenue</h3>
          <p className="text-2xl font-bold text-gray-900">
            LKR {totalRevenue.toLocaleString()}
          </p>
        </div>
        <div className="bg-white shadow-lg p-6 rounded-lg flex flex-col items-center transform transition duration-300 hover:scale-105">
          <FaUserTie className="text-5xl text-blue-600 mb-3" />
          <h3 className="text-xl font-semibold text-gray-700">Total Payout to Hosts</h3>
          <p className="text-2xl font-bold text-gray-900">
            LKR {totalPayoutToHosts.toLocaleString()}
          </p>
        </div>
        <div className="bg-white shadow-lg p-6 rounded-lg flex flex-col items-center transform transition duration-300 hover:scale-105">
          <FaHome className="text-5xl text-purple-600 mb-3" />
          <h3 className="text-xl font-semibold text-gray-700">Total Properties</h3>
          <p className="text-2xl font-bold text-gray-900">50</p> {/* Static data */}
        </div>
        <div className="bg-white shadow-lg p-6 rounded-lg flex flex-col items-center transform transition duration-300 hover:scale-105">
          <FaCalendarCheck className="text-5xl text-orange-600 mb-3" />
          <h3 className="text-xl font-semibold text-gray-700">Upcoming Bookings</h3>
          <p className="text-2xl font-bold text-gray-900">25</p> {/* Static data */}
        </div>
      </div>

      <div className="flex justify-end mb-8">
        <div className="flex space-x-4">
          <button
            onClick={() => setView("monthly")}
            className={`px-4 py-2 rounded-lg font-semibold transition-colors duration-300 ${view === "monthly" ? "bg-blue-600 text-white" : "bg-white text-blue-600 border border-blue-600"} hover:bg-blue-700 hover:text-white`}
          >
            Monthly
          </button>
          <button
            onClick={() => setView("yearly")}
            className={`px-4 py-2 rounded-lg font-semibold transition-colors duration-300 ${view === "yearly" ? "bg-blue-600 text-white" : "bg-white text-blue-600 border border-blue-600"} hover:bg-blue-700 hover:text-white`}
          >
            Yearly
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white shadow-lg p-6 rounded-lg transform transition duration-300 hover:scale-105">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Customers</h3>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={dataKey} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="customers" stroke="#8884d8" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white shadow-lg p-6 rounded-lg transform transition duration-300 hover:scale-105">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Property Owners</h3>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey={dataKey} />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="propertyOwners" stroke="#82ca9d" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </main>
  );
}

export default AdminDashboard;
