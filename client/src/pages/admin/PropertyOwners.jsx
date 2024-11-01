// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { FaTrash, FaSearch } from "react-icons/fa";

// const PropertyOwners = () => {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [propertyOwners, setPropertyOwners] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchPropertyOwners = async () => {
//       try {
//         const response = await axios.get(`${import.meta.env.VITE_API_URL}/propertyOwners/all`);
//         console.log(response.data); // Log the response data
//         if (Array.isArray(response.data)) {
//           setPropertyOwners(response.data);
//         } else {
//           setError("Unexpected response format");
//         }
//       } catch (error) {
//         setError("Error fetching property owners: " + error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchPropertyOwners();
//   }, []);

//   const handleDelete = async (id) => {
//     const confirmDelete = window.confirm("Are you sure you want to delete this property owner?");
//     if (confirmDelete) {
//       try {
//         await axios.delete(`${import.meta.env.VITE_API_URL}/propertyOwners/${id}`);
//         setPropertyOwners(propertyOwners.filter((owner) => owner._id !== id));
//       } catch (error) {
//         console.error("Error deleting property owner:", error);
//       }
//     }
//   };

//   const handleSearch = (e) => {
//     setSearchQuery(e.target.value);
//   };

//   const filteredPropertyOwners = propertyOwners.filter((owner) =>
//     Object.values(owner).some((value) =>
//       value.toString().toLowerCase().includes(searchQuery.toLowerCase())
//     )
//   );

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <div className="container mx-auto p-10">
//       <h2 className="text-4xl font-extrabold text-blue-600 mb-6 border-b-2 border-blue-200 pb-2">
//         Property Owners
//       </h2>
//       <div className="flex justify-between mb-4">
//         <div className="relative">
//           <input
//             type="text"
//             value={searchQuery}
//             onChange={handleSearch}
//             placeholder="Search property owners..."
//             className="border border-gray-300 rounded-md px-4 py-2 pl-10 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//           <FaSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
//         </div>
//       </div>
//       <table className="min-w-full bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
//         <thead>
//           <tr className="bg-blue-200 text-gray-700">
//             <th className="py-3 px-4 border-b">First Name</th>
//             <th className="py-3 px-4 border-b">Last Name</th>
//             <th className="py-3 px-4 border-b">Email</th>
//             <th className="py-3 px-4 border-b">Phone</th>
//             <th className="py-3 px-4 border-b">Property Count</th>
//             <th className="py-3 px-4 border-b">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {filteredPropertyOwners.map((owner) => (
//             <tr key={owner._id} className="hover:bg-gray-100 transition duration-200">
//               <td className="py-3 px-4 border-b text-center">{owner.firstName}</td>
//               <td className="py-3 px-4 border-b text-center">{owner.lastName}</td>
//               <td className="py-3 px-4 border-b text-center">{owner.email}</td>
//               <td className="py-3 px-4 border-b text-center">{owner.phone}</td>
//               <td className="py-3 px-4 border-b text-center">{owner.propertyCount}</td>
//               <td className="py-3 px-4 border-b flex space-x-2 justify-center">
//                 <button
//                   onClick={() => handleDelete(owner._id)}
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

// export default PropertyOwners;


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaTrash, FaSearch } from "react-icons/fa";

const PropertyOwner = () => {
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [propertyOwners, setPropertyOwners] = useState([
    { id: 1, name: "John Doe", email: "John@gmail.com", address: "123 Main St", phone: "123-456-7890" },
    { id: 2, name: "Jane Smith", email: "Jane@gmail.com", address: "456 Elm St", phone: "987-654-3210" },
    { id: 3, name: "Alice Johnson", email: "Alice@gmail.com", address: "789 Oak St", phone: "555-555-5555" },
    { id: 4, name: "John Doe", email: "John@gmail.com", address: "123 Main St", phone: "123-456-7890" },
    { id: 5, name: "Jane Smith", email: "Jane@gmail.com", address: "456 Elm St", phone: "987-654-3210" },
    { id: 6, name: "Alice Johnson", email: "Alice@gmail.com", address: "789 Oak St", phone: "555-555-5555" },
  ]);

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
      owner.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      owner.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      owner.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
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
            <th className="py-3 px-4 border-b">Address</th>
            <th className="py-3 px-4 border-b">Phone Number</th>
            <th className="py-3 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredPropertyOwners.map((owner) => (
            <tr key={owner.id} className="hover:bg-gray-100 transition duration-200">
              <td className="py-3 px-4 border-b text-center">{owner.id}</td>
              <td className="py-3 px-4 border-b">{owner.name}</td>
              <td className="py-3 px-4 border-b">{owner.email}</td>
              <td className="py-3 px-4 border-b">{owner.address}</td>
              <td className="py-3 px-4 border-b">{owner.phone}</td>
              <td className="py-3 px-4 border-b flex space-x-2 justify-center">
                <button
                  onClick={() => handleDelete(owner.id)}
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
