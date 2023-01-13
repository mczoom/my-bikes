import React, { useState } from 'react';
import { Activities } from '../../models/Activities';
import { Ride } from '../../models/Ride';
import { getActivities } from '../../utils/stravaApi';
import { Preloader } from '../Preloader/Preloader';


interface StatsYearCardProps {
  year: number
}


export default function StatsYearCard({year}: StatsYearCardProps) {

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [activities, setActivities] = useState<Ride[]>([]);

  const fromDate: number = Date.parse(year.toString()) / 1000;
  const tillDate: number = Date.parse((year + 1).toString()) / 1000 - 1;

const distance = () => {
  let odo = 0;
  activities.forEach((training) => {
    odo += Math.round(training.distance / 1000);
  })
  return odo;
}
console.log(distance);


  function showYearStats() {
    setIsLoading(true);
    getActivities(fromDate, tillDate)
    .then((res) => setActivities(res))
    .catch((err) => console.log(err))
    .finally(() => setIsLoading(false))
  }

  console.log(activities);


  return (
    <div className='year-card'>
      <Preloader isLoading={isLoading} />
      <h2 className='year-card__year'>{year} год</h2>
      <button type='button' className='year-card__opener' onClick={showYearStats}>показать статистику</button>
      <p>Количество тренировок: {activities.length}</p>
      <p>Пройдено километров: {distance()} км</p>
      <p>Общее время поездок:</p>
    </div>
  )
}
