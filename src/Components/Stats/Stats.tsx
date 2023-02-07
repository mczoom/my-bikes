import React from 'react';
import { Preloader } from '../Preloader/Preloader';
import StatsYearsList from '../StatsYearsList/StatsYearsList';
import CommonStats from '../CommonStats/CommonStats';
import { AthleteStats } from '../../models/AthleteStats';
import { Activity } from '../../models/Activity';
import ActivitiesCalendar from '../About/ActivitiesCalendar/ActivitiesCalendar';




interface StatsProps {
  registrationYear: number
  yearsAtStrava: (p: number) => number[]
  allRidesTotals: AthleteStats
  allYTDRidesTotals: AthleteStats
  isLoading: boolean
  allActivities: Activity[]
}


export default function Stats({registrationYear, yearsAtStrava, allRidesTotals, allYTDRidesTotals, isLoading, allActivities}: StatsProps) {

  const isYearMatch = (y: number, activity: Activity) => {
    return new Date(activity.start_date).getFullYear() === y;
  }


  function sumTotalDistance(y: number): number {
    let odo = 0;
    allActivities.forEach((training) => {
      if(isYearMatch(y, training)) {
        odo += Math.round(training.distance / 1000);
      }
    })
    return odo;
  }


  function getYearLongesDistance(y: number): number {
    let dist = 0;
    allActivities.forEach((training) => {
      if(isYearMatch(y, training) && training.distance > dist) {
        dist = training.distance;
      };
    });
    return Math.round(dist / 1000);
  }


  function totalOverHundredRides(y: number): number {
    let longRide = 0;
    allActivities.forEach((training) => {
      if(isYearMatch(y, training) && training.distance >= 100000) {
        longRide += 1;
      }
    });
    return longRide;
  }


  function sumTotalTime(y: number): number {
    let odo = 0;
    allActivities.forEach((training) => {
      if(isYearMatch(y, training)) {
        odo += Math.round(training.elapsed_time / 3600);
      }
    })
    return odo;
  }


  function sumTrainings(y: number): number {
    let trainings = 0;
    allActivities.forEach((training) => {
      if(isYearMatch(y, training)) {
        trainings ++;
      }
    })
    return trainings;
  }




  return (
    <section className='stats'>
      <Preloader isLoading={isLoading} />
      <div className='stats__common-stats-wrapper'>
        <CommonStats allRidesTotals={allRidesTotals} allYTDRidesTotals={allYTDRidesTotals} />
        <ActivitiesCalendar allActivities={allActivities} />
      </div>
      <StatsYearsList
        registrationYear={registrationYear}
        yearsAtStrava={yearsAtStrava}
        allActivities={allActivities}
        totalDistance={sumTotalDistance}
        totalTime={sumTotalTime}
        totalTrainings={sumTrainings}
        yearLongesDistance={getYearLongesDistance}
        totalOverHundredRides={totalOverHundredRides}
      />
    </section>
  )
}
