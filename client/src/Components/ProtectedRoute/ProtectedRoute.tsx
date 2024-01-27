import { Navigate, Outlet } from 'react-router-dom';
import useAuth from 'hooks/useAuth';
import { useState } from 'react';


export default function ProtectedRoute() {

  const auth = useAuth();  
  const hasAccess = auth.isConnectedToStrava;
  const isLoggedIn = auth.isLoggedIn; 
 
  console.log(hasAccess); 
     
  return (
    <div>
      {hasAccess 
        ? <Outlet /> 
        : isLoggedIn 
          ? <Navigate to="/access" /> 
          : <Navigate to="/login" />}
    </div>
  )
}
