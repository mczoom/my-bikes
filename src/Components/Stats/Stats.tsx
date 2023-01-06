import React, {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { getActivities, getAthlete } from '../../utils/stravaApi';

export default function Stats() {

  // function getTrainings() {
  //   getActivities()
  //     .then((res) => console.log(res))
  //     .catch((err) => console.log(err));
  // }

  // function getUser() {
  //   getAthlete()
  //     .then((res) => console.log(res))
  //     .catch((err) => console.log(err));
  // }




  return (
    <section>
      {/* <button type='button' onClick={getTrainings}>Get trainings</button>
      <button type='button' onClick={getUser}>Get user</button> */}
      <p>Количество тренировок за всё время:</p>
      <p>Пройдено км за всё время:</p>
      <p>Количество тренировок за год:</p>
      <p>Пройдено км за год:</p>
    </section>
  )
}
