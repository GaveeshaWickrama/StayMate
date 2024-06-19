import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/auth';
import GuestPage from '../pages/guest/GuestPage';

function UserRoutes() {
  const { currentUser } = useAuth();

  return (
    <Routes>
      <Route path="/" element={currentUser && currentUser.role === 'guest' ? <GuestPage /> : <Navigate to="/Unauthorized" />} />
    </Routes>
  );
}

export default UserRoutes;
