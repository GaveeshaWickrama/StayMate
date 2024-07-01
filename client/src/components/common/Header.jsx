// Header.js
import React from 'react';

const Header = () => {
  return (
    <div className="flex justify-between items-center bg-blue-200 p-4">
      <div className="text-xl font-bold">STAYMATE</div>
      <div className="flex items-center">
        <span className="mr-2">Sanuka</span>
        <span className="mr-2">Tenant</span>
        <img src="profile-pic-url" alt="Profile" className="w-10 h-10 rounded-full" />
      </div>
    </div>
  );
};

export default Header;