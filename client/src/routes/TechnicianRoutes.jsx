import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
// import { useAuth } from '../context/auth';
import TechnicianRequests from '../pages/technician/Requests';

function UserRoutes() {
//   const { currentUser } = useAuth();

  return (
    <Routes>
      <Route path="/tasks" element={<TechnicianRequests/>} />
    </Routes>
  );
}

export default UserRoutes;
