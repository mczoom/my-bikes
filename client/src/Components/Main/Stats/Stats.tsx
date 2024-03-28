import StatsYearsList from 'components/Main/Stats/StatsYearsList/StatsYearsList';
import CommonStats from 'components/Main/Stats/CommonStats/CommonStats';
import { Activity } from 'types/Activity';
import ActivitiesCalendar from 'components/ActivitiesCalendar/ActivitiesCalendar';
import { convertDistanceToKM, convertSecToHrs } from 'utils/constants';

interface StatsProps {
  yearsAtStrava: number[];
  allActivities: Activity[];
}

export default function Stats({ yearsAtStrava, allActivities }: StatsProps) {
  const isYearMatch = (y: number, activity: Activity): boolean => {
    return new Date(activity.start_date_local).getFullYear() === y;
  };

  function sumTotalRideDistance(y: number, sport: string): number {
    let odo = 0;
    allActivities.forEach((training) => {
      if (isYearMatch(y, training) && training.type.includes(sport)) {
        odo += training.distance;
      }
    });
    return convertDistanceToKM(odo);
  }

  function getYearLongestRide(y: number, sport: string): number {
    let dist = 0;
    allActivities.forEach((training) => {
      if (isYearMatch(y, training) && training.distance > dist && training.type.includes(sport)) {
        dist = training.distance;
      }
    });
    return convertDistanceToKM(dist);
  }

  function totalOverHundredRides(y: number, sport: string): number {
    let longRide = 0;
    allActivities.forEach((training) => {
      if (isYearMatch(y, training) && training.distance >= 100000 && training.type.includes(sport)) {
        longRide += 1;
      }
    });
    return longRide;
  }

  function sumTotalRideTime(y: number, sport: string): number {
    let time = 0;
    allActivities.forEach((training) => {
      if (isYearMatch(y, training) && training.type.includes(sport)) {
        time += training.moving_time;
      }
    });
    return convertSecToHrs(time);
  }

  function countRides(y: number, sport: string): number {
    let trainings = 0;
    allActivities.forEach((training) => {
      if (isYearMatch(y, training) && training.type.includes(sport)) {
        trainings++;
      }
    });
    return trainings;
  }

  return (
    <section className="stats">
      <div className="stats__common-stats-wrapper">
        <CommonStats />
        <ActivitiesCalendar allActivities={allActivities} />
      </div>
      <StatsYearsList
        yearsAtStrava={yearsAtStrava}
        totalDistance={sumTotalRideDistance}
        totalTime={sumTotalRideTime}
        totalTrainings={countRides}
        yearLongestDistance={getYearLongestRide}
        totalOverHundredRides={totalOverHundredRides}
      />
    </section>
  );
}
