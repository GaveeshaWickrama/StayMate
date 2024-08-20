import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RejectionForm = ({ propertyId, token, currentUser, onClose, onSubmit }) => {
  const [rejectionReasons, setRejectionReasons] = useState([]);
  const navigate = useNavigate();

  const reasons = [
   "Misleading Description",
   "Proof of Amneties Misiing",
   "Proof of Facilities Missing",
   "Property Not Belonging to you",
   "Other"
  ];

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setRejectionReasons([...rejectionReasons, value]);
    } else {
      setRejectionReasons(rejectionReasons.filter(reason => reason !== value));
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/moderator/rejectProperty/${propertyId}`, 
        { rejectionReasons, moderator: currentUser.id },
        {
          headers: {
            Authorization: `Bearer ${token}`
          },
        }
      );
  
      if (response.status === 200) {
        console.log('Property Rejected:', response.data);
        alert('Property rejected successfully');
        setTimeout(() => {
          window.history.back(); // Navigate to the previous page
        }, 0); // Set a timeout to ensure the navigation happens after the alert
      } else {
        alert('Failed to reject property');
      }
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error('Response data:', error.response.data);
        console.error('Response status:', error.response.status);
        console.error('Response headers:', error.response.headers);
        alert(`Server responded with status ${error.response.status}: ${error.response.data}`);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.error('Request data:', error.request);
        alert('No response received from server. Please check your network connection.');
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error message:', error.message);
        alert(`Error: ${error.message}`);
      }
      console.error('Error config:', error.config);
    }
  };
  

  const handleBack = () => {
    onClose(); // Navigate to the previous page
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md mt-2 w-full">
      <label>
      <h2 className="text-2xl font-bold text-black-600 mb-4 ">Select reasons for rejection:</h2>
      </label>
      <div>
        {reasons.map(reason => (
          <div key={reason} className="text-lg flex">
            <input
              type="checkbox"
              id={reason}
              value={reason}
              onChange={handleCheckboxChange}
              className="mr-2"
            />
            <label htmlFor={reason} className="text-gray-700">{reason}</label>
          </div>
        ))}
      </div>
      <div className="flex justify-between">
        <button 
          className="bg-blue-600 text-white px-4 py-2 rounded font-bold mx-2 flex-grow"
          onClick={handleSubmit}
        >
          Submit Rejection
        </button>
        <button 
          className="bg-gray-600 text-white px-4 py-2 rounded font-bold mx-2 flex-grow"
          onClick={handleBack}
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default RejectionForm;
