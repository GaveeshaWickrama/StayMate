import React, { useState, useEffect } from "react";
import axios from "axios";
import defaultProfilePic from '../../assets/profile2.png'; // Import a default profile picture

const Technicians = () => {
  const [technicians, setTechnicians] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch technicians from backend
  useEffect(() => {
    const fetchTechnicians = async () => {
      try {
        const response = await axios.get("http://localhost:3000/admin/technicians"); // Adjust the URL based on your server endpoint
        setTechnicians(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch technicians.");
        setLoading(false);
      }
    };

    fetchTechnicians();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container mx-auto p-10">
      <h2 className="text-4xl font-extrabold text-blue-600 mb-6 border-b-2 border-blue-200 pb-2">Technicians</h2>
      <table className="min-w-full bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
        <thead>
          <tr className="bg-blue-200 text-gray-700">
            <th className="py-3 px-4 border-b">Profile</th>
            <th className="py-3 px-4 border-b">Name</th>
            <th className="py-3 px-4 border-b">Email</th>
            <th className="py-3 px-4 border-b">Phone</th>
            <th className="py-3 px-4 border-b">Address</th>
            <th className="py-3 px-4 border-b">Sub-Role</th>
            <th className="py-3 px-4 border-b">Rating</th>
          </tr>
        </thead>
        <tbody>
          {technicians.map((technician) => (
            <tr key={technician._id} className="hover:bg-gray-100 transition duration-200">
              <td className="py-3 px-4 border-b text-center">
                <img
                  src={
                    technician.userId.picture
                      ? `${import.meta.env.VITE_API_URL}/${technician.userId.picture}`
                      : defaultProfilePic
                  }
                  alt="Profile"
                  className="w-12 h-12 rounded-full object-cover hover:scale-105 transition-transform"
                />
              </td>
              <td className="py-3 px-4 border-b">
                {technician.userId.firstName} {technician.userId.lastName}
              </td>
              <td className="py-3 px-4 border-b">{technician.userId.email}</td>
              <td className="py-3 px-4 border-b">{technician.userId.phone}</td>
              <td className="py-3 px-4 border-b">{technician.location.address}</td>
              <td className="py-3 px-4 border-b">{technician.subRole}</td>
              <td className="py-3 px-4 border-b text-center">{technician.rating}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Technicians;
