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
import HostReviews from  "../pages/host/HostReviews";

function HostRoutes() {
  const { currentUser, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>; // Show a loading spinner or message
  }

  return (
    <PropertyProvider>
      <Routes>
        <Route
          path="/property-details/:id"
          element={
            currentUser && currentUser.role === "host" ? (
              <PropertyDetails />
            ) : (
              <Navigate to="/Unauthorized" />
            )
          }
        />
        <Route
          path="/"
          element={
            currentUser && currentUser.role === "host" ? (
              <HostPage />
            ) : (
              <Navigate to="/Unauthorized" />
            )
          }
        />
        <Route
          path="/listings"
          element={
            currentUser && currentUser.role === "host" ? (
              <HostListings />
            ) : (
              <Navigate to="/Unauthorized" />
            )
          }
        />

<Route
          path="/HostReviews"
          element={
            currentUser && currentUser.role === "host" ? (
              <HostReviews />
            ) : (
              <Navigate to="/Unauthorized" />
            )
          }
        />

        <Route
          path="/add-property"
          element={
            currentUser && currentUser.role === "host" ? (
              <AddProperty />
            ) : (
              <Navigate to="/Unauthorized" />
            )
          }
        />
        <Route
          path="/add-section"
          element={
            currentUser && currentUser.role === "host" ? (
              <AddSection />
            ) : (
              <Navigate to="/Unauthorized" />
            )
          }
        />
        <Route
          path="/add-location"
          element={
            currentUser && currentUser.role === "host" ? (
              <AddLocation />
            ) : (
              <Navigate to="/Unauthorized" />
            )
          }
        />
        <Route
          path="/reservations"
          element={
            currentUser && currentUser.role === "host" ? (
              <HostReservation />
            ) : (
              <Navigate to="/Unauthorized" />
            )
          }
        />
       <Route
          path="/view-complaints"
          element={
            currentUser && currentUser.role === "host" ? (
              <ManageComplaints/>
            ) : (
              <Navigate to="/Unauthorized" />
            )
          }
          />
       <Route
          path="/complaint-details/:id"
          element={
            currentUser && currentUser.role === "host" ? (
              <ComplaintDetails/>
            ) : (
              <Navigate to="/Unauthorized" />
            )
          }
          />
       <Route
          path="/view-technicians"
          element={
            currentUser && currentUser.role === "host" ? (
              <TechnicianExplore/>
            ) : (
              <Navigate to="/Unauthorized" />
            )
          }
          />
       <Route
          path="/technician-details/:id"
          element={
            currentUser && currentUser.role === "host" ? (
              <TechnicianDetails/>
            ) : (
              <Navigate to="/Unauthorized" />
            )
          }
          />
       <Route
          path="/manage-complaints/"
          element={
            currentUser && currentUser.role === "host" ? (
              <ComplaintsManage/>
            ) : (
              <Navigate to="/Unauthorized" />
            )
          }
          />
      </Routes>
    </PropertyProvider>
  );
}

export default HostRoutes;
