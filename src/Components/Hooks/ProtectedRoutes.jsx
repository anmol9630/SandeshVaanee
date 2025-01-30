import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
    
const ProtectedRoutes = ({ user }) => {
  return user ? <Outlet /> : <Navigate to="/profile" />;
};

export default ProtectedRoutes;
