import React, { useState } from 'react';
import { Activity } from '../../models/Activity';
import { Ride } from '../../models/Ride';
import { getActivities } from '../../utils/stravaApi';
import { Preloader } from '../Preloader/Preloader';


interface StatsYearCardProps {
  year: number
  allActivities: Activity[]
  totalDistance: (y: number) => number
  totalTime: (y: number) => number
  totalTrainings: (y: number) => number
}


export default function StatsYearCard({year, allActivities, totalDistance, totalTime, totalTrainings}: StatsYearCardProps) {

  const [isLoading, setIsLoading] = useState<boolean>(false);
  // const [activities, setActivities] = useState<Ride[]>([]);

  const [isStatsShown, setIsStatsShown] = useState<boolean>(false);


  // const fromDate: number = Date.parse(year.toString()) / 1000;
  // const tillDate: number = Date.parse((year + 1).toString()) / 1000 - 1;

  const dashboardClassName = `stats_dashboard ${isStatsShown ? 'stats_dashboard_on' : ''}`;
  const openerIconClassName = isStatsShown ? 'stats__opener-icon_hide' : 'stats__opener-icon_show';
  const yearStatsButtonText = isStatsShown ? 'скрыть' : 'показать статистику';



  function toggleYearStatsDisplay() {
      setIsStatsShown(v => !v);
  }




  return (
    <div className='year-card'>
      {/* <Preloader isLoading={isLoading} /> */}
      <h2 className='year-card__header'>{year} год</h2>
      <div className='year_card__stats'>
        <div className='stats__wrapper' onClick={toggleYearStatsDisplay}>
          <p className='stats__opener-text'>{yearStatsButtonText}</p>
          <div className={openerIconClassName}></div>
        </div>
        {totalTrainings(year) > 0 ? (
          <div className={dashboardClassName}>
            <p className='stats__text'>Количество тренировок: {totalTrainings(year)}</p>
            <p className='stats__text'>Пройденая дистанция: {totalDistance(year)} км</p>
            <p className='stats__text'>Общее время поездок: {totalTime(year)} ч</p>
          </div>
        ) : (
          <div className={dashboardClassName}>
            <p className='stats__text'>Тренировки не найдены</p>
          </div>
        )
        }
      </div>
    </div>
  )
}
