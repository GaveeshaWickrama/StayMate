import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
// import { useAuth } from '../context/auth';
import TechnicianRequests from '../pages/technician/Requests';
import AdminPage from '../pages/technician/AdminPage';
import EditProfile from '../pages/technician/EditProfile';
import MyProfile from '../pages/technician/MyProfile';

function UserRoutes() {
//   const { currentUser } = useAuth();

  return (
    <Routes>
      <Route path="/tasks" element={<TechnicianRequests/>} />
      <Route path="/admin-profile" element={<AdminPage/>} />
      <Route path="/edit-profile" element={<EditProfile/>} />
      <Route path="/my-profile" element={<MyProfile/>} />
    </Routes>
  );
}

export default UserRoutes;
