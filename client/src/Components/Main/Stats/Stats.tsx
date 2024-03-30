import StatsYearsList from 'components/Main/Stats/StatsYearsList/StatsYearsList';
import CommonStats from 'components/Main/Stats/CommonStats/CommonStats';
import { Activity } from 'types/Activity';
import ActivitiesCalendar from 'components/ActivitiesCalendar/ActivitiesCalendar';
import { convertDistanceToKM, convertSecToHrs } from 'utils/constants';
import { Bike } from 'types/Bike';

interface StatsProps {
  yearsAtStrava: number[];
  allActivities: Activity[];
  bikes: Bike[];
}

export default function Stats({ yearsAtStrava, allActivities, bikes }: StatsProps) {
  const trainers = bikes.filter((b) => b.trainer === true);

  const isTrainer = (sport: string, training: Activity) => sport === 'trainer' && training.total_elevation_gain < 1;

  const isBike = (sport: string, training: Activity) =>
    training.total_elevation_gain > 0 && training.type.includes(sport);

  const isYearMatch = (y: number, activity: Activity): boolean => {
    return new Date(activity.start_date_local).getFullYear() === y;
  };

  function sumTotalRideDistance(y: number, sport: string): number {
    let odo = 0;
    allActivities.forEach((training) => {
      if (isYearMatch(y, training) && isBike(sport, training)) {
        odo += training.distance;
      } else if (isYearMatch(y, training) && isTrainer(sport, training)) {
        odo += training.distance;
      }
    });
    return convertDistanceToKM(odo);
  }

  function getYearLongestRide(y: number, sport: string): number {
    let dist = 0;
    allActivities.forEach((training) => {
      if (isYearMatch(y, training) && training.distance > dist && isBike(sport, training)) {
        dist = training.distance;
      } else if (isYearMatch(y, training) && training.distance > dist && isTrainer(sport, training)) {
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
      if (isYearMatch(y, training) && isBike(sport, training)) {
        time += training.moving_time;
      } else if (isYearMatch(y, training) && isTrainer(sport, training)) {
        time += training.moving_time;
      }
    });
    return convertSecToHrs(time);
  }

  function countRides(y: number, sport: string): number {
    let trainings = 0;
    allActivities.forEach((training) => {
      if (isYearMatch(y, training) && isBike(sport, training)) {
        trainings++;
      } else if (isYearMatch(y, training) && isTrainer(sport, training)) {
        trainings++;
      }
    });
    return trainings;
  }

  return (
    <section className="stats">
      <div className="stats__common-stats-wrapper">
        <CommonStats />
        <ActivitiesCalendar allActivities={allActivities} trainers={trainers} />
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
