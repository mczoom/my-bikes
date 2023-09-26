import StatsYearsList from 'components/Main/Stats/StatsYearsList/StatsYearsList';
import CommonStats from 'components/Main/Stats/CommonStats/CommonStats';
import { RidesTotals } from 'types/AthleteStats';
import { Activity } from 'types/Activity';
import ActivitiesCalendar from 'components/ActivitiesCalendar/ActivitiesCalendar';
import { convertDistanceToKM, convertSecToHrs } from 'utils/constants';


interface StatsProps {
  registrationYear: number
  yearsAtStrava: (p: number) => number[]
  allRidesTotalData: RidesTotals
  allYTDRidesTotalData: RidesTotals
  allActivities: Activity[]
}


export default function Stats({registrationYear, yearsAtStrava, allRidesTotalData, allYTDRidesTotalData, allActivities}: StatsProps) {

  const isYearMatch = (y: number, activity: Activity): boolean => {
    return new Date(activity.start_date).getFullYear() === y;
  };


  function sumTotalRideDistance(y: number): number {
    let odo = 0;
    allActivities.forEach((training) => {
      if(isYearMatch(y, training) && training.type.includes('Ride')) {
        odo += training.distance;
      }
    })
    return convertDistanceToKM(odo);
  };


  function getYearLongestRide(y: number): number {
    let dist = 0;
    allActivities.forEach((training) => {
      if(isYearMatch(y, training) && training.distance > dist && training.type.includes('Ride')) {
        dist = training.distance;
      };
    });
    return convertDistanceToKM(dist);
  };


  function totalOverHundredRides(y: number): number {
    let longRide = 0;
    allActivities.forEach((training) => {
      if(isYearMatch(y, training) && training.distance >= 100000 && training.type.includes('Ride')) {
        longRide += 1;
      }
    });
    return longRide;
  };


  function sumTotalRideTime(y: number): number {
    let time = 0;
    allActivities.forEach((training) => {
      if(isYearMatch(y, training) && training.type.includes('Ride')) {
        time += training.moving_time;
      }
    })
    return convertSecToHrs(time);
  };


  function countRides(y: number): number {
    let trainings = 0;
    allActivities.forEach((training) => {
      if(isYearMatch(y, training) && training.type.includes('Ride')) {
        trainings ++;
      }
    })
    return trainings;
  };



  return (
    <section className='stats'>
      <div className='stats__common-stats-wrapper'>
        <CommonStats allRidesTotalData={allRidesTotalData} allYTDRidesTotalData={allYTDRidesTotalData} />
        <ActivitiesCalendar allActivities={allActivities} />
      </div>
      <StatsYearsList
        registrationYear={registrationYear}
        yearsAtStrava={yearsAtStrava}
        totalDistance={sumTotalRideDistance}
        totalTime={sumTotalRideTime}
        totalTrainings={countRides}
        yearLongestDistance={getYearLongestRide}
        totalOverHundredRides={totalOverHundredRides}
      />
    </section>
  )
}
