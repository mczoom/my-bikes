import { useEffect, useState } from "react";
import { Bike } from "types/Bike";
import { getAllBikes } from "utils/appApi";

export default function useBikes(isUpdated?: boolean) {
  const [bikes, setBikes] = useState<Bike[]>([]);
  
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
  }, [isUpdated])

  return bikes;
}