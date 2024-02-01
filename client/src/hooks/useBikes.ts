import { useEffect, useState } from "react";
import { Bike } from "types/Bike";
import { getAllBikes } from "utils/appApi";

export default function useBikes() {
  const [bikes, setBikes] = useState<any>([]);
  console.log(bikes);
  
  
  useEffect(() => {
    let ignore = false;
    getAllBikes()
      .then((res) => {
        if(!ignore) {
          setBikes(res)
        }
      })
      .catch((err) => console.log(err));

    return () => {
      ignore = true;
    };
  }, [])

  return [bikes, setBikes];
}