import React from 'react';
import logo from '../../assets/icons/logo.png'; 

const Header = () => {
  return (
    <div className="bg-blue-200 p-4 flex justify-between items-center fixed top-0 left-0 w-[calc(100%-16rem)] h-20" style={{ marginLeft: '16rem' }}>
      <div className="flex items-center">
        <img src={logo} alt="Staymate Logo" className="h-16" />
        <div className="ml-4">
          <h1 className="text-2xl font-bold">STAYMATE</h1>
          <p className="text-sm">Your Satisfaction, Our Priority</p>
        </div>
      </div>
      <div className="flex items-center">
        <div className="text-right mr-4">
          <p className="text-lg font-bold">Raweesha</p>
          <p className="text-blue-500">Property Owner</p>
        </div>
        <img src="path/to/profile-pic.jpg" alt="Profile" className="h-12 w-12 rounded-full" />
      </div>
    </div>
  );
};

export default Header;
