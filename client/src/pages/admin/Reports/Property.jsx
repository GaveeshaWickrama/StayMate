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
    <div className="w-1/3 p-4 shadow-lg rounded-lg bg-white">
      <h4 className="text-lg font-semibold mb-4 text-center">{title}</h4>
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
      <button
        onClick={() => downloadCSV(chartData, csvFileName)}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 w-full"
      >
        Download CSV
      </button>
    </div>
  );

  return (
    <div className="flex flex-wrap">
      {loading ? (
        <p className="text-center text-gray-500 w-full">Loading...</p>
      ) : data ? (
        <>
          {renderPieChart(
            "Type Distribution",
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
            "Status Distribution",
            data.statusCounts,
            "count",
            "status",
            "status_distribution"
          )}
        </>
      ) : (
        <p className="text-center text-gray-500 w-full">No data available</p>
      )}
    </div>
  );
}

export default PropertyReport;
