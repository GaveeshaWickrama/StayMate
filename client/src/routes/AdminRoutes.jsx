import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/auth';
import AdminDashboard from '../pages/admin/AdminDashboard';
import MyProfile from '../pages/admin/MyProfile';
import EditProfile from '../pages/admin/EditProfile';
import UserCenter from '../pages/admin/UserCenter';
import ModeratorManagement from '../pages/admin/ModeratorManagement';
import AddUser from '../pages/admin/AddUser';
import UpdateUser from '../pages/admin/UpdateUser';
import Report from '../pages/admin/Report';

function AdminRoutes() {
  const { currentUser, loading } = useAuth();
  // console.log(currentUser);

  if (loading) {
    return <div>Loading...</div>; // Show a loading spinner or message
  }

  return (
    <Routes>
      <Route path="/" element={currentUser && currentUser.role === 'admin' ? <AdminDashboard /> : <Navigate to="/Unauthorized" />} />
      <Route path="/myprofile" element={currentUser && currentUser.role === 'admin' ? <MyProfile /> : <Navigate to="/Unauthorized" />} />
      <Route path="/editprofile" element={currentUser && currentUser.role === 'admin' ? <EditProfile /> : <Navigate to="/Unauthorized" />} />
      <Route path="/UserCenter" element={currentUser && currentUser.role === 'admin' ? <UserCenter /> : <Navigate to="/Unauthorized" />} />
      <Route path="/Report" element={currentUser && currentUser.role === 'admin' ? <Report /> : <Navigate to="/Unauthorized" />} />
      <Route path="/UpdateUser" element={currentUser && currentUser.role === 'admin' ? <UpdateUser /> : <Navigate to="/Unauthorized" />} />
      <Route path="/AddUser" element={currentUser && currentUser.role === 'admin' ? <AddUser /> : <Navigate to="/Unauthorized" />} />
      <Route path="/ModeratorManagement" element={currentUser && currentUser.role === 'admin' ? <ModeratorManagement /> : <Navigate to="/Unauthorized" />} />
    </Routes>
  );
}

export default AdminRoutes;
