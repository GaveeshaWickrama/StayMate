// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { FaTrash, FaSearch } from "react-icons/fa";

// const Tenants = () => {
//   const navigate = useNavigate();

//   const [searchQuery, setSearchQuery] = useState("");
//   const [tenants, setTenants] = useState([
//     { id: 1, name: "John Doe", email: "John@gmail.com", address: "123 Main St", phone: "123-456-7890" },
//     { id: 2, name: "Jane Smith", email: "Jane@gmail.com", address: "456 Elm St", phone: "987-654-3210" },
//     { id: 3, name: "Alice Johnson", email: "Alice@gmail.com", address: "789 Oak St", phone: "555-555-5555" },
//     { id: 4, name: "John Doe", email: "John@gmail.com", address: "123 Main St", phone: "123-456-7890" },
//     { id: 5, name: "Jane Smith", email: "Jane@gmail.com", address: "456 Elm St", phone: "987-654-3210" },
//     { id: 6, name: "Alice Johnson", email: "Alice@gmail.com", address: "789 Oak St", phone: "555-555-5555" },
//   ]);

//   const handleDelete = (id) => {
//     const confirmDelete = window.confirm("Are you sure you want to delete this tenant?");
//     if (confirmDelete) {
//       console.log("Delete tenant with ID:", id);
//       // Implement delete logic here
//     }
//   };

//   const handleSearch = (e) => {
//     setSearchQuery(e.target.value);
//   };

//   const filteredTenants = tenants.filter(
//     (tenant) =>
//       tenant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       tenant.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       tenant.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       tenant.phone.includes(searchQuery)
//   );

//   return (
//     <div className="container mx-auto p-10">
//       <h2 className="text-4xl font-extrabold text-blue-600 mb-6 border-b-2 border-blue-200 pb-2">Tenants</h2>
//       <div className="flex justify-between mb-4">
//         <div className="relative">
//           <input
//             type="text"
//             value={searchQuery}
//             onChange={handleSearch}
//             placeholder="Search tenants..."
//             className="border border-gray-300 rounded-md px-4 py-2 pl-10 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//           <FaSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
//         </div>
//       </div>
//       <table className="min-w-full bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
//         <thead>
//           <tr className="bg-blue-200 text-gray-700">
//             <th className="py-3 px-4 border-b">ID</th>
//             <th className="py-3 px-4 border-b">Name</th>
//             <th className="py-3 px-4 border-b">Email</th>
//             <th className="py-3 px-4 border-b">Address</th>
//             <th className="py-3 px-4 border-b">Phone Number</th>
//             <th className="py-3 px-4 border-b">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {filteredTenants.map((tenant) => (
//             <tr key={tenant.id} className="hover:bg-gray-100 transition duration-200">
//               <td className="py-3 px-4 border-b text-center">{tenant.id}</td>
//               <td className="py-3 px-4 border-b">{tenant.name}</td>
//               <td className="py-3 px-4 border-b">{tenant.email}</td>
//               <td className="py-3 px-4 border-b">{tenant.address}</td>
//               <td className="py-3 px-4 border-b">{tenant.phone}</td>
//               <td className="py-3 px-4 border-b flex space-x-2 justify-center">
//                 <button
//                   onClick={() => handleDelete(tenant.id)}
//                   className="text-blue-500 hover:text-blue-700 transition duration-200"
//                   aria-label="Delete"
//                 >
//                   <FaTrash className="text-xl" />
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default Tenants;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaTrash, FaSearch } from "react-icons/fa";
import { useAuth } from "../../context/auth";

const Guests = () => {
  const { token } = useAuth(); // Get the token from the custom hook
  const [searchQuery, setSearchQuery] = useState("");
  const [guests, setGuests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGuests = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/admin/users`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Include the token in the headers
            },
          }
        );

        // Filter users by role "guest"
        if (Array.isArray(response.data)) {
          const guestsList = response.data.filter(
            (user) => user.role === "guest"
          );
          setGuests(guestsList);
        } else {
          setError("Unexpected response format");
        }
      } catch (error) {
        setError("Error fetching guests: " + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchGuests();
  }, [token]); // Depend on token to re-fetch if it changes

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this guest?"
    );
    if (confirmDelete) {
      try {
        await axios.delete(
          `${import.meta.env.VITE_API_URL}/admin/users/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`, // Include the token in the headers
            },
          }
        );
        setGuests(guests.filter((guest) => guest._id !== id));
      } catch (error) {
        console.error("Error deleting guest:", error);
      }
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredGuests = guests.filter(
    (guest) =>
      guest.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guest.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guest.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      guest.nic.includes(searchQuery) ||
      guest.phone.includes(searchQuery)
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-10">
      <h2 className="text-4xl font-extrabold text-blue-600 mb-6 border-b-2 border-blue-200 pb-2">
        Guests
      </h2>
      <div className="flex justify-between mb-4">
        <div className="relative">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Search guests..."
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
            <th className="py-3 px-4 border-b">NIC</th>
            <th className="py-3 px-4 border-b">Phone Number</th>
            <th className="py-3 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredGuests.map((guest, index) => (
            <tr
              key={guest._id}
              className="hover:bg-gray-100 transition duration-200"
            >
              <td className="py-3 px-4 border-b text-center">{index + 1}</td>
              <td className="py-3 px-4 border-b">
                {guest.firstName} {guest.lastName}
              </td>
              <td className="py-3 px-4 border-b">{guest.email}</td>
              <td className="py-3 px-4 border-b">{guest.nicPassport}</td>
              <td className="py-3 px-4 border-b">{guest.phone}</td>
              <td className="py-3 px-4 border-b flex space-x-2 justify-center">
                <button
                  onClick={() => handleDelete(guest._id)}
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

export default Guests;
