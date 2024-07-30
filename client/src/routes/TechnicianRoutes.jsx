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
import TaskDetails from '../pages/technician/TaskDetails'
import TasksProof from '../pages/technician/UploadProofForm'
import PendingTaskDetails from '../pages/technician/components/PendingTaskDetails';
import ActiveTaskDetails from '../pages/technician/components/ActiveTaskDetails';

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
             
              <Route path="/tasks/pending" element={<PendingTasks />} />
              <Route path="/tasks/active" element={<ActiveTasks/>} />
              <Route path="/task/:id/upload-proof" element={<ActiveTaskDetails />} />
              <Route path="/tasks" element={<Tasks />} />
              <Route path="/:id/task-details" element={<TaskDetails />} />
              <Route path="/:id/task/estimateBudget" element={<PendingTaskDetails />} />

            </>
          ) : (
            <Route path="*" element={<Navigate to="/Unauthorized" />} />
          )}


      
     
      

    </Routes>
    </div>
    
  );
}

export default TechnicianRoutes;
