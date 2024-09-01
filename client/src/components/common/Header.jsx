import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../../context/auth";
import logo from "../../assets/icons/logo.png";
import { Link, useNavigate } from "react-router-dom";



import { FaBars, FaUser, FaSignOutAlt,FaBell } from 'react-icons/fa';
import defaultProfilePic from '../../assets/profile2.png'


const Header = ({ toggleNavbar }) => {
  const { currentUser, loading, logout } = useAuth();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notifications, setNotifications] = useState(2); // Example count
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  if (loading) {
    return <div><span className="loading loading-spinner text-info"></span>
</div>; // Show a loading spinner or message
  }

  const handleLogout = async () => {
    setDropdownOpen(false); // Close the dropdown
    await logout();
    navigate("/"); // Redirect to the home page after logout
  };

  return (
    <div className="header bg-gradient-to-r from-blue-400 via-blue-600 to-blue-700 p-4 flex justify-between items-center fixed top-0 left-0 w-full h-20 shadow-lg z-50">
      <div className="flex items-center">
        <button
          onClick={toggleNavbar}
          className="bg-blue-500 text-white rounded-full p-2 flex items-center justify-center shadow-md hover:bg-blue-600 transition duration-200"
        >
          <FaBars size={24} />
        </button>
        <div className="flex items-center p-0 rounded ml-4">
          <img src={logo} alt="Staymate Logo" className="h-12" />
        </div>
        <div className="ml-4 text-white">
          <h1 className="text-2xl font-bold">STAYMATE</h1>
          <p className="text-sm">Your Satisfaction, Our Priority</p>
        </div>
      </div>

      {currentUser ? (
        
        <div className="relative flex items-center" ref={dropdownRef}>
          {/* Notification Icon placed between name/role and profile picture */}
          <div className="relative mr-4 cursor-pointer">
            <FaBell size={24} className="text-white" />
            {notifications > 0 && (
              <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full transform translate-x-1/2 -translate-y-1/2">
                {notifications}
              </span>
            )}
          </div>
          <div
            className="flex items-center cursor-pointer"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <div className="text-right mr-4">
              <p className="text-lg font-bold text-white">
                {currentUser.firstName} {currentUser.lastName}
              </p>
              <p className="text-blue-200">
                {currentUser.role === "guest" ? "Tenant" : currentUser.role}
              </p>
            </div>

            <img
              src={currentUser.picture ? `${import.meta.env.VITE_API_URL}/${currentUser.picture}` : defaultProfilePic}
              alt="Profile"
              className="h-12 w-12 rounded-full border-2 border-white"
            />
          </div>
          {dropdownOpen && (
            <div className="absolute top-12 right-0 mt-2 w-56 bg-white rounded-md shadow-lg z-50">
              <Link
                to={`/users/ViewProfile/${currentUser.id}`}
                className="px-4 py-4 text-gray-800 hover:bg-gray-100 rounded-t-md flex items-center"
              >
                <FaUser className="text-blue-500 mr-2" />
                View Profile
              </Link>
              <hr className="border-gray-300" />
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-4 text-gray-800 hover:bg-gray-100 rounded-b-md flex items-center"
              >
                <FaSignOutAlt className="text-blue-500 mr-2" />
                Logout
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="flex space-x-4">
          <Link to="/login" className="text-white hover:underline">
            Login
          </Link>
          <Link to="/signup/guest" className="text-white hover:underline">
            Signup
          </Link>
        </div>
      )}
    </div>
  );
};

export default Header;
