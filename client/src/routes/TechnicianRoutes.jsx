import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import TechnicianDashboard from '../pages/technician/TechnicianDashboard';
import { useAuth } from '../context/auth';
import TechnicianExploreLayout from '../pages/technician/layouts/TechnicianExplore';
import TechnicianLayout from '../pages/technician/layouts/TechnicianLayout';
import PendingTasks from '../pages/technician/PendingTasks';
import ActiveTasks from '../pages/technician/ActiveTasks';
import UploadProof from '../pages/technician/Completion';
import TechnicianExplore from '../pages/technician/ExploreTechnicians'
import TechnicianDetails from '../pages/technician/TechnicianDetails'
import Tasks from '../pages/technician/Tasks'
import TasksProof from '../pages/technician/Proof'

function TechnicianRoutes() {
  const { currentUser, loading} = useAuth();

  if (loading) {
    return <div>Loading...</div>; // Show a loading spinner or message
  }
  return (
    <div>
    
      <Routes>
      
      {currentUser && currentUser.role === 'technician' ? (
            <>
              <Route path="/dashboard" element={<TechnicianDashboard />} />
              <Route path="/requests/pending-tasks" element={<PendingTasks />} />
              <Route path="/requests/active-tasks" element={<ActiveTasks />} />
              <Route path="/requests/completion" element={<UploadProof />} />
              <Route path="/all" element={<TechnicianExplore />} />
              <Route path="/:id" element={<TechnicianDetails />} />
              <Route path="/tasks" element={<Tasks />} />
              <Route path="/proof" element={<TasksProof />} />
            </>
          ) : (
            <Route path="*" element={<Navigate to="/Unauthorized" />} />
          )}


      
     
      

    </Routes>
    </div>
    
  );
}

export default TechnicianRoutes;
