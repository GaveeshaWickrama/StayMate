import React from "react";
import { useNavigate } from "react-router-dom";

const UserCenter = () => {
  const navigate = useNavigate();

  const users = [
    { id: 1, name: "John Doe", email: "John@gmail.com", role: "Admin", address: "123 Main St", phone: "123-456-7890" },
    { id: 2, name: "Jane Smith", email: "Jane@gmail.com", role: "Moderator", address: "456 Elm St", phone: "987-654-3210" },
    { id: 3, name: "Alice Johnson", email: "Alice@gmail.com", role: "Property Owner", address: "789 Oak St", phone: "555-555-5555" },
    { id: 4, name: "John Doe", email: "John@gmail.com", role: "Tenant", address: "123 Main St", phone: "123-456-7890" },
    { id: 5, name: "Jane Smith", email: "Jane@gmail.com", role: "Technician", address: "456 Elm St", phone: "987-654-3210" },
    { id: 6, name: "Alice Johnson", email: "Alice@gmail.com", role: "Property Owner", address: "789 Oak St", phone: "555-555-5555" },
  ];

  const handleEdit = (id) => {
    navigate(`/edit-user/${id}`);
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (confirmDelete) {
      console.log("Delete user with ID:", id);
      // Implement delete logic here
    }
  };

  const handleAddUser = () => {
    navigate("/add-user"); // Redirect to Add User page
  };

  return (
    <div className="container mx-auto p-10">
      <h2 className="text-4xl font-extrabold text-blue-600 mb-6 border-b-2 border-blue-200 pb-2">
        User Center
      </h2>
      <div className="flex justify-end mb-4">
        <button
          onClick={handleAddUser}
          className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-2 rounded-md shadow-lg hover:shadow-xl transition duration-200"
        >
          Add New User
        </button>
      </div>
      <table className="min-w-full bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
        <thead>
          <tr className="bg-blue-200 text-gray-700">
            <th className="py-3 px-4 border-b">ID</th>
            <th className="py-3 px-4 border-b">Name</th>
            <th className="py-3 px-4 border-b">Email</th>
            <th className="py-3 px-4 border-b">Role</th>
            <th className="py-3 px-4 border-b">Address</th>
            <th className="py-3 px-4 border-b">Phone Number</th>
            <th className="py-3 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="hover:bg-gray-100 transition duration-200">
              <td className="py-3 px-4 border-b text-center">{user.id}</td>
              <td className="py-3 px-4 border-b">{user.name}</td>
              <td className="py-3 px-4 border-b">{user.email}</td>
              <td className="py-3 px-4 border-b">{user.role}</td>
              <td className="py-3 px-4 border-b">{user.address}</td>
              <td className="py-3 px-4 border-b">{user.phone}</td>
              <td className="py-3 px-4 border-b flex space-x-2 justify-center">
                <button
                  onClick={() => handleEdit(user.id)}
                  className="bg-blue-500 text-white rounded-md px-3 py-1 transition duration-200 hover:bg-blue-600 shadow-md hover:shadow-lg"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(user.id)}
                  className="bg-red-500 text-white rounded-md px-3 py-1 transition duration-200 hover:bg-red-600 shadow-md hover:shadow-lg"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserCenter;
