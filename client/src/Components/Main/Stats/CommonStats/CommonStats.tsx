import { RidesTotals } from 'types/AthleteStats';
import { convertDistanceToKM, currentYear } from 'utils/constants';


interface CommonStatsProps {
  allRidesTotalData: RidesTotals
  allYTDRidesTotalData: RidesTotals
}

export default function CommonStats({allRidesTotalData, allYTDRidesTotalData}: CommonStatsProps) {

  const allRidesDistance: number = convertDistanceToKM(allRidesTotalData.distance);
  const yTDRidesDistance: number = convertDistanceToKM(allYTDRidesTotalData.distance);



  return (
    <div className='common-stats'>
      <ul className='common-stats__list'>
        <li className='common-stats__item'>
          <p className='item__description'>Всего пройдено: </p>
          <span className='item__value'>{allRidesDistance ? allRidesDistance + ' км' : '--'}</span>
        </li>
        <li className='common-stats__item'>
          <p className='item__description'>Всего тренировок: </p>
          <span className='item__value'>{allRidesTotalData.count || '--'}</span>
        </li>
        <li className='common-stats__item'>
          <p className='item__description'>Пройдено в {currentYear} году: </p>
          <span className='item__value'>{yTDRidesDistance ? yTDRidesDistance + ' км' : '--'}</span>
        </li>
        <li className='common-stats__item'>
          <p className='item__description'>Тренировок в {currentYear} году: </p>
          <span className='item__value'>{allYTDRidesTotalData.count || '--'}</span>
        </li>
      </ul>
    </div>
  )
}
