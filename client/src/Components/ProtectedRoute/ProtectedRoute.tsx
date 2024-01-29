import { Navigate, Outlet } from 'react-router-dom';

interface ProtectedRouteProps {
  isLoggedIn: string
  isStravaConnected: string
}

export default function ProtectedRoute({isLoggedIn, isStravaConnected}: ProtectedRouteProps) {

  return (
    <div>
      {isStravaConnected 
        ? <Outlet /> 
        : isLoggedIn 
          ? <Navigate to="/access" /> 
          : <Navigate to="/login" />}
    </div>
  )
}
