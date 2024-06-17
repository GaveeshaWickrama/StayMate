import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from '../components/auth/Login';
// import Signup from '../components/auth/Signup';
import NotFoundPage from '../pages/common/NotFoundPage';
import VerifyOtp from '../components/auth/VerifyOtp';
import GuestSignup from '../components/auth/GuestSignup';
import HostSignup from '../components/auth/HostSignup';
import TechnicianSignup from '../components/auth/TechnicianSignup';

function PublicRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/verify-otp" element={<VerifyOtp />} />
      <Route path="/signup/guest" element={<GuestSignup />} />
      <Route path="/signup/host" element={<HostSignup />} />
      <Route path="/signup/technician" element={<TechnicianSignup />} />
      <Route path="/*" element={<NotFoundPage />} />
     
    </Routes>
  );
}

export default PublicRoutes;