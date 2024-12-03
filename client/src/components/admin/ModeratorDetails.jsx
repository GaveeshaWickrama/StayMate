import React from "react";
import { FaRegEdit } from "react-icons/fa";
import { useModeratorsContext } from "../../hooks/useModeratorsContext";
import axios from 'axios';
import { useAuth } from '../../context/auth';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection


const ModeratorDetails = ({ moderators }) => {

    const { token } = useAuth();
    const { dispatch } = useModeratorsContext();
    const navigate = useNavigate(); // For redirection

    // Redirect to the update page with the moderator's id
    const handleUpdate = (id) => {
        navigate(`/admin/UpdateModerator/${id}`);
    };
  
 return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded-lg shadow-md border border-gray-200">
        <thead>
          <tr className="bg-blue-200 text-gray-700 text-left">
            {/* <th className="py-3 px-6 border-b text-center">ID</th> */}
            <th className="py-3 px-6 border-b">Name</th>
            <th className="py-3 px-6 border-b">Email</th>
            <th className="py-3 px-6 border-b text-center">Phone Number</th>
            <th className="py-3 px-6 border-b text-center">NIC</th>
            <th className="py-3 px-6 border-b text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {moderators.map((moderator) => (
            <tr key={moderator._id} className="hover:bg-gray-100 transition duration-200">
              {/* <td className="py-3 px-6 border-b text-center">{moderator._id}</td> */}
              <td className="py-3 px-6 border-b">{moderator.firstName} {moderator.lastName}</td>
              <td className="py-3 px-6 border-b">{moderator.email}</td>
              <td className="py-3 px-6 border-b text-center">{moderator.phone}</td>
              <td className="py-3 px-6 border-b text-center">{moderator.nicPassport}</td>
              <td className="py-3 px-6 border-b text-center">
              <button
                    onClick={() => handleUpdate(moderator._id)}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                    <FaRegEdit/>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ModeratorDetails;
