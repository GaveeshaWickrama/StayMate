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

  // Generate random allocations for revenue and expenses
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

  // Generate random allocations for revenue and expenses
  const revenueAllocations = generateRandomAllocations(totalRevenue);
  const expenseAllocations = generateRandomAllocations(totalPayoutToHosts);

  return years.map((year, index) => ({
    name: year,
    revenue: revenueAllocations[index],
    expense: expenseAllocations[index],
  }));
};

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#FF0000", "#800080"];

const staticLocationData = [
  { name: "Kandy", value: 400 },
  { name: "Colombo", value: 300 },
  { name: "Ella", value: 300 },
  { name: "Matara", value: 200 },
  { name: "Galle", value: 278 },
  { name: "Kalutara", value: 189 },
];

const propertyTypesData = {
  Kandy: [
    { type: "Hotel", count: 150 },
    { type: "Apartment", count: 100 },
    { type: "Villa", count: 150 },
  ],
  Colombo: [
    { type: "Hotel", count: 200 },
    { type: "Apartment", count: 50 },
    { type: "Villa", count: 50 },
  ],
  Ella: [
    { type: "Hotel", count: 100 },
    { type: "Apartment", count: 100 },
    { type: "Villa", count: 100 },
  ],
  Matara: [
    { type: "Hotel", count: 80 },
    { type: "Apartment", count: 60 },
    { type: "Villa", count: 60 },
  ],
  Galle: [
    { type: "Hotel", count: 100 },
    { type: "Apartment", count: 78 },
    { type: "Villa", count: 100 },
  ],
  Kalutara: [
    { type: "Hotel", count: 89 },
    { type: "Apartment", count: 50 },
    { type: "Villa", count: 50 },
  ],
};

function Report() {
  const { token } = useAuth();
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [totalPayoutToHosts, setTotalPayoutToHosts] = useState(0);
  const [reportData, setReportData] = useState([]);
  const [selectedTab, setSelectedTab] = useState("monthly");
  const [selectedLocation, setSelectedLocation] = useState(null);

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

    if (token) {
      fetchPayments();
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
      ...staticLocationData.map((item) => [item.name, item.value]),
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
    <main className="p-5 text-gray-900 bg-gray-100 min-h-screen">
      <h3 className="text-3xl font-bold py-8 text-center">Reports</h3>

      <div className="flex gap-5 justify-center mb-8">
        <button
          className={`px-4 py-2 ${
            selectedTab === "monthly" ? "bg-blue-500 text-white" : "bg-gray-200"
          } rounded-lg transition duration-200 ease-in-out`}
          onClick={() => handleTabClick("monthly")}
        >
          Monthly
        </button>
        <button
          className={`px-4 py-2 ${
            selectedTab === "yearly" ? "bg-blue-500 text-white" : "bg-gray-200"
          } rounded-lg transition duration-200 ease-in-out`}
          onClick={() => handleTabClick("yearly")}
        >
          Yearly
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-5 mt-20">
        {/* Bar Chart on the left */}
        <div className="flex-1 bg-white p-5 rounded-lg shadow-md">
          <h4 className="text-xl font-semibold mb-4 text-center">
            Income vs Expenses ({selectedTab.charAt(0).toUpperCase() + selectedTab.slice(1)})
          </h4>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart
              data={reportData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="revenue" fill="#8884d8" />
              <Bar dataKey="expense" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
          <button
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded transition duration-200 ease-in-out"
            onClick={() => downloadChartData("Bar")}
          >
            Download Bar Chart Data
          </button>
        </div>

        {/* Line Chart on the right */}
        <div className="flex-1 bg-white p-5 rounded-lg shadow-md">
          <h4 className="text-xl font-semibold mb-4 text-center">
            Income vs Expenses ({selectedTab.charAt(0).toUpperCase() + selectedTab.slice(1)})
          </h4>
          <ResponsiveContainer width="100%" height={400}>
            <LineChart
              data={reportData}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
              <Line type="monotone" dataKey="expense" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
          <button
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded transition duration-200 ease-in-out"
            onClick={() => downloadChartData("Line")}
          >
            Download Line Chart Data
          </button>
        </div>
      </div>

      <div className="flex flex-col mt-10">
        <div className="flex-1 bg-white p-5 rounded-lg shadow-md">
          <h4 className="text-xl font-semibold mb-4 text-center">
            Properties by Location
          </h4>
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={staticLocationData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={150}
                fill="#8884d8"
                label
                onClick={(data) => setSelectedLocation(data.name)}
              >
                {staticLocationData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <button
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded transition duration-200 ease-in-out"
            onClick={downloadPieChartData}
          >
            Download Pie Chart Data
          </button>
        </div>
      </div>

      {selectedLocation && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h4 className="text-2xl font-semibold mb-4 text-center">
              Property Types in {selectedLocation}
            </h4>
            <ul>
              {propertyTypesData[selectedLocation].map((property) => (
                <li key={property.type} className="text-lg mb-2">
                  {property.type}: {property.count}
                </li>
              ))}
            </ul>
            <button
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded transition duration-200 ease-in-out"
              onClick={() => setSelectedLocation(null)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

export default Report;
