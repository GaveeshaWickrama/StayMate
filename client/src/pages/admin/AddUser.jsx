import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddUser = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    role: "",
    address: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement the API call to add the user here
    console.log("User data submitted:", userData);
    // After submission, navigate back to the User Center
    navigate("/user-center");
  };

  return (
    <div className="container mx-auto p-10 bg-white shadow-lg rounded-lg">
      <h2 className="text-4xl font-extrabold text-blue-600 mb-6 border-b-2 border-blue-200 pb-2">
        Add moderator    </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-gray-700 text-sm font-semibold mb-2">Name</label>
          <input
            type="text"
            name="name"
            value={userData.name}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-semibold mb-2">Email</label>
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-semibold mb-2">Role</label>
          <input
            type="text"
            name="role"
            value={userData.role}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-semibold mb-2">Address</label>
          <input
            type="text"
            name="address"
            value={userData.address}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-semibold mb-2">Phone Number</label>
          <input
            type="text"
            name="phone"
            value={userData.phone}
            onChange={handleChange}
            required
            className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-2 rounded-md shadow-lg hover:shadow-xl transition duration-200"
          >
            Add User
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddUser;
