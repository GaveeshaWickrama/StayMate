import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/common/Navbar';

import PublicRoutes from './routes/PublicRoutes';
import AdminRoutes from './routes/AdminRoutes';
import GuestRoutes from './routes/GuestRoutes';
import HostRoutes from './routes/HostRoutes';
import TenantRoutes from './routes/TenantRoutes';

import HomePage from './pages/common/HomePage';
import NotFoundPage from './pages/common/NotFoundPage';
import Unauthorized from './pages/common/Unauthorized';

function App() {
  return (
    <div id="stuff">
      <Navbar />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/admin/*" element={<AdminRoutes />} />
          <Route path="/user/*" element={<GuestRoutes />} />
          <Route path="/host/*" element={<HostRoutes />} />
          <Route path="/*" element={<PublicRoutes />} />
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/tenant/*" element={<TenantRoutes />} /> 
          <Route path="/Unauthorized" element={<Unauthorized />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
