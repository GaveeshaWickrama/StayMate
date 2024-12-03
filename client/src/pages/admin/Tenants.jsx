import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import axios from "axios";

const Tenants = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [tenants, setTenants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch tenants from the backend
  useEffect(() => {
    const fetchTenants = async () => {
      try {
        const response = await axios.get("http://localhost:3000/admin/users/role/guest"); // Adjust the URL based on your backend endpoint
        setTenants(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch tenants.");
        setLoading(false);
      }
    };

    fetchTenants();
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredTenants = tenants.filter((tenant) => {
    const fullName = `${tenant.firstName} ${tenant.lastName}`.toLowerCase();
    return (
      fullName.includes(searchQuery.toLowerCase()) ||
      tenant.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tenant.phone.includes(searchQuery)
    );
  });

  if (loading) {
    return <div className="text-center">Loading tenants...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto p-10">
      <h2 className="text-4xl font-extrabold text-blue-600 mb-6 border-b-2 border-blue-200 pb-2">Tenants</h2>
      <div className="flex justify-between mb-4">
        <div className="relative w-full md:w-2/3">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Search tenants..."
            className="border border-gray-300 rounded-md px-4 py-2 pl-10 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
          />
          <FaSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
          <thead>
            <tr className="bg-blue-200 text-gray-700">
              <th className="py-3 px-4 border-b text-center">ID</th>
              <th className="py-3 px-4 border-b">Name</th>
              <th className="py-3 px-4 border-b">Email</th>
              <th className="py-3 px-4 border-b text-center">Phone Number</th>
            </tr>
          </thead>
          <tbody>
            {filteredTenants.map((tenant) => (
              <tr key={tenant._id} className="hover:bg-gray-100 transition duration-200">
                <td className="py-3 px-4 border-b text-center">{tenant._id}</td>
                <td className="py-3 px-4 border-b">{tenant.firstName} {tenant.lastName}</td>
                <td className="py-3 px-4 border-b">{tenant.email}</td>
                <td className="py-3 px-4 border-b text-center">{tenant.phone}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Tenants;
