import React from 'react';
import { Activity } from '../../models/Activity';

interface CalendarTileContentProps {
  dotClassName: () => string
  activity: Activity
}

export default function CalendarTileContent({dotClassName, activity}: CalendarTileContentProps) {
  return (
    <div className='tile-content'>
      <div className={dotClassName()}></div>
      <p className='tile-content__title'>{Math.round(activity?.distance / 1000)} км</p>
    </div>
  )
}
