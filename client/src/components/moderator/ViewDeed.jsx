import React from 'react';
import { FaFilePdf } from 'react-icons/fa';

const ViewDeed = ({ deedId }) => {
  // Construct the file URL
  const fileUrl = `http://localhost:3000/properties/deed/${deedId}`;

  return (
    <div className="flex flex-col items-center p-4  rounded-lg ">
      {/* Icon */}
      <div className="flex items-center mb-3">
        <FaFilePdf className="text-red-500 text-4xl" />
        <span className="ml-3 text-xl font-semibold text-gray-800">
          Property Document
        </span>
      </div>
      
      {/* Link to Download */}
      <a
        href={fileUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-500 transition duration-300"
      >
        Download
      </a>
    </div>
  );
};

export default ViewDeed;

