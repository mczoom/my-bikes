import React from 'react';
import { Activity } from '../../models/Activity';

interface CalendarTileContentProps {
  dotClassName: () => string
  act: Activity
}

export default function CalendarTileContent({dotClassName, act}: CalendarTileContentProps) {
  return (
    <div className='tile-content'>
      <div className={dotClassName()}></div>
      <p className='tile-content__title'>{Math.round(act.distance / 1000)} км</p>
    </div>
  )
}
