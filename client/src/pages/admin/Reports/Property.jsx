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

  useEffect(() => {
    fetchPropertyData(); // Fetch data on mount
  }, [token]);

  return (
    <div className="flex flex-wrap">
      {loading ? (
        <p className="text-center text-gray-500 w-full">Loading...</p>
      ) : data ? (
        <>
          {/* Type Distribution */}
          <div className="w-1/3 p-4">
            <h4 className="text-lg font-semibold mb-2 text-center">Type Distribution</h4>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={data.typeCounts}
                  dataKey="count"
                  nameKey="type"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label={({ type, percent }) => `${type}: ${(percent * 100).toFixed(2)}%`}
                >
                  {data.typeCounts.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* District Distribution */}
          <div className="w-1/3 p-4">
            <h4 className="text-lg font-semibold mb-2 text-center">District Distribution</h4>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={data.districtCounts}
                  dataKey="count"
                  nameKey="district"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label={({ district, percent }) => `${district}: ${(percent * 100).toFixed(2)}%`}
                >
                  {data.districtCounts.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Status Distribution */}
          <div className="w-1/3 p-4">
            <h4 className="text-lg font-semibold mb-2 text-center">Status Distribution</h4>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={data.statusCounts}
                  dataKey="count"
                  nameKey="status"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label={({ status, percent }) => `${status}: ${(percent * 100).toFixed(2)}%`}
                >
                  {data.statusCounts.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </>
      ) : (
        <p className="text-center text-gray-500 w-full">No data available</p>
      )}
    </div>
  );
}

export default PropertyReport;
