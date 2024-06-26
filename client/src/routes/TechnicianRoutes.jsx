import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/auth';
import TechnicianRequests from '../pages/technician/MyProfile';

import AdminPage from '../pages/technician/AdminPage';
import EditProfile from '../pages/technician/EditProfile';
import HostListings from '../pages/technician/HostListings';
import HostPage from '../pages/technician/HostPage';
import Reservations from '../pages/technician/Reservations';
import MyProfile from '../pages/technician/MyProfile';
import RaiseComplaint from '../pages/technician/RaiseComplaintPage';
import PendingTasks from '../pages/technician/PendingTasks';
import ActiveTasks from '../pages/technician/ActiveTasks';
import UploadProof from '../pages/technician/Completion';

function UserRoutes() {
//   const { currentUser } = useAuth();

  return (
    <Routes>
      <Route path="/another-profile" element={<TechnicianRequests/>} />
      <Route path="/requests/pending-tasks" element={<PendingTasks/>} />
      <Route path="/requests/active-tasks" element={<ActiveTasks/>} />
      <Route path="/requests/completion" element={<UploadProof/>} />
      <Route path="/admin-profile" element={<AdminPage/>} />
      <Route path="/edit-profile" element={<EditProfile/>} />
      <Route path="/listings" element={<HostListings/>} />
      <Route path="/hostpage" element={<HostPage/>} />
      <Route path="/my-profile" element={<MyProfile/>} />
      <Route path="/raise-complaint" element={<RaiseComplaint/>} />
      <Route path="/reservations" element={<Reservations/>} />
    </Routes>
  );
}

export default UserRoutes;
