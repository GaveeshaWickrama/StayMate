import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/auth";
import GuestPage from "../pages/guest/GuestPage";
import ReviewAdd from "../pages/guest/ReviewAdd";
import Reservations from "../pages/guest/Reservations";

function UserRoutes() {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // Show a loading spinner or message
  }

  return (
    <Routes>
      <Route path="/" element={currentUser && currentUser.role === "guest" ? <GuestPage /> : <Navigate to="/Unauthorized" />} />
      <Route path="/reviews/add" element={currentUser && currentUser.role === "guest" ? <ReviewAdd /> : <Navigate to="/Unauthorized" />} />
      <Route path="/reservations" element={currentUser && currentUser.role === "guest" ? <Reservations /> : <Navigate to="/Unauthorized" />} />
    </Routes>
  );
}

export default UserRoutes;

