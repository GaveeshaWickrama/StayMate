import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/auth';
import AdminPage from '../pages/admin/AdminPage';
import MyProfile from '../pages/admin/MyProfile';

function AdminRoutes() {
  const { currentUser } = useAuth();

  return (
    <Routes>
      <Route path="/" element={currentUser && currentUser.role === 'admin' ? <AdminPage /> : <Navigate to="/Unauthorized" />} />
      <Route path="/myprofile" element={currentUser && currentUser.role === 'admin' ? <MyProfile /> : <Navigate to="/Unauthorized" />} />
      {/* <Route path="/editprofile" element={currentUser && currentUser.role === 'admin' ? <EditProfile /> : <Navigate to="/Unauthorized" />} /> */}
      
    </Routes>
  );
}

export default AdminRoutes;