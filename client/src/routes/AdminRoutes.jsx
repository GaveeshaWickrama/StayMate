import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/auth';
import AdminDashboard from '../pages/admin/AdminDashboard';
import MyProfile from '../pages/admin/MyProfile';

import Moderator from '../pages/admin/Moderator';
import ModeratorManagement from '../pages/admin/ModeratorManagement';
import AddUser from '../pages/admin/AddUser';
import UpdateUser from '../pages/admin/UpdateUser';
import Report from '../pages/admin/Report';
import PropertyOwners from '../pages/admin/PropertyOwners';
import Tenants from '../pages/admin/Tenants';
import Technicians from '../pages/admin/Technicians';

function AdminRoutes() {
  const { currentUser, loading } = useAuth();
  // console.log(currentUser);

  if (loading) {
    return <div>Loading...</div>; // Show a loading spinner or message
  }

  return (
    <Routes>
      <Route path="/AdminDashboard" element={currentUser && currentUser.role === 'admin' ? <AdminDashboard /> : <Navigate to="/Unauthorized" />} />
      <Route path="/myprofile" element={currentUser && currentUser.role === 'admin' ? <MyProfile /> : <Navigate to="/Unauthorized" />} />
      
      <Route path="/ManageModerators" element={currentUser && currentUser.role === 'admin' ? <ModeratorManagement /> : <Navigate to="/Unauthorized" />} />
      <Route path="/AddUser" element={currentUser && currentUser.role === 'admin' ? <AddUser /> : <Navigate to="/Unauthorized" />} />
      <Route path="/Moderator" element={currentUser && currentUser.role === 'admin' ? <Moderator /> : <Navigate to="/Unauthorized" />} />
      <Route path="/ManageModerators" element={currentUser && currentUser.role === 'admin' ? <ModeratorManagement /> : <Navigate to="/Unauthorized" />} />
      <Route path="/UpdateUser" element={currentUser && currentUser.role === 'admin' ? <UpdateUser /> : <Navigate to="/Unauthorized" />} />
      <Route path="/Report" element={currentUser && currentUser.role === 'admin' ? <Report /> : <Navigate to="/Unauthorized" />} />
      <Route path="/PropertyOwners" element={currentUser && currentUser.role === 'admin' ? <PropertyOwners /> : <Navigate to="/Unauthorized" />} />
      <Route path="/Tenants" element={currentUser && currentUser.role === 'admin' ? <Tenants /> : <Navigate to="/Unauthorized" />} />
      <Route path="/Technicians" element={currentUser && currentUser.role === 'admin' ? <Technicians /> : <Navigate to="/Unauthorized" />} />
    </Routes>
  );
}

export default AdminRoutes;
