import React from 'react';
import { Route, Navigate, Outlet } from 'react-router-dom';

interface ProtectedRouteProps {
  
  hasAccess: boolean | string | null
}

export default function ProtectedRoute({hasAccess}: ProtectedRouteProps) {
  
  return (
    <div>
      {hasAccess ? <Outlet /> : <Navigate to="/access" />}
    </div>
  )
}
