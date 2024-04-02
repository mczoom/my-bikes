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
  const cycles = bikes.filter((b) => b.trainer === false);
  const trainersIds = trainers.map((b) => b.id);
  const bikeIds = cycles.map((b) => b.id);

  const isBikeActivity = (training: Activity) => bikeIds.includes(training.gear_id);
  const isTrainerActivity = (training: Activity) => trainersIds.includes(training.gear_id);
  const isNordicSkiActivity = (training: Activity) => training.type === 'NordicSki';
  const isOtherActivity = (training: Activity) => !training.type.includes('Ride') && training.type !== 'NordicSki';

  const bikeActivities = (activities: Activity[]) => activities.filter((a) => isBikeActivity(a));
  const trainerActivities = (activities: Activity[]) => activities.filter((a) => isTrainerActivity(a));
  const nordicSkiActivities = (activities: Activity[]) => activities.filter((a) => isNordicSkiActivity(a));
  const otherActivities = (activities: Activity[]) => activities.filter((a) => isOtherActivity(a));

  const isYearMatch = (y: number, activity: Activity): boolean => {
    return new Date(activity.start_date_local).getFullYear() === y;
  };

  function sumTotalRideDistance(y: number, sport: string): number {
    let odo = 0;
    if (sport === 'Ride') {
      bikeActivities(allActivities).forEach((training) => {
        if (isYearMatch(y, training)) {
          odo += training.distance;
        }
      });
    } else if (sport === 'Trainer') {
      trainerActivities(allActivities).forEach((training) => {
        if (isYearMatch(y, training)) {
          odo += training.distance;
        }
      });
    } else if (sport === 'NordicSki') {
      nordicSkiActivities(allActivities).forEach((training) => {
        if (isYearMatch(y, training)) {
          odo += training.distance;
        }
      });
    } else if (sport === 'Other') {
      otherActivities(allActivities).forEach((training) => {
        if (isYearMatch(y, training)) {
          odo += training.distance;
        }
      });
    }
    return convertDistanceToKM(odo);
  }

  function countRides(y: number, sport: string): number {
    let trainings = 0;
    if (sport === 'Ride') {
      bikeActivities(allActivities).forEach((training) => {
        if (isYearMatch(y, training)) {
          trainings++;
        }
      });
    } else if (sport === 'Trainer') {
      trainerActivities(allActivities).forEach((training) => {
        if (isYearMatch(y, training)) {
          trainings++;
        }
      });
    } else if (sport === 'NordicSki') {
      nordicSkiActivities(allActivities).forEach((training) => {
        if (isYearMatch(y, training)) {
          trainings++;
        }
      });
    } else if (sport === 'Other') {
      otherActivities(allActivities).forEach((training) => {
        if (isYearMatch(y, training)) {
          trainings++;
        }
      });
    }
    return trainings;
  }

  function getYearLongestRide(y: number, sport: string): number {
    let dist = 0;
    if (sport === 'Ride') {
      bikeActivities(allActivities).forEach((training) => {
        if (isYearMatch(y, training) && training.distance > dist) {
          dist = training.distance;
        }
      });
    } else if (sport === 'Trainer') {
      trainerActivities(allActivities).forEach((training) => {
        if (isYearMatch(y, training) && training.distance > dist) {
          dist = training.distance;
        }
      });
    } else if (sport === 'NordicSki') {
      nordicSkiActivities(allActivities).forEach((training) => {
        if (isYearMatch(y, training) && training.distance > dist) {
          dist = training.distance;
        }
      });
    } else if (sport === 'Other') {
      otherActivities(allActivities).forEach((training) => {
        if (isYearMatch(y, training) && training.distance > dist) {
          dist = training.distance;
        }
      });
    }
    return convertDistanceToKM(dist);
  }

  function sumTotalRideTime(y: number, sport: string): number {
    let time = 0;
    if (sport === 'Ride') {
      bikeActivities(allActivities).forEach((training) => {
        if (isYearMatch(y, training)) {
          time += training.moving_time;
        }
      });
    } else if (sport === 'Trainer') {
      trainerActivities(allActivities).forEach((training) => {
        if (isYearMatch(y, training)) {
          time += training.moving_time;
        }
      });
    } else if (sport === 'NordicSki') {
      nordicSkiActivities(allActivities).forEach((training) => {
        if (isYearMatch(y, training)) {
          time += training.moving_time;
        }
      });
    } else if (sport === 'Other') {
      otherActivities(allActivities).forEach((training) => {
        if (isYearMatch(y, training)) {
          time += training.moving_time;
        }
      });
    }
    return convertSecToHrs(time);
  }

  function totalOverHundredRides(y: number, sport: string): number {
    let longRide = 0;
    if (sport === 'Ride') {
      bikeActivities(allActivities).forEach((training) => {
        if (isYearMatch(y, training) && training.distance >= 100000) {
          longRide += 1;
        }
      });
    }
    return longRide;
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
