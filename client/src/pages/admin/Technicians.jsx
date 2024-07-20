import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaTrash, FaSearch } from "react-icons/fa";

const Technicians = () => {
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [technicians, setTechnicians] = useState([
    { id: 1, name: "John Doe", email: "John@gmail.com", address: "123 Main St", phone: "123-456-7890", type: "Electrician" },
    { id: 2, name: "Jane Smith", email: "Jane@gmail.com", address: "456 Elm St", phone: "987-654-3210", type: "Plumber" },
    { id: 3, name: "Alice Johnson", email: "Alice@gmail.com", address: "789 Oak St", phone: "555-555-5555", type: "Electrician" },
    { id: 4, name: "Michael Brown", email: "Michael@gmail.com", address: "321 Pine St", phone: "444-555-6666", type: "HVAC Technician" },
    { id: 5, name: "Emily Davis", email: "Emily@gmail.com", address: "654 Maple St", phone: "777-888-9999", type: "Electrician" },
    { id: 6, name: "William Wilson", email: "William@gmail.com", address: "987 Cedar St", phone: "222-333-4444", type: "Plumber" },
  ]);

  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this technician?");
    if (confirmDelete) {
      console.log("Delete technician with ID:", id);
      // Implement delete logic here
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredTechnicians = technicians.filter(
    (technician) =>
      technician.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      technician.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      technician.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      technician.phone.includes(searchQuery) ||
      technician.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto p-10">
      <h2 className="text-4xl font-extrabold text-blue-600 mb-6 border-b-2 border-blue-200 pb-2">Technicians</h2>
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
            <th className="py-3 px-4 border-b">ID</th>
            <th className="py-3 px-4 border-b">Name</th>
            <th className="py-3 px-4 border-b">Email</th>
            <th className="py-3 px-4 border-b">Address</th>
            <th className="py-3 px-4 border-b">Phone Number</th>
            <th className="py-3 px-4 border-b">Type</th>
            <th className="py-3 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredTechnicians.map((technician) => (
            <tr key={technician.id} className="hover:bg-gray-100 transition duration-200">
              <td className="py-3 px-4 border-b text-center">{technician.id}</td>
              <td className="py-3 px-4 border-b">{technician.name}</td>
              <td className="py-3 px-4 border-b">{technician.email}</td>
              <td className="py-3 px-4 border-b">{technician.address}</td>
              <td className="py-3 px-4 border-b">{technician.phone}</td>
              <td className="py-3 px-4 border-b">{technician.type}</td>
              <td className="py-3 px-4 border-b flex space-x-2 justify-center">
                <button
                  onClick={() => handleDelete(technician.id)}
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
