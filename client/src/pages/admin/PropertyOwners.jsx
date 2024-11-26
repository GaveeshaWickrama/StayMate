

import React, { useEffect, useState } from "react";
import { FaTrash, FaSearch } from "react-icons/fa";
import axios from "axios";

const PropertyOwner = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [propertyOwners, setPropertyOwners] = useState([]);

  // Fetch property owners from backend
  useEffect(() => {
    const fetchPropertyOwners = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/users/property-owners");
        setPropertyOwners(response.data);
      } catch (error) {
        console.error("Error fetching property owners:", error);
      }
    };
    fetchPropertyOwners();
  }, []);

  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this property owner?");
    if (confirmDelete) {
      console.log("Delete property owner with ID:", id);
      // Implement delete logic here
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredPropertyOwners = propertyOwners.filter(
    (owner) =>
      owner.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      owner.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      owner.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      owner.phone.includes(searchQuery)
  );

  return (
    <div className="container mx-auto p-10">
      <h2 className="text-4xl font-extrabold text-blue-600 mb-6 border-b-2 border-blue-200 pb-2">Property Owners</h2>
      <div className="flex justify-between mb-4">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Search property owners..."
            className="border border-gray-300 rounded-md px-4 py-2 pl-10 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <FaSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
        </div>
      </div>
      <table className="min-w-full bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
        <thead>
          <tr className="bg-blue-200 text-gray-700">
            <th className="py-3 px-4 border-b">ID</th>
            <th className="py-3 px-4 border-b">Name</th>
            <th className="py-3 px-4 border-b">Email</th>
            <th className="py-3 px-4 border-b">Phone Number</th>
            <th className="py-3 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredPropertyOwners.map((owner, index) => (
            <tr key={owner._id} className="hover:bg-gray-100 transition duration-200">
              <td className="py-3 px-4 border-b text-center">{index + 1}</td>
              <td className="py-3 px-4 border-b">{`${owner.firstName} ${owner.lastName}`}</td>
              <td className="py-3 px-4 border-b">{owner.email}</td>
              <td className="py-3 px-4 border-b">{owner.phone}</td>
              <td className="py-3 px-4 border-b flex space-x-2 justify-center">
                <button
                  onClick={() => handleDelete(owner._id)}
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

export default PropertyOwner;


