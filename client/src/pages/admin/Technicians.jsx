import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaTrash, FaSearch } from "react-icons/fa";

const Technicians = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [technicians, setTechnicians] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTechnicians = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/technicians`);
        console.log(response.data); // Log the response data
        if (Array.isArray(response.data)) {
          setTechnicians(response.data);
        } else {
          setError("Unexpected response format");
        }
      } catch (error) {
        setError("Error fetching technicians: " + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTechnicians();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this technician?");
    if (confirmDelete) {
      try {
        await axios.delete(`${import.meta.env.VITE_API_URL}/technicians/${id}`);
        setTechnicians(technicians.filter((technician) => technician._id !== id));
      } catch (error) {
        console.error("Error deleting technician:", error);
      }
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredTechnicians = technicians.filter((technician) =>
    Object.values(technician).some((value) =>
      value.toString().toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-10">
      <h2 className="text-4xl font-extrabold text-blue-600 mb-6 border-b-2 border-blue-200 pb-2">
        Technicians
      </h2>
      <div className="flex justify-between mb-4">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Search technicians..."
            className="border border-gray-300 rounded-md px-4 py-2 pl-10 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <FaSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
        </div>
      </div>
      <table className="min-w-full bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
        <thead>
          <tr className="bg-blue-200 text-gray-700">
            {technicians.length > 0 && Object.keys(technicians[0]).map((key) => (
              <th key={key} className="py-3 px-4 border-b capitalize">
                {key}
              </th>
            ))}
            <th className="py-3 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredTechnicians.map((technician) => (
            <tr key={technician._id} className="hover:bg-gray-100 transition duration-200">
              {Object.values(technician).map((value, index) => (
                <td key={index} className="py-3 px-4 border-b text-center">
                  {value}
                </td>
              ))}
              <td className="py-3 px-4 border-b flex space-x-2 justify-center">
                <button
                  onClick={() => handleDelete(technician._id)}
                  className="text-blue-500 hover:text-blue-700 transition duration-200"
                  aria-label="Delete"
                >
                  <FaTrash className="text-xl" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Technicians;

