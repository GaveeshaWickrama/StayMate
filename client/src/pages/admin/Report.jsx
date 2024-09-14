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

// Function to generate random allocation data
const generateRandomAllocations = (total) => {
  const allocations = Array.from({ length: 12 }, () => Math.random());
  const totalAllocations = allocations.reduce((acc, value) => acc + value, 0);
  return allocations.map(
    (allocation) => (allocation / totalAllocations) * total
  );
};

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

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#FF0000", "#800080"];

function Report() {
  const { token } = useAuth();
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalPayoutToHosts, setTotalPayoutToHosts] = useState(0);
  const [reportData, setReportData] = useState([]);
  const [selectedTab, setSelectedTab] = useState("monthly");
  const [staticLocationData, setStaticLocationData] = useState([]);
  const [propertyData, setPropertyData] = useState([
    { propertyName: 'Property A', bookings: 200 },
    { propertyName: 'Property B', bookings: 150 },
    { propertyName: 'Property C', bookings: 100 },
    { propertyName: 'Property D', bookings: 50 },
  ]);

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

    const fetchLocations = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/admin/properties-by-location`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setStaticLocationData(response.data);
      } catch (error) {
        console.error("Error fetching location data:", error);
      }
    };

    const fetchProperties = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/admin/most-booked-properties`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setPropertyData(response.data);
      } catch (error) {
        console.error("Error fetching property data:", error);
      }
    };

    if (token) {
      fetchPayments();
      fetchLocations();
      fetchProperties();
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
    setReportData(generateMonthlyData(totalRev, totalPayout));
  };

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
    if (tab === "monthly") {
      setReportData(generateMonthlyData(totalRevenue, totalPayoutToHosts));
    } else if (tab === "yearly") {
      setReportData(generateYearlyData(totalRevenue, totalPayoutToHosts));
    }
  };

  const downloadChartData = (type) => {
    const data = reportData.map((item) => ({
      Period: item.name,
      Revenue: item.revenue,
      Expense: item.expense,
    }));

    const csvData = [
      ["Period", "Revenue", "Expense"],
      ...data.map((row) => [row.Period, row.Revenue, row.Expense]),
    ]
      .map((e) => e.join(","))
      .join("\n");

    const blob = new Blob([csvData], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${type}_Chart_Data.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const downloadPieChartData = () => {
    const csvData = [
      ["Location", "Value"],
      ...staticLocationData.map((item) => [item.location, item.count]),
    ]
      .map((e) => e.join(","))
      .join("\n");

    const blob = new Blob([csvData], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "Location_Data.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <main className="p-5 bg-gradient-to-r from-blue-50 to-green-50 min-h-screen">
      <h3 className="text-4xl font-bold py-8 text-center text-blue-600">Reports</h3>

      <div className="flex gap-5 justify-center mb-8">
        <button
          className={`px-6 py-3 text-lg ${selectedTab === "monthly" ? "bg-blue-600 text-white shadow-lg" : "bg-gray-300"} rounded-lg transition-transform transform hover:scale-105`}
          onClick={() => handleTabClick("monthly")}
        >
          Monthly
        </button>
        <button
          className={`px-6 py-3 text-lg ${selectedTab === "yearly" ? "bg-blue-600 text-white shadow-lg" : "bg-gray-300"} rounded-lg transition-transform transform hover:scale-105`}
          onClick={() => handleTabClick("yearly")}
        >
          Yearly
        </button>
      </div>

      <div className="flex flex-col gap-6 mt-10">
        {/* Number of Booked Properties Bar Chart */}
        <div className="bg-white p-4 rounded-lg shadow-lg transition-transform transform hover:scale-105" style={{ width: '80%' }}>
          <h4 className="text-xl font-semibold mb-4 text-center text-blue-700">
            Number of Booked Properties
          </h4>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={propertyData}
              margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="propertyName" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="bookings" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
          <button
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg shadow-lg transition-transform transform hover:scale-105"
            onClick={() => downloadChartData("Property")}
          >
            Download Property Data
          </button>
        </div>

        {/* Line Chart */}
        <div className="bg-white p-4 rounded-lg shadow-lg transition-transform transform hover:scale-105" style={{ width: '80%' }}>
          <h4 className="text-xl font-semibold mb-4 text-center text-blue-700">
            Income vs Expenses ({selectedTab.charAt(0).toUpperCase() + selectedTab.slice(1)})
          </h4>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={reportData}
              margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="revenue" stroke="#8884d8" />
              <Line type="monotone" dataKey="expense" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
          <button
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg shadow-lg transition-transform transform hover:scale-105"
            onClick={() => downloadChartData("Income-Expense")}
          >
            Download Income-Expense Data
          </button>
        </div>

        {/* Pie Chart */}
        <div className="bg-white p-4 rounded-lg shadow-lg transition-transform transform hover:scale-105" style={{ width: '80%' }}>
          <h4 className="text-xl font-semibold mb-4 text-center text-blue-700">
            Properties by Location
          </h4>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={staticLocationData}
                dataKey="count"
                nameKey="location"
                cx="50%"
                cy="50%"
                outerRadius={120}
                fill="#8884d8"
                label
              >
                {staticLocationData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <button
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg shadow-lg transition-transform transform hover:scale-105"
            onClick={downloadPieChartData}
          >
            Download Location Data
          </button>
        </div>
      </div>
    </main>
  );
}

export default Report;

