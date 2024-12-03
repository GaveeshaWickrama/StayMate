import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import axios from "axios";

const PropertyOwners = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [propertyOwners, setPropertyOwners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch property owners from the backend
  useEffect(() => {
    const fetchPropertyOwners = async () => {
      try {
        const response = await axios.get("http://localhost:3000/admin/users/role/host"); // Adjust the URL based on your backend endpoint
        setPropertyOwners(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch property owners.");
        setLoading(false);
      }
    };

    fetchPropertyOwners();
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredPropertyOwners = propertyOwners.filter((owner) => {
    const fullName = `${owner.firstName} ${owner.lastName}`.toLowerCase();
    return (
      fullName.includes(searchQuery.toLowerCase()) ||
      owner.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      owner.phone.includes(searchQuery) ||
      owner.nicPassport.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  if (loading) {
    return <div className="text-center mt-10">Loading property owners...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 mt-10">{error}</div>;
  }

  return (
    <div className="container mx-auto p-10">
      <h2 className="text-4xl font-extrabold text-blue-600 mb-6 border-b-2 border-blue-200 pb-2 text-center">Property Owners</h2>
      <div className="flex justify-center mb-6">
        <div className="relative w-2/3">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Search property owners..."
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
            </tr>
          </thead>
          <tbody>
            {filteredPropertyOwners.map((owner) => (
              <tr key={owner._id} className="hover:bg-gray-100 transition duration-200">
                <td className="py-3 px-6 border-b text-center">{owner._id}</td>
                <td className="py-3 px-6 border-b">{owner.firstName} {owner.lastName}</td>
                <td className="py-3 px-6 border-b">{owner.email}</td>
                <td className="py-3 px-6 border-b text-center">{owner.phone}</td>
                <td className="py-3 px-6 border-b text-center">{owner.nicPassport}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PropertyOwners;
