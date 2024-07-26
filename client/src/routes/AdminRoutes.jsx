import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/auth";
import AdminDashboard from "../pages/admin/AdminDashboard";
import MyProfile from "../pages/admin/MyProfile";
import UserCenter from "../pages/admin/UserCenter";
import ModeratorManagement from "../pages/admin/ModeratorManagement";
import PaymentDetails from "../components/admin/PaymentDetails";
import AdminResrvations from "../pages/admin/AdminReservations";

function AdminRoutes() {
  const { currentUser, loading } = useAuth();
  // console.log(currentUser);

  if (loading) {
    return <div>Loading...</div>; // Show a loading spinner or message
  }

  return (
    <Routes>
      <Route
        path="/"
        element={
          currentUser && currentUser.role === "admin" ? (
            <AdminDashboard />
          ) : (
            <Navigate to="/Unauthorized" />
          )
        }
      />
      <Route
        path="/myprofile"
        element={
          currentUser && currentUser.role === "admin" ? (
            <MyProfile />
          ) : (
            <Navigate to="/Unauthorized" />
          )
        }
      />

      <Route
        path="/UserCenter"
        element={
          currentUser && currentUser.role === "admin" ? (
            <UserCenter />
          ) : (
            <Navigate to="/Unauthorized" />
          )
        }
      />
      <Route
        path="/ManageModerators"
        element={
          currentUser && currentUser.role === "admin" ? (
            <ModeratorManagement />
          ) : (
            <Navigate to="/Unauthorized" />
          )
        }
      />
      <Route
        path="/Payments"
        element={
          currentUser && currentUser.role === "admin" ? (
            <PaymentDetails />
          ) : (
            <Navigate to="/Unauthorized" />
          )
        }
      />
      <Route
        path="/reservations"
        element={
          currentUser && currentUser.role === "admin" ? (
            <AdminResrvations />
          ) : (
            <Navigate to="/Unauthorized" />
          )
        }
      />
    </Routes>
  );
}

export default AdminRoutes;
