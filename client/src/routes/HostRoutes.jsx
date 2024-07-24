import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/auth";
import { PropertyProvider } from "../context/PropertyContext";

import HostPage from "../pages/host/HostPage";
import HostListings from "../pages/host/HostListings";
import AddProperty from "../pages/host/AddProperty";
import AddSection from "../pages/host/AddSection";
import AddLocation from "../pages/host/AddLocation";
import PropertyDetails from "../pages/common/PropertyDetails";
import HostReservation from "../pages/host/hostReservations";
import ManageComplaints from "../pages/host/ManageComplaints";
import ComplaintDetails from "../pages/host/ComplaintDetails";
import TechnicianExplore from "../pages/technician/ExploreTechnicians";
import TechnicianDetails from "../pages/technician/TechnicianDetails";
import ComplaintsManage from "../pages/host/ComplaintsManage";
import HostReviews from "../pages/host/hostReviews";

function HostRoutes() {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // Show a loading spinner or message
  }

  const isHost = currentUser && currentUser.role === "host";

  return (
    <PropertyProvider>
      <Routes>
        <Route
          path="/property-details/:id"
          element={
            isHost ? <PropertyDetails /> : <Navigate to="/Unauthorized" />
          }
        />
        <Route
          path="/"
          element={isHost ? <HostPage /> : <Navigate to="/Unauthorized" />}
        />
        <Route
          path="/listings"
          element={isHost ? <HostListings /> : <Navigate to="/Unauthorized" />}
        />
        <Route
          path="/add-property"
          element={isHost ? <AddProperty /> : <Navigate to="/Unauthorized" />}
        />
        <Route
          path="/add-section"
          element={isHost ? <AddSection /> : <Navigate to="/Unauthorized" />}
        />
        <Route
          path="/add-location"
          element={isHost ? <AddLocation /> : <Navigate to="/Unauthorized" />}
        />
        <Route
          path="/reservations"
          element={
            isHost ? <HostReservation /> : <Navigate to="/Unauthorized" />
          }
        />
        <Route
          path="/view-complaints"
          element={
            isHost ? <ManageComplaints /> : <Navigate to="/Unauthorized" />
          }
        />
        <Route
          path="/complaint-details/:id"
          element={
            isHost ? <ComplaintDetails /> : <Navigate to="/Unauthorized" />
          }
        />
        <Route
          path="/view-technicians"
          element={
            isHost ? <TechnicianExplore /> : <Navigate to="/Unauthorized" />
          }
        />
        <Route
          path="/technician-details/:id"
          element={
            isHost ? <TechnicianDetails /> : <Navigate to="/Unauthorized" />
          }
        />
        <Route
          path="/manage-complaints"
          element={
            isHost ? <ComplaintsManage /> : <Navigate to="/Unauthorized" />
          }
        />
        <Route
          path="/viewReviews"
          element={isHost ? <HostReviews /> : <Navigate to="/Unauthorized" />}
        />
      </Routes>
    </PropertyProvider>
  );
}

export default HostRoutes;
