import React, { useState } from 'react';
import { Activity } from '../../models/Activity';


interface StatsYearCardProps {
  year: number
  allActivities: Activity[]
  totalDistance: (y: number) => number
  totalTime: (y: number) => number
  totalTrainings: (y: number) => number
  yearLongestDistance: (y: number) => number
  totalOverHundredRides: (y: number) => number
}


export default function StatsYearCard({year, allActivities, totalDistance, totalTime, totalTrainings, yearLongestDistance, totalOverHundredRides}: StatsYearCardProps) {

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isStatsShown, setIsStatsShown] = useState<boolean>(false);

  const dashboardClassName = `stats_dashboard ${isStatsShown ? 'stats_dashboard_on' : ''}`;
  const emptyDashboardClassName = `stats_dashboard stats_dashboard_empty ${isStatsShown ? 'stats_dashboard_on' : ''}`;

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
          <ul className={dashboardClassName}>
            <li className='stats__text'>Общая дистанция
            <div className='stats__text__wrapper'>
              <span className='stats__text_bold'>{totalDistance(year)}</span> км
            </div>
            </li>
            <li className='stats__text'>Тренировок
            <div className='stats__text__wrapper'>
              <span className='stats__text_bold'>{totalTrainings(year)}</span>
            </div>
            </li>
            <li className='stats__text'>Общее время
            <div className='stats__text__wrapper'>
              <span className='stats__text_bold'>{totalTime(year)}</span> ч
            </div>
            </li>
            <li className='stats__text'>Самая длинная поездка
            <div className='stats__text__wrapper'>
              <span className='stats__text_bold'>{yearLongestDistance(year)}</span> км
            </div>
            </li>
            <li className='stats__text'>Поездок 100+ км
            <div className='stats__text__wrapper'>
              <span className='stats__text_bold'>{totalOverHundredRides(year)}</span>
            </div>
            </li>
          </ul>
        ) : (
          <div className={emptyDashboardClassName}>
            <p className='stats__text'>Тренировки не найдены</p>
          </div>
        )
        }
      </div>
    </div>
  )
}
