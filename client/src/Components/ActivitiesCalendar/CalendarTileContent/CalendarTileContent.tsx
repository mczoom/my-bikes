import { Activity } from 'types/Activity';
import { convertDistanceToKM } from 'utils/constants';

interface CalendarTileContentProps {
  dotClassName: () => string
  activity: Activity
}

export default function CalendarTileContent({dotClassName, activity}: CalendarTileContentProps) {

  const dist = convertDistanceToKM(activity?.distance);

  return (
    <div className='tile-content'>
      <div className={dotClassName()}></div>
      <p className='tile-content__title'>{dist} км</p>
    </div>
  )
}
