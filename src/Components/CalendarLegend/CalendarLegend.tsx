import React from 'react'
import CalendarTileContent from '../CalendarTileContent/CalendarTileContent'

export default function CalendarLegend() {

  return (
    <ul className='calendar-legend'>
      <li className='calendar-legend__item'>
        <div className='calendar-legend__dot tile-content__dot_outdoor-ride '></div>
        <p className='legend-name'>Велозаезд</p>
      </li>
      <li className='calendar-legend__item'>
        <div className='calendar-legend__dot tile-content__dot_indoor-ride'></div>
        <p className='legend-name'>Велостанок</p>
      </li>
      <li className='calendar-legend__item'>
        <div className='calendar-legend__dot tile-content__dot_other-activity'></div>
        <p className='legend-name'>Другой спорт</p>
      </li>
    </ul>
  )
}
