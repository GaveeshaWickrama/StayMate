import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import axios from "axios";
import ModeratorDetails from "../../components/admin/ModeratorDetails";
import ModeratorForm from "../../components/admin/ModeratorForm";

const ModeratorManagement = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [moderators, setModerators] = useState([]);
  const [filteredModerators, setFilteredModerators] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchModerators = async () => {
      try {
        const response = await axios.get("http://localhost:3000/admin/users/role/moderator"); // Adjust URL for your backend
        setModerators(response.data);
        setFilteredModerators(response.data); // Initialize filtered moderators
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch moderators.");
        setLoading(false);
      }
    };

    fetchModerators();
  }, []);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = moderators.filter(
      (moderator) =>
        moderator.firstName.toLowerCase().includes(query) ||
        moderator.lastName.toLowerCase().includes(query) ||
        moderator.email.toLowerCase().includes(query) ||
        moderator.phone.includes(query) ||
        moderator.nicPassport.toLowerCase().includes(query)
    );
    setFilteredModerators(filtered);
  };

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
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-2/3">
          <ModeratorDetails moderators={filteredModerators} />
        </div>
        <div className="w-full lg:w-1/3">
          <ModeratorForm />
        </div>
      </div>
    </div>
  );
};

export default ModeratorManagement;
