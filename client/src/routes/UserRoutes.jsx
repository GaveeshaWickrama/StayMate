import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/auth';
/* import ViewProfile from '../pages/common/ViewProfile';
import EditProfile from '../pages/common/EditProfile';
import Test from '../pages/common/Test'

function UserRoutes() {
  const { currentUser, loading } = useAuth();
  const allowedRoles = ['admin', 'technician', 'guest', 'host', 'moderator' ];
  // console.log(currentUser);

  if (loading) {
    return <div>Loading...</div>; // Show a loading spinner or message
  }

  return (
    <Routes>
      <Route path="/ViewProfile/:id" element={currentUser && allowedRoles.includes(currentUser.role) ? <ViewProfile /> : <Navigate to="/Unauthorized" />} />
      <Route path="/EditProfile" element={currentUser && allowedRoles.includes(currentUser.role) ? <EditProfile /> : <Navigate to="/Unauthorized" />} />
      <Route path="/Test" element={currentUser && allowedRoles.includes(currentUser.role) ? <Test /> : <Navigate to="/Unauthorized" />} />
      {/* <Route path="/Test2" element={currentUser && allowedRoles.includes(currentUser.role) ? <Test2 /> : <Navigate to="/Unauthorized" />} /> */}
     
    </Routes>
  );
}

export default UserRoutes;
