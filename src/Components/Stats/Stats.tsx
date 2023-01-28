import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { getCurrentAthlete, getAthlete } from '../../utils/stravaApi';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { Profile } from '../../models/Profile';
import { AthleteStats } from '../../models/AthleteStats';
import { Preloader } from '../Preloader/Preloader';
import { currentYear } from '../../utils/constants';
import StatsYearsList from '../StatsYearsList/StatsYearsList';
import CommonStats from '../CommonStats/CommonStats';




interface StatsProps {
  registrationYear: number
  yearsAtStrava: (p: number) => number[]
}


export default function Stats({registrationYear, yearsAtStrava}: StatsProps) {

  const currentUser = React.useContext<Profile>(CurrentUserContext);

  const [allRidesTotals, setAllRidesTotals] = useState<AthleteStats>({} as AthleteStats);
  const [allYTDRidesTotals, setAllYTDRidesTotals] = useState<AthleteStats>({} as AthleteStats)

  const [isLoading, setIsLoading] = useState<boolean>(false);



  const allRidesDistance: number = allRidesTotals?.distance / 1000;
  const yTDRidesDistance: number = allYTDRidesTotals?.distance / 1000;


  function getUserStats(user: Profile) {
    setIsLoading(true);
    getAthlete(user.id)
      .then((res) => {
        setAllRidesTotals((res.all_ride_totals));
        setAllYTDRidesTotals(res.ytd_ride_totals);
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  };


  useEffect(() => {
    if(currentUser.id) {
      getUserStats(currentUser)
    };
  }, [currentUser]);


  return (
    <section className='stats'>
      <Preloader isLoading={isLoading} />
      {allRidesTotals.distance && allYTDRidesTotals.distance &&
        <CommonStats allRidesTotals={allRidesTotals} allYTDRidesTotals={allYTDRidesTotals} />
      }
      <StatsYearsList registrationYear={registrationYear} yearsAtStrava={yearsAtStrava} />

    </section>

  )
}
