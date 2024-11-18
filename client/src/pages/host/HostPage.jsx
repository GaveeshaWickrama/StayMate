import React, { useState } from "react";
import { FaMoneyBillWave, FaHome, FaClipboardList } from "react-icons/fa";
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

// GreetingBox Component
function GreetingBox({ name }) {
  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-lg mb-8">
      <h1 className="text-4xl font-bold text-gray-800">Welcome back, {name}!</h1>
    </div>
  );
}

// Main Host Dashboard
function HostPage() {
  const [view, setView] = useState("monthly");

  // Simulated data
  const [totalRevenue] = useState(120000);
  const [totalBookedProperties] = useState(75);
  const [totalProperties] = useState(100);
  const [incomeExpensesData] = useState([
    { month: "January", income: 20000, expenses: 8000 },
    { month: "February", income: 22000, expenses: 10000 },
    { month: "March", income: 25000, expenses: 12000 },
    { month: "April", income: 28000, expenses: 14000 },
    { month: "May", income: 30000, expenses: 16000 },
    { month: "June", income: 32000, expenses: 18000 },
  ]);

  const [propertyData] = useState([
    { id: 1, name: "Beachfront Villa", type: "Villa", address: "123 Ocean Drive", status: "Available" },
    { id: 2, name: "City Loft", type: "Apartment", address: "45 Downtown Street", status: "Booked" },
    { id: 3, name: "Mountain Cabin", type: "Cabin", address: "789 Hilltop Road", status: "Available" },
    { id: 4, name: "Lake House", type: "House", address: "456 Lakeside Avenue", status: "Under Maintenance" },
    { id: 5, name: "Countryside Cottage", type: "Cottage", address: "321 Meadow Lane", status: "Booked" },
  ]);

  return (
    <main className="p-6 min-h-screen bg-gradient-to-r from-blue-50 to-blue-100">
      <GreetingBox name="Host User" />

      {/* Metrics Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white shadow-lg p-6 rounded-lg flex flex-col items-center">
          <FaMoneyBillWave className="text-5xl text-green-600 mb-3" />
          <h3 className="text-xl font-semibold text-gray-700">Total Revenue</h3>
          <p className="text-2xl font-bold text-gray-900">LKR {totalRevenue.toLocaleString()}</p>
        </div>
        <div className="bg-white shadow-lg p-6 rounded-lg flex flex-col items-center">
          <FaHome className="text-5xl text-blue-600 mb-3" />
          <h3 className="text-xl font-semibold text-gray-700">Booked Properties</h3>
          <p className="text-2xl font-bold text-gray-900">{totalBookedProperties}</p>
        </div>
        <div className="bg-white shadow-lg p-6 rounded-lg flex flex-col items-center">
          <FaClipboardList className="text-5xl text-purple-600 mb-3" />
          <h3 className="text-xl font-semibold text-gray-700">Total Properties</h3>
          <p className="text-2xl font-bold text-gray-900">{totalProperties}</p>
        </div>
      </div>

      {/* Table and Chart Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Property Analysis Table */}
        <div className="bg-white shadow-lg p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Property Analysis</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Type</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Address</th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {propertyData.map((property) => (
                  <tr key={property.id} className="hover:bg-gray-100">
                    <td className="px-4 py-2">{property.id}</td>
                    <td className="px-4 py-2">{property.name}</td>
                    <td className="px-4 py-2">{property.type}</td>
                    <td className="px-4 py-2">{property.address}</td>
                    <td className="px-4 py-2">{property.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Income vs Expenses Chart */}
        <div className="bg-white shadow-lg p-6 rounded-lg">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Income & Expenses</h3>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={incomeExpensesData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="income" stroke="#8884d8" strokeWidth={3} />
              <Line type="monotone" dataKey="expenses" stroke="#82ca9d" strokeWidth={3} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </main>
  );
}

export default HostPage;

