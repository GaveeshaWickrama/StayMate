import React from 'react';
import { useAuth } from '../../context/auth';
import logo from '../../assets/icons/logo.png'; 

const Header = () => {

  const { currentUser, loading } = useAuth();
  console.log("Inside Header");
  console.log(currentUser);

  if (loading) {
    return <div>Loading...</div>; // Show a loading spinner or message
  }
    
  return (
    <div className="bg-blue-200 p-4 flex justify-between items-center fixed top-0 left-0 w-[calc(100%-16rem)] h-20" style={{ marginLeft: '16rem' }}>
      <div className="flex items-center">
        <img src={logo} alt="Staymate Logo" className="h-16" />
        <div className="ml-4">
          <h1 className="text-2xl font-bold">STAYMATE</h1>
          <p className="text-sm">Your Satisfaction, Our Priority</p>
        </div>
      </div>
      {currentUser ? (
        <div className="flex items-center">
          <div className="text-right mr-4">
            <p className="text-lg font-bold">
              {currentUser.gender === "male" ? "Mr. " : currentUser.gender === "female" ? "Ms. " : ""}
              {currentUser.firstName} {currentUser.lastName}
            </p>
            <p className="text-blue-500">{currentUser.role}</p>
          </div>
          <img
            src={`${import.meta.env.VITE_API_URL}/${currentUser.picture}`}
            alt="Profile"
            className="h-12 w-12 rounded-full"
          />
        </div>
      ) : (
        <div className="flex space-x-4">
          <a href="/login" className="text-blue-500 hover:underline">Login</a>
          <a href="/signup" className="text-blue-500 hover:underline">Signup</a>
        </div>
      )}
    </div>
  );
};

export default Header;
