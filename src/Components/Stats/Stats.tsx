import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { getActivities, getCurrentAthlete, getAthlete } from '../../utils/stravaApi';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { Profile } from '../../models/Profile';
import { AthleteStats } from '../../models/AthleteStats';

export default function Stats() {

  const currentUser = React.useContext<Profile>(CurrentUserContext);

  const [allRidesTotals, setAllRidesTotals] = useState<AthleteStats>({} as AthleteStats);
  const [allYTDRidesTotals, setAllYTDRidesTotals] = useState<AthleteStats>({} as AthleteStats)
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
    getAthlete(user.id)
      .then((res) => {
        setAllRidesTotals((res.all_ride_totals));
        setAllYTDRidesTotals(res.ytd_ride_totals);
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    if(currentUser.id) {
      getUserStats(currentUser)
    };
  }, [currentUser]);




  return (
    <section className='stats'>
      {/* <button type='button' onClick={getTrainings}>Get trainings</button>
      <button type='button' onClick={getUser}>Get user</button> */}
      <p>Количество тренировок за всё время: <span className='stats__text_bold'>{allRidesTotals.count}</span></p>
      <p>Пройдено км за всё время: <span className='stats__text_bold'>{allRidesDistance ? Math.floor(allRidesDistance) : ''}</span> км</p>
      <p>Количество тренировок за год: <span className='stats__text_bold'>{allYTDRidesTotals.count}</span></p>
      <p>Пройдено км за год: <span className='stats__text_bold'>{yTDRidesDistance ? Math.floor(yTDRidesDistance) : ''}</span> км</p>
    </section>
  )
}
