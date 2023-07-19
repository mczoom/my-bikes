import React from 'react';
import { Route, Navigate, Outlet } from 'react-router-dom';

interface ProtectedRouteProps {
  
  hasAccess: () => string | null
}

export default function ProtectedRoute({hasAccess}: ProtectedRouteProps) {
  
  return (
    <div>
      {hasAccess() ? <Outlet /> : <Navigate to="/login" />}
    </div>
  )
}
