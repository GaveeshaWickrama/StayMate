import React, { useState, useEffect } from "react";
import axios from "axios";
import defaultProfilePic from "../../assets/profile2.png"; // Import a default profile picture

const Hosts = () => {
  const [hosts, setHosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch hosts from backend
  useEffect(() => {
    const fetchHosts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/admin/hosts"); // Adjust the URL based on your server endpoint
        setHosts(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch hosts.");
        setLoading(false);
      }
    };

    fetchHosts();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container mx-auto p-10">
      <h2 className="text-4xl font-extrabold text-blue-600 mb-6 border-b-2 border-blue-200 pb-2">Hosts</h2>
      <table className="min-w-full bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
        <thead>
          <tr className="bg-blue-200 text-gray-700">
            <th className="py-3 px-4 border-b">Profile</th>
            <th className="py-3 px-4 border-b">Name</th>
            <th className="py-3 px-4 border-b">Email</th>
            <th className="py-3 px-4 border-b">Phone</th>
            <th className="py-3 px-4 border-b">Address</th>
            <th className="py-3 px-4 border-b">Total Properties</th>
            <th className="py-3 px-4 border-b">Rating</th>
          </tr>
        </thead>
        <tbody>
          {hosts.map((host) => (
            <tr key={host._id} className="hover:bg-gray-100 transition duration-200">
              <td className="py-3 px-4 border-b text-center">
                <img
                  src={
                    host.userId.picture
                      ? `${import.meta.env.VITE_API_URL}/${host.userId.picture}`
                      : defaultProfilePic
                  }
                  alt="Profile"
                  className="w-12 h-12 rounded-full object-cover hover:scale-105 transition-transform"
                />
              </td>
              <td className="py-3 px-4 border-b">
                {host.userId.firstName} {host.userId.lastName}
              </td>
              <td className="py-3 px-4 border-b">{host.userId.email}</td>
              <td className="py-3 px-4 border-b">{host.userId.phone}</td>
              <td className="py-3 px-4 border-b">{host.location.address}</td>
              <td className="py-3 px-4 border-b text-center">{host.totalProperties}</td>
              <td className="py-3 px-4 border-b text-center">{host.rating}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Hosts;
