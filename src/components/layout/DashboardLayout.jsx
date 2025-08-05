import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';

const DashboardLayout = () => {
  const { currentUser } = useAuth();

  // Redirect to login if not authenticated
  if (!currentUser) {
    return <Navigate to="/auth/login" />;
  }

  // This layout just handles authentication
  // The actual portal layouts are handled by individual dashboard components
  return <Outlet />;
};

export default DashboardLayout;