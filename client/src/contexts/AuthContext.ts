import { createContext } from "react";

interface AuthContextType {
  isLoggedIn: boolean  
  isConnectedToStrava: boolean | null 
  signIn: (login: string, password: string) => void
  signUp: (login: string, password: string) => void
  logout: () => void
  checkPermissions: ()=> void
};
  

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);