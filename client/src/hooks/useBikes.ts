import { useEffect, useState } from "react";
import { Bike } from "types/Bike";
import { Profile } from "types/Profile";
import { getAllBikes } from "utils/appApi";

export default function useBikes(userBikes: Bike[]) {
  const [bikes, setBikes] = useState<Bike[]>([]);
  
 async function getSavedBikes() {
   await getAllBikes()
      .then((res) => setBikes(res))
      .catch((err) => console.log(err))  
  };
  const strToken = localStorage.getItem('stravaToken');

  useEffect(() => {
    getSavedBikes()
  }, [userBikes])

  console.log(bikes);
  

  return bikes;
}