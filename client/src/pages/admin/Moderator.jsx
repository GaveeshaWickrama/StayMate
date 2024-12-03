import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Moderators = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [moderators, setModerators] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch moderators from the backend
  useEffect(() => {
    const fetchModerators = async () => {
      try {
        const response = await axios.get("http://localhost:3000/admin/users/role/moderator"); // Adjust the URL based on your backend endpoint
        setModerators(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch moderators.");
        setLoading(false);
      }
    };

    fetchModerators();
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleEdit = (id) => {
    navigate(`/admin/UpdateModerator/${id}`);
  };

  const filteredModerators = moderators.filter(
    (moderator) =>
      moderator.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      moderator.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      moderator.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      moderator.phone.includes(searchQuery) ||
      moderator.nicPassport.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return <div className="text-center mt-10">Loading moderators...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 mt-10">{error}</div>;
  }

  return (
    <div className="container mx-auto p-10">
      <h2 className="text-4xl font-extrabold text-blue-600 mb-6 border-b-2 border-blue-200 pb-2 text-center">Moderators</h2>
      <div className="flex justify-center mb-6">
        <div className="relative w-2/3">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Search moderators..."
            className="w-full border border-gray-300 rounded-md px-4 py-2 pl-10 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <FaSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-md border border-gray-200">
          <thead>
            <tr className="bg-blue-200 text-gray-700 text-left">
              <th className="py-3 px-6 border-b text-center">ID</th>
              <th className="py-3 px-6 border-b">Name</th>
              <th className="py-3 px-6 border-b">Email</th>
              <th className="py-3 px-6 border-b text-center">Phone Number</th>
              <th className="py-3 px-6 border-b text-center">NIC</th>
              <th className="py-3 px-6 border-b text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredModerators.map((moderator) => (
              <tr key={moderator._id} className="hover:bg-gray-100 transition duration-200">
                <td className="py-3 px-6 border-b text-center">{moderator._id}</td>
                <td className="py-3 px-6 border-b">{moderator.firstName} {moderator.lastName}</td>
                <td className="py-3 px-6 border-b">{moderator.email}</td>
                <td className="py-3 px-6 border-b text-center">{moderator.phone}</td>
                <td className="py-3 px-6 border-b text-center">{moderator.nicPassport}</td>
                <td className="py-3 px-6 border-b text-center">
                  <button
                    onClick={() => handleEdit(moderator._id)}
                    className="text-blue-500 hover:text-blue-700 transition duration-200"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Moderators;
