import React from 'react';
import { Routes, Route } from 'react-router-dom';
import RaiseComplaintPage from '../pages/tenant/RaiseComplaintPage'
import NotFoundPage from '../pages/common/NotFoundPage';


function TenantRoutes() {
  return (
    <Routes>
      <Route path="/raisecomplaint" element={<RaiseComplaintPage />} />
      <Route path="/*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default TenantRoutes;