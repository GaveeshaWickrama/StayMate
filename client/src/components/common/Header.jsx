import React from 'react';
import { useAuth } from '../../context/auth';
import logo from '../../assets/icons/logo.png'; 
import { Link } from "react-router-dom";

import { FaBars, FaTimes } from 'react-icons/fa';

const Header = ({ toggleNavbar }) => {
  const { currentUser, loading } = useAuth();
  console.log("Inside Header");
  console.log(currentUser);

  if (loading) {
    return <div>Loading...</div>; // Show a loading spinner or message
  }

  return (
    <div className="header bg-gradient-to-r from-blue-400 via-blue-600 to-blue-700 p-4 flex justify-between items-center fixed top-0 left-0 w-full h-20 shadow-lg">
      <div className="flex items-center">
      <button onClick={toggleNavbar} className="bg-blue-500 text-white rounded-full p-4 my-4 flex items-center justify-center shadow-md hover:bg-blue-600 transition duration-200" > <FaBars size={24} /> </button>
        <div className="flex items-center  p-0 rounded">
          <img src={logo} alt="Staymate Logo" className="h-20" />
        </div>
        <div className="ml-4 text-white">
          <h1 className="text-2xl font-bold">STAYMATE</h1>
          <p className="text-sm">Your Satisfaction, Our Priority</p>
        </div>
      </div>
      {currentUser ? (
        <Link to="/users/ViewProfile">
          <div className="flex items-center">
            <div className="text-right mr-4">
              <p className="text-lg font-bold text-white">
                {currentUser.gender === "male" ? "Mr. " : currentUser.gender === "female" ? "Ms. " : ""}
                {currentUser.firstName} {currentUser.lastName}
              </p>
              <p className="text-blue-200">{currentUser.role}</p>
            </div>
            <img
              src={`${import.meta.env.VITE_API_URL}/${currentUser.picture}`}
              alt="Profile"
              className="h-12 w-12 rounded-full border-2 border-white"
            />
          </div>
        </Link>
      ) : (
        <div className="flex space-x-4">
          <a href="/login" className="text-white hover:underline">Login</a>
          <a href="/signup/guest" className="text-white hover:underline">Signup</a>
        </div>
      )}
    </div>
  );
};

export default Header;

