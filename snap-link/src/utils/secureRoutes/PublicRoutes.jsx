import React from 'react';
import { Navigate, Outlet } from 'react-router';

function PublicRoutes({ isAuthenticated }) {
  if (isAuthenticated) return <Navigate to="/" replace />;
  return <Outlet />;
}

export default PublicRoutes;
