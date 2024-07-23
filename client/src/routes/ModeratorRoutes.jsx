import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/auth';
// import ModeratorDashboard from '../pages/moderator/ModeratorDashboard';
import ViewNewProperties from '../pages/moderator/ViewNewProperties';
import NewPropertySeemore from '../pages/moderator/NewPropertySeemore';


function ModeratorRoutes() {
  const { currentUser, loading } = useAuth();0
  // console.log(currentUser);

  if (loading) {
    return <div>Loading...</div>; // Show a loading spinner or message
  }

  return (
    <Routes>
      {/* <Route path="/" element={currentUser && currentUser.role === 'moderator' ? <ModeratorDashboard /> : <Navigate to="/Unauthorized" />} /> */}
      <Route path="/viewNewProperties" element={currentUser && currentUser.role === 'moderator' ? <ViewNewProperties /> : <Navigate to="/Unauthorized" />} />
      <Route path="/newPropertySeemore/:id" element={currentUser && currentUser.role === 'moderator' ? <NewPropertySeemore /> : <Navigate to="/Unauthorized" />} />
      
    </Routes>
  );
}

export default ModeratorRoutes;
