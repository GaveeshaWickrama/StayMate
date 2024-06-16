import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import PublicRoutes from './routes/PublicRoutes';
import AdminRoutes from './routes/AdminRoutes';
import UserRoutes from './routes/UserRoutes';
import HomePage from './pages/common/HomePage';
import NotFoundPage from './pages/common/NotFoundPage';
import Unauthorized from './pages/common/Unauthorized';

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/admin/*" element={<AdminRoutes />} />
        <Route path="/user/*" element={<UserRoutes />} />
        <Route path="/*" element={<PublicRoutes />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/Unauthorized" element={<Unauthorized />} />
      </Routes>
    </div>
  );
}

export default App;