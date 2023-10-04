import { useState } from "react";
import { SnackbarContext } from "./SnackbarContext";
import { snackbarTime } from "utils/constants";
import { ErrorAPI } from "types/ErrorAPI";

interface SnackbarProviderProps {
  children: React.ReactNode
}
  
export function SnackbarProvider({ children }: SnackbarProviderProps) {

  const [messages, setMessages] = useState<string[]>([]);
  const time = snackbarTime;
  
  function clearMessages() {   
    setMessages([]);   
  };
  
  function addMessage(newMessage: string) {
    setMessages([...messages, newMessage]);   
    setTimeout(clearMessages, time);   
  };

  function handleSnackbarError(err: ErrorAPI) {
    if(!err.status) {
      addMessage(`Ошибка: ${err}`);      
    }else{
      addMessage(`Ошибка ${err.status}: ${err.message}`);
    }
    
    console.log(err);
  }

  const snackbarData = {messages, addMessage, handleSnackbarError}

  return <SnackbarContext.Provider value={snackbarData}>{children}</SnackbarContext.Provider>;
}