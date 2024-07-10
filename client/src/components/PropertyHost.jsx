import React from 'react';
import { FaStar, FaMedal } from 'react-icons/fa';
import defaultProfilePic from '../assets/profile.jpg'; // Adjust the path as necessary

const PropertyHost = ({ host }) => {
  const hostImage = host.image || defaultProfilePic;

  return (
    <div className="flex items-center p-4 bg-white rounded-lg">
      <img src={hostImage} alt="Host" className="w-40 h-40 rounded-full mr-4" />
      <div className="flex flex-col">
        <h3 className="text-lg font-bold">{host.name}</h3>
      </div>
      <div className="ml-auto text-right">
        <div className="text-xl font-bold">{host.reviews} Reviews</div>
        <div className="flex items-center justify-end">
          <FaStar className="text-yellow-500 mr-1" />
          <span className="text-lg font-bold">{host.rating}</span>
        </div>
        <div className="text-gray-500">{host.monthsHosting} Months hosting</div>
      </div>
    </div>
  );
};

export default PropertyHost;

