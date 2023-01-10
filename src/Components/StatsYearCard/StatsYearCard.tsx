import React from 'react';


interface StatsYearCardProps {
  year: number
}


export default function StatsYearCard({year}: StatsYearCardProps) {
  return (
    <div className='year-card'>
      <h2 className='year-card__year'>{year} год</h2>
      <p>показать статистику</p>
      {/* <p>Количество тренировок:</p>
      <p>Пройдено километров:</p>
      <p>Общее время поездок:</p> */}
    </div>
  )
}
