import React from 'react';
import { Routes, Route } from 'react-router-dom';
import NotFoundPage from '../pages/common/NotFoundPage';
// import VerifyOtp from '../components/auth/VerifyOtp';
// import GuestSignup from '../components/auth/GuestSignup';
// import HostSignup from '../components/auth/HostSignup';
import TechnicianSignup from '../components/auth/TechnicianSignup';
import Login from '../pages/auth/Login';
import GuestSignup from '../pages/auth/GuestSignup';
import HostSignup from '../pages/auth/HostSignup';
import VerifyOtp from '../pages/auth/VerifyOtp';
// import Test from '../pages/auth/test';
import ViewReviews from '../pages/host/ViewReviews';

function PublicRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/verify-otp" element={<VerifyOtp />} />
      <Route path="/signup/guest" element={<GuestSignup />} />
      <Route path="/signup/host" element={<HostSignup />} />
      <Route path="/signup/technician" element={<TechnicianSignup />} />
      {/* <Route path="/test" element={<Test />} /> */}
      <Route path="/*" element={<NotFoundPage />} />
      <Route path="/view-reviews" element={currentUser && currentUser.role === 'host' ? <ViewReviews /> : <Navigate to="/Unauthorized" />} />
     
    </Routes>
  );
}

export default PublicRoutes;