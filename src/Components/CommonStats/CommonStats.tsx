import React from 'react';
import { AthleteStats } from '../../models/AthleteStats';



interface CommonStatsProps {
  allRidesTotals: AthleteStats
  allYTDRidesTotals: AthleteStats
}

export default function CommonStats({allRidesTotals, allYTDRidesTotals}: CommonStatsProps) {

  const allRidesDistance: number = Math.round(allRidesTotals.distance / 1000);
  const yTDRidesDistance: number = Math.round(allYTDRidesTotals.distance / 1000);

  return (
    <ul className='common-stats'>
        <li><p>Тренировок за всё время: <span className='stats__text_bold'>{allRidesTotals.count || '--'}</span></p></li>
        <li><p>Пройдено за всё время: <span className='stats__text_bold'>{allRidesDistance ? allRidesDistance + ' км' : '--'}</span></p></li>
        <li><p>Тренировок в этом году: <span className='stats__text_bold'>{allYTDRidesTotals.count || '--'}</span></p></li>
        <li><p>Пройдено в этом году: <span className='stats__text_bold'>{yTDRidesDistance ? yTDRidesDistance + ' км' : '--'}</span></p></li>
      </ul>
  )
}
