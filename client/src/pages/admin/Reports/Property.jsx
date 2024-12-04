import React, { useState, useEffect } from "react";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import axios from "axios";
import { useAuth } from "../../../context/auth";

const COLORS = ["#0088FE", "#FF8042", "#00C49F", "#FFBB28", "#FF6666", "#AA66CC", "#33B5E5"];

function PropertyReport() {
  const { token } = useAuth();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchPropertyData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/reports/counts`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setData(response.data);
    } catch (error) {
      console.error("Error fetching property data:", error);
      alert("Failed to fetch property data. Please try again.");
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
    fetchPropertyData();
  }, [token]);

  const renderPieChart = (title, chartData, dataKey, nameKey, csvFileName) => (
    <div className="w-full md:w-1/8 p-8 bg-white shadow-xl rounded-lg mb-4 hover:shadow-xl transition-shadow duration-300">
      <h4 className="text-xl font-semibold text-center text-gray-700 mb-4">{title}</h4>
      <div className="relative">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={chartData}
              dataKey={dataKey}
              nameKey={nameKey}
              cx="50%"
              cy="50%"
              outerRadius={110}
              label={({ [nameKey]: name, percent }) =>
                `${name}: ${(percent * 100).toFixed(2)}%`
              }
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value, name) => [`${value}`, name]} />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="flex justify-center mt-6">
        <button
          onClick={() => downloadCSV(chartData, csvFileName)}
          className="px-8 py-2.5 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600 transition duration-200"
        >
          Download Data
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <div className="max-w-screen-xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Property Report</h2>
        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : data ? (
          <div className="flex flex-wrap justify-between">
            {renderPieChart(
              "Property Type Distribution",
              data.typeCounts,
              "count",
              "type",
              "type_distribution"
            )}
            {renderPieChart(
              "District Distribution",
              data.districtCounts,
              "count",
              "district",
              "district_distribution"
            )}
            {renderPieChart(
              "Property Status Distribution",
              data.statusCounts,
              "count",
              "status",
              "status_distribution"
            )}
          </div>
        ) : (
          <p className="text-center text-gray-500">No data available</p>
        )}
      </div>
    </div>
  );
}

export default PropertyReport;

