import { useEffect, useState } from 'react';
import { useContext } from 'react';
import { CurrentUserContext } from 'contexts/CurrentUserContext';
import { AthleteStats, RidesTotals } from 'types/AthleteStats';
import { convertDistanceToKM, currentYear } from 'utils/constants';
import { getAthlete } from 'utils/stravaApi';



export default function CommonStats() {

  const currentUser = useContext(CurrentUserContext);

  const [allRidesTotalData, setallRidesTotalData] = useState<RidesTotals>({} as RidesTotals);
  const [allYTDRidesTotalData, setAllYTDRidesTotalDist] = useState<RidesTotals>({} as RidesTotals);  

  const allRidesDistance: number = convertDistanceToKM(allRidesTotalData.distance);
  const yTDRidesDistance: number = convertDistanceToKM(allYTDRidesTotalData.distance);
  

  useEffect(() => {
    let ignore = false;
    getAthlete(currentUser.id)
      .then((res: AthleteStats) => {
        if(!ignore) {
          setallRidesTotalData(res.all_ride_totals);
          setAllYTDRidesTotalDist(res.ytd_ride_totals);
        }
      })
      .catch((err) => console.log(err));

    return () => {
      ignore = true;
    };
  }, [currentUser])



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
