import { createContext } from "react";

interface AuthContextType {
  appToken: string  
  stravaToken: string 
  setStravaToken: React.Dispatch<string>
  signIn: (login: string, password: string) => void
  signUp: (login: string, password: string) => void
  logout: () => void
  checkPermissions?: ()=> void
};
  

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);