import { createContext } from "react";

interface AuthContextType {
  isLoggedIn: boolean | null
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean | null>>
  isConnectedToStrava: boolean | null
  setIsConnectedToStrava: React.Dispatch<React.SetStateAction<boolean | null>>
  signIn: (login: string, password: string) => void
  signUp: (login: string, password: string) => void
  logout: () => void
  checkPermissions: ()=> void
};
  

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);