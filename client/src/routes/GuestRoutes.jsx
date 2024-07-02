import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/auth";
import GuestPage from "../pages/guest/GuestPage";
import ReviewAdd from "../pages/guest/ReviewAdd";
import Reservations from "../pages/guest/Reservations";
import RaiseComplaintPage from "../pages/guest/RaiseComplaintPage";
import Chat from "../pages/common/Chat";

function UserRoutes() {
  const { currentUser, loading } = useAuth();
  console.log(currentUser)

  if (loading) {
    return <div>Loading...</div>; // Show a loading spinner or message
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          currentUser && currentUser.role === "guest" ? (
            <GuestPage />
          ) : (
            <Navigate to="/Unauthorized" />
          )
        }
      />
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
      path="/raisecomplaints"
      element={
        currentUser && currentUser.role === "guest" ? (
          <RaiseComplaintPage />
        ) : (
          <Navigate to="/Unauthorized" />
        )
        }
      />

      <Route
      path="/chat"
      element={
        currentUser && currentUser.role === "guest" ? (
          <Chat />
        ) : (
          <Navigate to="/Unauthorized" />
        )
        }
      />
    </Routes>

  );
}

export default UserRoutes;

