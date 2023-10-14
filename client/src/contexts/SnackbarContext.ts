import { createContext } from "react";
import { ErrorAPI } from "types/ErrorAPI";


export interface SnackbarContextType {
  messages: string[]
  addMessage: (newMessage: string) => void
  handleSnackbarError: (err: ErrorAPI | string) => void 
}

export const SnackbarContext = createContext<SnackbarContextType>({} as SnackbarContextType);