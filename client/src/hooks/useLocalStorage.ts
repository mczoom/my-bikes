import { useEffect, useState } from "react";
import { getLocalStorageParsedValue, setLocalStorage } from "utils/service";


export default function useLocalStorage(key: string, initialValue: string ) {
  const [localState, setLocalState] = useState(() => {
    const currentLocalValue = getLocalStorageParsedValue(key);
    return currentLocalValue !== null ? currentLocalValue : initialValue;
  });
  
  
  useEffect(() => {    
    setLocalStorage(key, localState)
  }, [key, localState])

  return [localState, setLocalState];
}