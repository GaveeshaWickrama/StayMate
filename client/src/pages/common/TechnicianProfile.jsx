import React, { useState, useEffect, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/auth';
import { FaEdit } from 'react-icons/fa';
import defaultProfilePic from '../../assets/profile2.png';

const TechnicianProfile = ({ profile, currentUser, id }) => {
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <div
      className="bg-white rounded-lg shadow-2xl p-10 w-full max-w-4xl border-r-4 border-transparent"
      style={{ borderImage: 'linear-gradient(to bottom right, blue, lightblue) 1' }}
    >
      <div className="flex flex-col md:flex-row items-center md:items-start relative">
        <div className="w-40 h-40 rounded-full overflow-hidden shadow-md mb-6 md:mb-0 md:mr-6 relative">
          <img
            src={profile.picture ? `${import.meta.env.VITE_API_URL}/${profile.picture}` : defaultProfilePic}
            alt="Profile"
            className="w-full h-full object-cover hover:scale-105 transition-transform"
          />
        </div>
        {currentUser && id === currentUser.id && (
          <Link to="/users/EditProfile">
            <div className="flex items-end justify-end h-40 mb-6 md:mb-0 md:mr-6">
              <button
                type="button"
                title="Change Profile"
                className="bg-blue-500 text-white p-2 rounded-full shadow-lg hover:bg-blue-600 transition transform hover:-translate-y-1 z-10"
                style={{ transform: 'translateX(-65px)' }}
              >
                <FaEdit size={20} />
              </button>
            </div>
          </Link>
        )}
        <div className="flex-1">
          <h1 className="text-4xl font-bold text-blue-600 mb-2">
            {profile.firstName} {profile.lastName}
          </h1>
          <p className="text-gray-600 mb-2">{profile.about}</p>
          <div className="flex space-x-4 mb-6">
            {currentUser && id === currentUser.id && (
              <button className="bg-blue-500 text-white py-2 px-6 rounded-full shadow-lg hover:bg-blue-600 transition transform hover:-translate-y-1">
                Edit Profile
              </button>
            )}
            {currentUser && id !== currentUser.id && (
              <button className="bg-gray-200 text-gray-700 py-2 px-6 rounded-full shadow-lg hover:bg-gray-300 transition transform hover:-translate-y-1">
                Message
              </button>
            )}
          </div>
          <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">Contact Information</h2>
            <div className="flex flex-wrap">
              {/* <span className="bg-blue-100 text-blue-600 py-1 px-3 rounded-full text-sm font-medium mr-2 mb-2">
                Position: {capitalizeFirstLetter(profile?.role || '')}
              </span> */}
              <span className="bg-blue-100 text-blue-600 py-1 px-3 rounded-full text-sm font-medium mr-2 mb-2">
                Phone: {profile.phone}
              </span>
              <span className="bg-blue-100 text-blue-600 py-1 px-3 rounded-full text-sm font-medium mr-2 mb-2">
                NIC/Passport: {profile.nicPassport}
                
              </span>
              <span className="bg-blue-100 text-blue-600 py-1 px-3 rounded-full text-sm font-medium mr-2 mb-2">
                Email: {profile.email}
              </span>
            </div>
          </div>
          {/* <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">Joined Date</h2>
            <div className="flex flex-wrap">
              <span className="bg-blue-100 text-blue-600 py-1 px-3 rounded-full text-sm font-medium mr-2 mb-2">
                {new Date(profile.createdOn).toLocaleDateString()}
              </span>
            </div>
          </div> */}
          {/* <div className="mb-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">About</h2>
            <p className="bg-blue-50 text-blue-800 py-2 px-4 rounded-lg text-sm shadow-inner">
              {profile.about}
            </p>
          </div> */}
        </div>
      </div>
      <div className="mt-6">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">Ratings</h2>
        <div className="space-y-4">
          <div className="bg-gray-100 rounded-lg p-4 shadow-lg transition transform hover:scale-105">
            <div className="flex items-center">
              <div className="text-yellow-500 mr-2">★★★★★</div>
              <p className="text-gray-700">
                Great Technician! Very responsive and the place was exactly as described.
              </p>
            </div>
            <p className="text-gray-500 text-sm mt-2">- Guest Name</p>
          </div>
          <div className="bg-gray-100 rounded-lg p-4 shadow-lg transition transform hover:scale-105">
            <div className="flex items-center">
              <div className="text-yellow-500 mr-2">★★★★☆</div>
              <p className="text-gray-700">
                Nice place, had a good time. Could improve on cleanliness.
              </p>
            </div>
            <p className="text-gray-500 text-sm mt-2">- Guest Name</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechnicianProfile;
