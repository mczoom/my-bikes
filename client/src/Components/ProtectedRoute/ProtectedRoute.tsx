import { Navigate, Outlet } from 'react-router-dom';
import useAuth from 'hooks/useAuth';


export default function ProtectedRoute() {

  const auth = useAuth();
  const isConnected = auth.isConnectedToStrava;
  const isLogged = auth.isLoggedIn; 
 
     
  return (
    <div>
      {isConnected 
        ? <Outlet /> 
        : isLogged 
          ? <Navigate to="/access" /> 
          : <Navigate to="/login" />}
    </div>
  )
}
