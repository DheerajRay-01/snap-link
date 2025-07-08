import React from 'react';
import { Navigate, Outlet } from 'react-router';

function ProtectedRoutes({ isAuthenticated }) {
  console.log("isAuthenticated",isAuthenticated);
  
  if (!isAuthenticated) return <Navigate to="/intro" replace />;
  return <Outlet />;
}

export default ProtectedRoutes;
