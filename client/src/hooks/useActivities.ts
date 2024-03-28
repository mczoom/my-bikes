import { useEffect, useState } from 'react';
import { Activity } from 'types/Activity';
import { getAllActivities } from 'utils/appApi';

export default function useActivities() {
  const [trainings, setTrainings] = useState<any>([]);

  useEffect(() => {
    let ignore = false;
    getAllActivities()
      .then((res: Activity[]) => {
        if (!ignore) {
          if (res.length > 0) {
            setTrainings(res);
          }
          return;
        }
      })
      .catch((err) => console.log(err));

    return () => {
      ignore = true;
    };
  }, []);

  return [trainings, setTrainings];
}
