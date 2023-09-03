import React, { useEffect } from 'react';
import StatsYearsList from '../StatsYearsList/StatsYearsList';
import CommonStats from '../CommonStats/CommonStats';
import { AthleteStats, RidesTotals } from '../../models/AthleteStats';
import { Activity } from '../../models/Activity';
import ActivitiesCalendar from '../ActivitiesCalendar/ActivitiesCalendar';




interface StatsProps {
  registrationYear: number
  yearsAtStrava: (p: number) => number[]
  allRidesTotals: RidesTotals
  allYTDRidesTotals: RidesTotals
  isLoading: boolean
  allActivities: Activity[]
}


export default function Stats({registrationYear, yearsAtStrava, allRidesTotals, allYTDRidesTotals, isLoading, allActivities}: StatsProps) {

  const isYearMatch = (y: number, activity: Activity) => {
    return new Date(activity.start_date).getFullYear() === y;
  }


  function sumTotalRideDistance(y: number): number {
    let odo = 0;
    allActivities.forEach((training) => {
      if(isYearMatch(y, training) && training.type.includes('Ride')) {
        odo += training.distance;
      }
    })
    return Math.round(odo / 1000);
  }


  function getYearLongestRide(y: number): number {
    let dist = 0;
    allActivities.forEach((training) => {
      if(isYearMatch(y, training) && training.distance > dist && training.type.includes('Ride')) {
        dist = training.distance;
      };
    });
    return Math.round(dist / 1000);
  }


  function totalOverHundredRides(y: number): number {
    let longRide = 0;
    allActivities.forEach((training) => {
      if(isYearMatch(y, training) && training.distance >= 100000 && training.type.includes('Ride')) {
        longRide += 1;
      }
    });
    return longRide;
  }


  function sumTotalRideTime(y: number): number {
    let odo = 0;
    allActivities.forEach((training) => {
      if(isYearMatch(y, training) && training.type.includes('Ride')) {
        odo += training.moving_time;
      }
    })
    return Math.round(odo / 3600);
  }


  function countRides(y: number): number {
    let trainings = 0;
    allActivities.forEach((training) => {
      if(isYearMatch(y, training) && training.type.includes('Ride')) {
        trainings ++;
      }
    })
    return trainings;
  }



  return (
    <section className='stats'>
      <div className='stats__common-stats-wrapper'>
        <CommonStats allRidesTotals={allRidesTotals} allYTDRidesTotals={allYTDRidesTotals} />
        <ActivitiesCalendar allActivities={allActivities} />
      </div>
      <StatsYearsList
        isLoading={isLoading}
        registrationYear={registrationYear}
        yearsAtStrava={yearsAtStrava}
        allActivities={allActivities}
        totalDistance={sumTotalRideDistance}
        totalTime={sumTotalRideTime}
        totalTrainings={countRides}
        yearLongestDistance={getYearLongestRide}
        totalOverHundredRides={totalOverHundredRides}
      />
    </section>
  )
}
