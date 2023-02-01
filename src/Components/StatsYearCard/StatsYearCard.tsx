import React, { useState } from 'react';
import { Activity } from '../../models/Activity';


interface StatsYearCardProps {
  year: number
  allActivities: Activity[]
  totalDistance: (y: number) => number
  totalTime: (y: number) => number
  totalTrainings: (y: number) => number
  yearLongesDistance: (y: number) => number
}


export default function StatsYearCard({year, allActivities, totalDistance, totalTime, totalTrainings, yearLongesDistance}: StatsYearCardProps) {

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isStatsShown, setIsStatsShown] = useState<boolean>(false);

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
            <p className='stats__text'>Самая длинная поездка: {yearLongesDistance(year)} км</p>
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
