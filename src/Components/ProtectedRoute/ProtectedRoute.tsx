import React from 'react';
import { Route, Navigate } from 'react-router-dom';

interface ProtectedRouteProps {

  component: any
  isAuthorized: any
}

export default function ProtectedRoute({ component: Component, ...props  }: ProtectedRouteProps) {
  return (
    <div>
      {props.isAuthorized ? <Component {...props} /> : <Navigate to="/access" />}
    </div>
  )
}
