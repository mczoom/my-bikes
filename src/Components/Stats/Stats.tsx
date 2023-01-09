import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { getActivities, getCurrentAthlete, getAthlete } from '../../utils/stravaApi';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { Profile } from '../../models/Profile';
import { AthleteStats } from '../../models/AthleteStats';
import { Preloader } from '../Preloader/Preloader';


interface StatsProps {
  registrationYear: number
}

export default function Stats({registrationYear}: StatsProps) {

  const currentUser = React.useContext<Profile>(CurrentUserContext);

  const [allRidesTotals, setAllRidesTotals] = useState<AthleteStats>({} as AthleteStats);
  const [allYTDRidesTotals, setAllYTDRidesTotals] = useState<AthleteStats>({} as AthleteStats)
  const [isLoading, setIsLoading] = useState<boolean>(false);
  console.log(allRidesTotals);
  console.log(currentUser)


  const allRidesDistance: number = allRidesTotals.distance / 1000;
  const yTDRidesDistance: number = allYTDRidesTotals.distance / 1000;
  // function getTrainings() {
  //   getActivities()
  //     .then((res) => console.log(res))
  //     .catch((err) => console.log(err));
  // }

  // function getCurrentUser() {
  //   getAthlete()
  //     .then((res) => console.log(res))
  //     .catch((err) => console.log(err));
  // }

  function getUserStats(user: Profile) {
    setIsLoading(true);
    getAthlete(user.id)
      .then((res) => {
        setAllRidesTotals((res.all_ride_totals));
        setAllYTDRidesTotals(res.ytd_ride_totals);
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    if(currentUser.id) {
      getUserStats(currentUser)
    };
  }, [currentUser]);




  return (
    <section className='stats'>
      <Preloader isLoading={isLoading} />
      {allRidesTotals.distance && allYTDRidesTotals.distance &&
      <ul>
        <li><p>Количество тренировок за всё время: <span className='stats__text_bold'>{allRidesTotals.count}</span></p></li>
        <li><p>Пройдено км за всё время: <span className='stats__text_bold'>{allRidesDistance ? Math.round(allRidesDistance) : ''}</span> км</p></li>
        <li><p>Количество тренировок в этом году: <span className='stats__text_bold'>{allYTDRidesTotals.count}</span></p></li>
        <li><p>Пройдено км в этом году: <span className='stats__text_bold'>{yTDRidesDistance ? Math.round(yTDRidesDistance) : ''}</span> км</p></li>
      </ul>
      }
      <select>
        <option>A</option>
        <option>S</option>
        <option>D</option>
      </select>
    </section>

  )
}
