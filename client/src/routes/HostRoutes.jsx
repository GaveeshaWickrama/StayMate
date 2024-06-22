import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/auth';
import HostPage from '../pages/host/HostPage';
import HostListings from '../pages/host/HostListings';
import AddProperty from '../pages/host/AddProperty';
import AddSection from '../pages/host/AddSection';

function HostRoutes() {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // Show a loading spinner or message
  }

  return (
    <Routes>
      <Route path="/" element={currentUser && currentUser.role === 'host' ? <HostPage /> : <Navigate to="/Unauthorized" />} />
      <Route path="/listings" element={currentUser && currentUser.role === 'host' ? <HostListings /> : <Navigate to="/Unauthorized" />} />
      <Route path="/add-property" element={currentUser && currentUser.role === 'host' ? <AddProperty /> : <Navigate to="/Unauthorized" />} />
      <Route path="/add-section" element={currentUser && currentUser.role === 'host' ? <AddSection /> : <Navigate to="/Unauthorized" />} />
    </Routes>
  );
}

export default HostRoutes;

