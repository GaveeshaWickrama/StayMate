import React, { useState, useEffect,useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../../context/auth';
import { FaEdit } from 'react-icons/fa';
import defaultProfilePic from '../../assets/profile2.png';



const HostProfile = ({ profile, currentUser, id }) => {

    const capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
      };

    return (

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
            <p className="text-gray-600 mb-2">{ profile.email }</p>
            {/* <p className="text-gray-600 mb-2">NIC: { profile.nicPassport }</p> */}
            <div className="flex space-x-4 mb-6">
                {currentUser && id === currentUser.id && ( 
                    <button className="bg-blue-500 text-white py-2 px-6 rounded-full shadow-lg hover:bg-blue-600 transition transform hover:-translate-y-1">Edit Profile</button>
                )}
                {currentUser && id !== currentUser.id && ( 
                    <button className="bg-gray-200 text-gray-700 py-2 px-6 rounded-full shadow-lg hover:bg-gray-300 transition transform hover:-translate-y-1">Message</button>
                )}
            </div>
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-700 mb-2">Contact Information</h2>
              <div className="flex flex-wrap">
                <span className="bg-blue-100 text-blue-600 py-1 px-3 rounded-full text-sm font-medium mr-2 mb-2">Position: {capitalizeFirstLetter(profile?.role || '')}</span>
                <span className="bg-blue-100 text-blue-600 py-1 px-3 rounded-full text-sm font-medium mr-2 mb-2">Phone: { profile.phone }</span>
                <span className="bg-blue-100 text-blue-600 py-1 px-3 rounded-full text-sm font-medium mr-2 mb-2">NIC/Passport: { profile.nicPassport }</span>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">Ratings</h2>
          <div className="space-y-4">
            <div className="bg-gray-100 rounded-lg p-4 shadow-lg transition transform hover:scale-105">
              <div className="flex items-center">
                <div className="text-yellow-500 mr-2">★★★★★</div>
                <p className="text-gray-700">Great host! Very responsive and the place was exactly as described.</p>
              </div>
              <p className="text-gray-500 text-sm mt-2">- Guest Name</p>
            </div>
            <div className="bg-gray-100 rounded-lg p-4 shadow-lg transition transform hover:scale-105">
              <div className="flex items-center">
                <div className="text-yellow-500 mr-2">★★★★☆</div>
                <p className="text-gray-700">Nice place, had a good time. Could improve on cleanliness.</p>
              </div>
              <p className="text-gray-500 text-sm mt-2">- Guest Name</p>
            </div>
          </div>
        </div>
        <div className="mt-6">
          <h2 className="text-2xl font-bold text-gray-700 mb-4">Listed Properties</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-gray-100 rounded-lg overflow-hidden shadow-lg transition transform hover:scale-105">
              <img src={pic1} alt="Property 1" className="w-full h-32 sm:h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-700">Cozy Apartment</h3>
                <p className="text-gray-600 mt-2">Located in the heart of the city, this cozy apartment offers all amenities for a comfortable stay.</p>
              </div>
            </div>
            <div className="bg-gray-100 rounded-lg overflow-hidden shadow-lg transition transform hover:scale-105">
              <img src={pic2} alt="Property 2" className="w-full h-32 sm:h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-700">Beachside Villa</h3>
                <p className="text-gray-600 mt-2">Enjoy the beach views from this beautiful villa, perfect for a relaxing vacation.</p>
              </div>
            </div>
            <div className="bg-gray-100 rounded-lg overflow-hidden shadow-lg transition transform hover:scale-105">
              <img src={pic3} alt="Property 3" className="w-full h-32 sm:h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-700">Mountain Cabin</h3>
                <p className="text-gray-600 mt-2">Escape to the mountains in this cozy cabin, ideal for nature lovers and adventurers.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
};

export default HostProfile;
    