import { AthleteStats, RidesTotals } from '../../models/AthleteStats';
import { currentYear } from '../../utils/constants';


interface CommonStatsProps {
  allRidesTotals: RidesTotals
  allYTDRidesTotals: RidesTotals
}

export default function CommonStats({allRidesTotals, allYTDRidesTotals}: CommonStatsProps) {

  const allRidesDistance: number = Math.round(allRidesTotals.distance / 1000);
  const yTDRidesDistance: number = Math.round(allYTDRidesTotals.distance / 1000);



  return (
    <div className='common-stats'>
      <ul className='common-stats__list'>
        <li className='common-stats__item'>
          <p className='item__description'>Всего пройдено: </p>
          <span className='item__value'>{allRidesDistance ? allRidesDistance + ' км' : '--'}</span>
        </li>
        <li className='common-stats__item'>
          <p className='item__description'>Всего тренировок: </p>
          <span className='item__value'>{allRidesTotals.count || '--'}</span>
        </li>
        <li className='common-stats__item'>
          <p className='item__description'>Пройдено в {currentYear} году: </p>
          <span className='item__value'>{yTDRidesDistance ? yTDRidesDistance + ' км' : '--'}</span>
        </li>
        <li className='common-stats__item'>
          <p className='item__description'>Тренировок в {currentYear} году: </p>
          <span className='item__value'>{allYTDRidesTotals.count || '--'}</span>
        </li>
      </ul>
    </div>
  )
}
