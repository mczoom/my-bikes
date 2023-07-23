import React, { useState } from 'react';
import { Route, Navigate, Outlet } from 'react-router-dom';

interface ProtectedRouteProps {
  
  hasAccess: boolean
}

export default function ProtectedRoute({hasAccess}: ProtectedRouteProps) {
  
  const isConnected = () => localStorage.getItem('isStravaConnected');
  const isLogged = () => localStorage.getItem('logged');
  
  
  return (
    <div>
      {hasAccess 
        ? <Outlet /> 
        : isLogged() 
          ? <Navigate to="/access" /> 
          : <Navigate to="/login" />}
    </div>
  )
}
