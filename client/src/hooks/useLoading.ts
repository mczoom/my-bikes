import { useEffect, useState } from "react";


export default function useLoading() {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  
  

  return [isLoading, setIsLoading];
}