import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/auth';
import ViewProfile from '../pages/common/ViewProfile';

function UserRoutes() {
  const { currentUser, loading } = useAuth();
  const allowedRoles = ['admin', 'technician', 'moderator', 'host' ];
  // console.log(currentUser);

  if (loading) {
    return <div>Loading...</div>; // Show a loading spinner or message
  }

  return (
    <Routes>
      <Route path="/ViewProfile" element={currentUser && allowedRoles.includes(currentUser.role) ? <ViewProfile /> : <Navigate to="/Unauthorized" />} />
     
    </Routes>
  );
}

export default UserRoutes;
