import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { getActivities, getCurrentAthlete, getAthlete } from '../../utils/stravaApi';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { Profile } from '../../models/Profile';

export default function Stats() {

  const currentUser = React.useContext<Profile>(CurrentUserContext);

  const [allRidesTotals, setAllRidesTotals] = useState<string>('')
  console.log(allRidesTotals);

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

  function getUser() {
    getAthlete(currentUser.id)
      .then((res) => setAllRidesTotals(res.all_ride_totals))
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    getUser();
  }, []);




  return (
    <section>
      {/* <button type='button' onClick={getTrainings}>Get trainings</button>
      <button type='button' onClick={getUser}>Get user</button> */}
      <p>Количество тренировок за всё время:</p>
      <p>Пройдено км за всё время: {allRidesTotals}</p>
      <p>Количество тренировок за год:</p>
      <p>Пройдено км за год:</p>
    </section>
  )
}
