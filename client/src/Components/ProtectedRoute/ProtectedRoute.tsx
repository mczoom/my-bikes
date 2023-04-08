import React from 'react';
import { Route, Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  element: any
  loggedIn: boolean | null
}

export default function ProtectedRoute({ element: Component, ...props  }: any) {

  return (
    <div>
      {props.loggedIn ? <Component {...props} /> : <Navigate to="/login" />}
    </div>
  )
}
