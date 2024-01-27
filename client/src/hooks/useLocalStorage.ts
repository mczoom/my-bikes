import { useEffect, useState } from "react";

interface useLocalStorageProps {
  initialValue: string
  key: string 
}

export default function useLocalStorage({initialValue, key}: useLocalStorageProps ) {
  const [localState, setLocalState] = useState(() => {
    const currentLocalValue = localStorage.getItem(key);
    return currentLocalValue !== null ? JSON.parse(currentLocalValue) : initialValue;
  });
  
  useEffect(() => {    
    localStorage.setItem(key, JSON.stringify(localState))
  }, [key, localState])

  return [localState, setLocalState];
}