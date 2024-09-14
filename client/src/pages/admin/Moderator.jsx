import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaTrash, FaSearch, FaUserPlus } from "react-icons/fa";

const Moderator = () => {
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState([
    { id: 1, name: "John Doe", email: "John@gmail.com", address: "123 Main St", phone: "123-456-7890" },
    { id: 2, name: "Jane Smith", email: "Jane@gmail.com", address: "456 Elm St", phone: "987-654-3210" },
    { id: 3, name: "Alice Johnson", email: "Alice@gmail.com", address: "789 Oak St", phone: "555-555-5555" },
    { id: 4, name: "John Doe", email: "John@gmail.com", address: "123 Main St", phone: "123-456-7890" },
    { id: 5, name: "Jane Smith", email: "Jane@gmail.com", address: "456 Elm St", phone: "987-654-3210" },
    { id: 6, name: "Alice Johnson", email: "Alice@gmail.com", address: "789 Oak St", phone: "555-555-5555" },
  ]);

  const handleEdit = (id) => {
    navigate("/admin/UpdateUser");//Redirect to Update User page
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    navigate("/admin/Moderator"); // Refresh the page
    if (confirmDelete) {
      console.log("Delete user with ID:", id);
      // Implement delete logic here
    }
  };

  const handleAddUser = () => {
    navigate("/admin/AddUser"); // Redirect to Add User page
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.phone.includes(searchQuery)
  );

  return (
    <div className="container mx-auto p-10">
      <h2 className="text-4xl font-extrabold text-blue-600 mb-6 border-b-2 border-blue-200 pb-2">Moderators</h2>
      <div className="flex justify-between mb-4">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Search users..."
            className="border border-gray-300 rounded-md px-4 py-2 pl-10 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <FaSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
        </div>
        <button
          onClick={handleAddUser}
          className="flex items-center bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-2 rounded-md shadow-lg hover:shadow-xl transition duration-200"
        >
          <FaUserPlus className="mr-2" />
          Add Moderator
        </button>
      </div>
      <table className="min-w-full bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
        <thead>
          <tr className="bg-blue-200 text-gray-700">
            <th className="py-3 px-4 border-b">ID</th>
            <th className="py-3 px-4 border-b">Name</th>
            <th className="py-3 px-4 border-b">Email</th>
            <th className="py-3 px-4 border-b">Address</th>
            <th className="py-3 px-4 border-b">Phone Number</th>
            <th className="py-3 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id} className="hover:bg-gray-100 transition duration-200">
              <td className="py-3 px-4 border-b text-center">{user.id}</td>
              <td className="py-3 px-4 border-b">{user.name}</td>
              <td className="py-3 px-4 border-b">{user.email}</td>
              <td className="py-3 px-4 border-b">{user.address}</td>
              <td className="py-3 px-4 border-b">{user.phone}</td>
              <td className="py-3 px-4 border-b flex space-x-2 justify-center">
                <button
                  onClick={() => handleEdit(user.id)}
                  className="text-blue-500 hover:text-blue-700 transition duration-200"
                  aria-label="Edit"
                >
                  <FaEdit className="text-xl" />
                </button>
                <button
                  onClick={() => handleDelete(user.id)}
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

export default Moderator;
