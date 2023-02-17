import React from 'react';
import { Route, Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  element: any
  isAuthorized: string | null
}

export default function ProtectedRoute({ element: Component, ...props  }: any) {

  return (
    <div>
      {props.isAuthorized() ? <Component {...props} /> : <Navigate to="/access" />}
    </div>
  )
}
