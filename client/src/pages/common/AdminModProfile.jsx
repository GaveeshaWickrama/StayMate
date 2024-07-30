import React, { useState, useEffect, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/auth';
import { FaEdit } from 'react-icons/fa';
import defaultProfilePic from '../../assets/profile2.png';

const ProfilePage = ({ profile, currentUser, id }) => {

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    // <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-gray-50 overflow-hidden">
      <div className="bg-white rounded-lg shadow-2xl p-10 w-full max-w-4xl border-r-4 border-transparent" style={{ borderImage: 'linear-gradient(to bottom right, blue, lightblue) 1' }}>
        <div className="flex flex-col md:flex-row items-center md:items-start relative">
          <div className="w-40 h-40 rounded-full overflow-hidden shadow-md mb-6 md:mb-0 md:mr-6 relative">
            <img src={profile.picture ? `${import.meta.env.VITE_API_URL}/${profile.picture}` : defaultProfilePic} alt="Profile" className="w-full h-full object-cover hover:scale-105 transition-transform" />
          </div>
          {currentUser && id === currentUser.id && (
            <Link to="/users/EditProfile">
              <div className="flex items-end justify-end h-40 mb-6 md:mb-0 md:mr-6">
                <button type="button" title="Change Profile" className="bg-blue-500 text-white p-2 rounded-full shadow-lg hover:bg-blue-600 transition transform hover:-translate-y-1 z-10" style={{ transform: 'translateX(-65px)' }}>
                  <FaEdit size={20} />
                </button>
              </div>
            </Link>
          )}
          <div className="flex-1">
            <h1 className="text-4xl font-bold text-blue-600 mb-2">{profile.firstName} {profile.lastName}</h1>
            <p className="text-gray-600 mb-2">{profile.email}</p>
            <div className="flex space-x-4 mb-6">
              {currentUser && id !== currentUser.id && (
                <button className="bg-gray-200 text-gray-700 py-2 px-6 rounded-full shadow-lg hover:bg-gray-300 transition transform hover:-translate-y-1">Message</button>
              )}
              {currentUser && id === currentUser.id && (
                <button className="bg-blue-500 text-white py-2 px-6 rounded-full shadow-lg hover:bg-blue-600 transition transform hover:-translate-y-1">Edit Profile</button>
              )}
            </div>
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-700 mb-2">Contact Information</h2>
              <div className="flex flex-wrap">
                <span className="bg-blue-100 text-blue-600 py-1 px-3 rounded-full text-sm font-medium mr-2 mb-2">Position: {capitalizeFirstLetter(profile?.role || '')}</span>
                <span className="bg-blue-100 text-blue-600 py-1 px-3 rounded-full text-sm font-medium mr-2 mb-2">Phone: {profile.phone}</span>
                <span className="bg-blue-100 text-blue-600 py-1 px-3 rounded-full text-sm font-medium mr-2 mb-2">NIC/Passport: {profile.nicPassport}</span>
              </div>
            </div>
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-700 mb-2">Basic Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-blue-100 text-blue-600 py-4 px-6 rounded-lg shadow-md">
                  <p className="text-sm font-semibold">Joined Date</p>
                  <p className="text-base">{new Date(profile.createdOn).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    // </div>
  );
};

export default ProfilePage;
