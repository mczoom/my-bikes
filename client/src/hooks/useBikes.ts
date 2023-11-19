import { useEffect, useState } from "react";
import { Bike } from "types/Bike";
import { getAllBikes } from "utils/appApi";

export default function useBike() {
  const [bikes, setBikes] = useState<Bike[]>([]);
  
  function getSavedBikes() {
    getAllBikes()
      .then((res) => setBikes(res))
      .catch((err) => console.log(err))  
  }

  useEffect(() => {
    getSavedBikes()
  }, [])

  return bikes;
}