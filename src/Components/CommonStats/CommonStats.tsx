import React from 'react';
import { AthleteStats } from '../../models/AthleteStats';



interface CommonStatsProps {
  allRidesTotals: AthleteStats
  allYTDRidesTotals: AthleteStats
}

export default function CommonStats({allRidesTotals, allYTDRidesTotals}: CommonStatsProps) {

  const allRidesDistance: number = allRidesTotals.distance / 1000;
  const yTDRidesDistance: number = allYTDRidesTotals.distance / 1000;

  return (
    <ul className='common-stats'>
        <li><p>Количество тренировок за всё время: <span className='stats__text_bold'>{allRidesTotals.count}</span></p></li>
        <li><p>Пройдено км за всё время: <span className='stats__text_bold'>{allRidesDistance ? Math.round(allRidesDistance) : ''}</span> км</p></li>
        <li><p>Количество тренировок в этом году: <span className='stats__text_bold'>{allYTDRidesTotals.count}</span></p></li>
        <li><p>Пройдено км в этом году: <span className='stats__text_bold'>{yTDRidesDistance ? Math.round(yTDRidesDistance) : ''}</span> км</p></li>
      </ul>
  )
}
