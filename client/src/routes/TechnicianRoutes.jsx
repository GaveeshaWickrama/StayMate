import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import TechnicianDashboard from '../pages/technician/TechnicianDashboard';
// import { useAuth } from '../context/auth';
import TechnicianExploreLayout from '../pages/technician/layouts/TechnicianExplore';

import PendingTasks from '../pages/technician/PendingTasks';
import ActiveTasks from '../pages/technician/ActiveTasks';
import UploadProof from '../pages/technician/Completion';
import TechnicianExplore from '../pages/technician/ExploreTechnicians'
import TechnicianDetails from '../pages/technician/TechnicianDetails'


function UserRoutes() {
//   const { currentUser } = useAuth();

  return (
    <Routes>
      
      <Route path="/" element={<TechnicianExploreLayout/>} >
      <Route path="/dashboard" index element={<TechnicianDashboard/>} />

      </Route>
      <Route path="/dashboard" element={<TechnicianDashboard/>} />
      <Route path="/requests/pending-tasks" element={<PendingTasks/>} />
      <Route path="/requests/active-tasks" element={<ActiveTasks/>} />
      <Route path="/requests/completion" element={<UploadProof/>} />
      <Route path="/all" element={<TechnicianExplore/>} />
      <Route path="/:id" element={<TechnicianDetails/>} />
      

    </Routes>
  );
}

export default UserRoutes;
