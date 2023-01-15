import React, { useState } from 'react';
import { Ride } from '../../models/Ride';
import { getActivities } from '../../utils/stravaApi';
import { Preloader } from '../Preloader/Preloader';


interface StatsYearCardProps {
  year: number
}


export default function StatsYearCard({year}: StatsYearCardProps) {

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [activities, setActivities] = useState<Ride[]>([]);
  const [isStatsShown, setIsStatsShown] = useState<boolean>(false);

  const fromDate: number = Date.parse(year.toString()) / 1000;
  const tillDate: number = Date.parse((year + 1).toString()) / 1000 - 1;

  const dashboardClassName = `stats_dashboard ${isStatsShown ? 'stats_dashboard_on' : ''}`
  const yearStatsButtonText = isStatsShown ? 'скрыть' : 'показать статистику';
  const openerIconClassName = isStatsShown ? 'stats__opener-icon_hide' : 'stats__opener-icon_show';

  function showTotalDistance(): number {
    let odo = 0;
    activities.forEach((training) => {
      odo += Math.round(training.distance / 1000);
    })
    return odo;
  }

  function showTotalTime(): number {
    let odo = 0;
    activities.forEach((training) => {
      odo += Math.round(training.elapsed_time / 3600);
    })
    return odo;
  }



  function toggleYearStatsDisplay() {
    if(!isStatsShown && activities.length === 0) {
      setIsLoading(true);
      getActivities({fromDate, tillDate})
      .then((res) => setActivities(res))
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
      setIsStatsShown(true);
    }else if(!isStatsShown && activities.length > 0) {
      setIsStatsShown(true);
    }else {
      setIsStatsShown(false);
    }
  }

  console.log(activities);


  return (
    <div className='year-card'>
      <Preloader isLoading={isLoading} />
      <h2 className='year-card__header'>{year} год</h2>
      <div className='year_card__stats'>
        <div className='stats__wrapper' onClick={toggleYearStatsDisplay}>
          <button type='button' className='stats__opener'>{yearStatsButtonText}</button>
          <div className={openerIconClassName}></div>
        </div>
        {activities.length > 0 ? (
        <div className={dashboardClassName}>
          <p className='stats__text'>Количество тренировок: {activities.length}</p>
          <p className='stats__text'>Пройденая дистанция: {showTotalDistance()} км</p>
          <p className='stats__text'>Общее время поездок: {showTotalTime()} ч</p>
        </div>
        ) : (
        <div className={dashboardClassName}>
          <p>Тренировки не найдены</p>
        </div>
        )
        }
      </div>
    </div>
  )
}
