import React from 'react';
import { Preloader } from '../Preloader/Preloader';
import StatsYearsList from '../StatsYearsList/StatsYearsList';
import CommonStats from '../CommonStats/CommonStats';
import { AthleteStats } from '../../models/AthleteStats';
import { Activity } from '../../models/Activity';



interface StatsProps {
  registrationYear: number
  yearsAtStrava: (p: number) => number[]
  allRidesTotals: AthleteStats
  allYTDRidesTotals: AthleteStats
  isLoading: boolean
  allActivities: Activity[]
}


export default function Stats({registrationYear, yearsAtStrava, allRidesTotals, allYTDRidesTotals, isLoading, allActivities}: StatsProps) {


  function sumTotalDistance(y: number): number {
    let odo = 0;
    allActivities.forEach((training) => {
      if(new Date(training.start_date).getFullYear() === y) {
        odo += Math.round(training.distance / 1000);
      }
    })
    return odo;
  }

  function sumTotalTime(y: number): number {
    let odo = 0;
    allActivities.forEach((training) => {
      if(new Date(training.start_date).getFullYear() === y) {
        odo += Math.round(training.elapsed_time / 3600);
      }
    })
    return odo;
  }

  function sumTrainings(y: number): number {
    let trainings = 0;
    allActivities.forEach((training) => {
      if(new Date(training.start_date).getFullYear() === y) {
        trainings ++;
      }
    })
    return trainings;
  }

  return (
    <section className='stats'>
      <Preloader isLoading={isLoading} />
      {allRidesTotals.distance && allYTDRidesTotals.distance &&
        <CommonStats allRidesTotals={allRidesTotals} allYTDRidesTotals={allYTDRidesTotals} />
      }
      <StatsYearsList
        registrationYear={registrationYear}
        yearsAtStrava={yearsAtStrava}
        allActivities={allActivities}
        totalDistance={sumTotalDistance}
        totalTime={sumTotalTime}
        totalTrainings={sumTrainings}
      />
    </section>
  )
}
