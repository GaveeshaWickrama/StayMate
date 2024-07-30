import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/auth";

import GuestPage from "../pages/guest/GuestPage";

import ReviewAdd from "../pages/guest/ReviewAdd";
import Reservations from "../pages/guest/Reservations";
import RaiseComplaintPage from "../pages/guest/RaiseComplaintPage";
import ChatHomePage from "../pages/common/ChatHomePage";
import TripDetails from "../pages/guest/TripDetails";
import GuestReviews from "../pages/guest/guestReviews";
import GuestDashboard from "../pages/guest/GuestDashboard";

function UserRoutes() {
  const { currentUser, loading } = useAuth();
  console.log(currentUser);

  if (loading) {
    return <div>Loading...</div>; // Show a loading spinner or message
  }

  return (
    <Routes>
      {/* route for add review */}
      <Route
        path="/reviews/add"
        element={
          currentUser && currentUser.role === "guest" ? (
            <ReviewAdd />
          ) : (
            <Navigate to="/Unauthorized" />
          )
        }
      />
      <Route
        path="/dashboard"
        element={
          currentUser && currentUser.role === "guest" ? (
            <GuestDashboard />
          ) : (
            <Navigate to="/Unauthorized" />
          )
        }
      />
      {/* route for view reservations */}
      <Route
        path="/reservations"
        element={
          currentUser && currentUser.role === "guest" ? (
            <Reservations />
          ) : (
            <Navigate to="/Unauthorized" />
          )
        }
      />
      {/* route for raising Complaint */}
      <Route
        path="/complaints/add"
        element={
          currentUser && currentUser.role === "guest" ? (
            <RaiseComplaintPage />
          ) : (
            <Navigate to="/Unauthorized" />
          )
        }
      />
      {/* route for View Booking Info */}
      <Route
        path="/reserve/:propertyId"
        element={
          currentUser && currentUser.role === "guest" ? (
            <TripDetails />
          ) : (
            <Navigate to="/Unauthorized" />
          )
        }
      />
      <Route
        path="/chat"
        element={
          currentUser && currentUser.role === "guest" ? (
            <ChatHomePage />
          ) : (
            <Navigate to="/Unauthorized" />
          )
        }
      />
      <Route
        path="/viewreviews"
        element={
          currentUser && currentUser.role === "guest" ? (
            <GuestReviews />
          ) : (
            <Navigate to="/Unauthorized" />
          )
        }
      />
    </Routes>
  );
}

export default UserRoutes;
