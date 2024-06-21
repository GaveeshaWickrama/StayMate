import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/auth';
import HostPage from '../pages/host/HostPage'; // Import your HostPage component
import HostListings from '../pages/host/HostListings'; // Import your HostListings component

function HostRoutes() {
  const { currentUser } = useAuth();

  return (
    <Routes>
      <Route path="/" element={currentUser && currentUser.role === 'host' ? <HostPage /> : <Navigate to="/Unauthorized" />} />
      <Route path="/listings" element={currentUser && currentUser.role === 'host' ? <HostListings /> : <Navigate to="/Unauthorized" />} />
    </Routes>
  );
}

export default HostRoutes;
