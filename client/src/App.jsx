import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Header from './components/common/Header';
import PublicRoutes from './routes/PublicRoutes';
import AdminRoutes from './routes/AdminRoutes';
import ModeratorRoutes from './routes/ModeratorRoutes';
import GuestRoutes from './routes/GuestRoutes';
import HostRoutes from './routes/HostRoutes';
import TechnicianRoutes from './routes/TechnicianRoutes';
import UserRoutes from './routes/UserRoutes';
import HomePage from './pages/common/HomePage';
import NotFoundPage from './pages/common/NotFoundPage';
import Unauthorized from './pages/common/Unauthorized';



function App() {
  const [isNavbarVisible, setNavbarVisible] = useState(false);

  const toggleNavbar = () => {
    setNavbarVisible(!isNavbarVisible);
  };

  return (
    <div className="flex flex-col h-full">
      <Header toggleNavbar={toggleNavbar} />
      <div className={`flex-grow flex ${isNavbarVisible ? 'ml-0' : ''}`}>
        <Navbar isVisible={isNavbarVisible} />
        <div className={`main-content flex-grow  ${isNavbarVisible ? 'ml-64' : ''}`} style={{ marginTop: '5rem' } } >
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/admin/*" element={<AdminRoutes />} />
            <Route path="/moderator/*" element={<ModeratorRoutes />} />
            <Route path="/user/*" element={<GuestRoutes />} />
            <Route path="/host/*" element={<HostRoutes />} />
            <Route path="/technician/*" element={<TechnicianRoutes />} />
            <Route path="/*" element={<PublicRoutes />} />
            <Route path="*" element={<NotFoundPage />} />
            <Route path="/Unauthorized" element={<Unauthorized />} />
            {/* to every user */}
            <Route path="/users/*" element={<UserRoutes />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
