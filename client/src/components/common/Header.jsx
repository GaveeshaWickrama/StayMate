import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "../../context/auth";
import logo from "../../assets/icons/logo.png";
import { Link, useNavigate } from "react-router-dom";
import useGetNotifications from "../../hooks/useGetNotifications";
import { FaBars, FaUser, FaSignOutAlt,FaBell } from 'react-icons/fa';
import defaultProfilePic from '../../assets/profile2.png'
import axios from "axios";

const Header = ({ toggleNavbar }) => {
  const { currentUser, loading, logout,token } = useAuth();
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  //const [notifications, setNotifications] = useState(2); // Example count
  // Use the custom hook to get notifications
  const { notifications } = useGetNotifications();
  console.log("Notifications in Header:", notifications);
  const dropdownRef = useRef(null);
  const notificationsRef = useRef(null);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }

      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        setNotificationsOpen(false);
      }

    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [dropdownRef,notificationsRef]);

  if (loading) {
    return <div><span className="loading loading-spinner text-info"></span>
</div>; // Show a loading spinner or message
  }

  const handleLogout = async () => {
    setDropdownOpen(false); // Close the dropdown
    await logout();
    navigate("/"); // Redirect to the home page after logout
  };

  const handleNotificationClick = async (notification) => {
    // Check if the notification type is 'complaint'
    if (notification.notificationType === "complaint") {
      // Navigate to the complaint details page with complaintId
      navigate(`/host/complaint-details/${notification.complaintId}`);
    }

    try {
      
      const response = await axios.patch(
        `${import.meta.env.VITE_API_URL}/notification/updateReadStatus`,
        {
          notificationId: notification._id, // Pass the notification ID
        },
        {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
        }
    );

    } catch (error) {
      console.error("updateReadStatus error: ", error.message);
      toast.error("Failed to update read status");
    }
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
          <div 
          className="relative mr-4 cursor-pointer"
          onClick={() => setNotificationsOpen(!notificationsOpen)}
          ref={notificationsRef}
          >
            <FaBell size={24} className="text-white" />
            {notifications.length > 0 && (
              <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full transform translate-x-1/2 -translate-y-1/2">
                {notifications.length}
              </span>
            )}
          </div>
          {notificationsOpen && (
            <div className="absolute top-12 right-0 mt-2 w-72 bg-white rounded-md shadow-lg z-50 max-h-64 overflow-y-auto">
              <ul className="list-none p-2">
                {notifications.length === 0 ? (
                  <li className="p-2 text-gray-500 text-center">
                    No new notifications
                  </li>
                ) : (
                  notifications.map((notification, index) => (
                    <li
                      key={index}
                      className="p-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        // Handle notification click
                        console.log("List Item clicked : ",notification.complaintId);
                        handleNotificationClick(notification);
                      }
                      } 
                    >
                      {notification.notificationMessage}
                    </li>
                  ))
                )}
              </ul>
            </div>
          )}
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
