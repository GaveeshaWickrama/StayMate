import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/auth';
// import UserPage from '../pages/user/UserPage';

function UserRoutes() {
  const { currentUser } = useAuth();

  return (
    <Routes>
      {/* <Route path="/" element={currentUser && currentUser.role === 'user' ? <UserPage /> : <Navigate to="/Unauthorized" />} /> */}
    </Routes>
  );
}

export default UserRoutes;
