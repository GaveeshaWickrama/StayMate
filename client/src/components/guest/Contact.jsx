import React from 'react';
import { FaPhone, FaEnvelope } from 'react-icons/fa';

const Contact = () => {
  return (
    <div className=" bg-blue-50 flex justify-center items-center space-x-4 shadow-md">
      <div className="flex items-center space-x-2 p-2 bg-blue-100 rounded-lg shadow">
        <img src="https://via.placeholder.com/40" alt="profile" className="w-10 h-10 rounded-full" />
        <div className="text-lg font-bold text-gray-900">raveesa</div>
        <div className="text-sm text-gray-500">property owner</div>
      </div>
      <div className="flex space-x-4">
        <button className="flex items-center justify-center w-10 h-10 bg-blue-500 text-white rounded-full shadow">
          <FaPhone />
        </button>
        <button className="flex items-center justify-center w-10 h-10 bg-blue-500 text-white rounded-full shadow">
          <FaEnvelope />
        </button>
      </div>
    </div>
  );
};

export default Contact;
