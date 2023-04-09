import React from 'react';
import { Route, Navigate, Outlet } from 'react-router-dom';

interface ProtectedRouteProps {
  
  loggedIn: boolean | null
}

export default function ProtectedRoute({loggedIn}: ProtectedRouteProps) {
  
  const isLogged = localStorage.getItem('logged');

  return (
    <div>
      {isLogged ? <Outlet /> : <Navigate to="/login" />}
    </div>
  )
}
