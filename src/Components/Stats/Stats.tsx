import React from 'react';
import { Preloader } from '../Preloader/Preloader';
import StatsYearsList from '../StatsYearsList/StatsYearsList';
import CommonStats from '../CommonStats/CommonStats';
import { AthleteStats } from '../../models/AthleteStats';
import { Activity } from '../../models/Activity';
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!



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


  function getAllActivitiesForCalendar() {
    let activities: any = [];
    allActivities.forEach((act: Activity) => {
      const dotClassName = () => {
        if(act.type.includes('Ride')) {
        if(act.trainer === true) {
          return 'date-content__dot date-content__dot_indoor-ride';
        }else{
          return 'date-content__dot date-content__dot_outdoor-ride';
        }
      }else{
        return 'date-content__dot date-content__dot_other-activity';
      }
    };
      activities.push({
        start: act.start_date,
        title: `${Math.round(act.distance / 1000)} км`,
        allDay: 'false',
        content: <div className='date-content'>
                   <div className={dotClassName()}></div>
                   <p className='date-content__title'>{Math.round(act.distance / 1000)} км</p>
                 </div>
      })
    })
    return activities;
  }

  const vv = {
    right: 'prev,next'
  }

  const bb = {html: '<i>some html</i>'};

  return (
    <section className='stats'>
      <Preloader isLoading={isLoading} />
      {allRidesTotals.distance && allYTDRidesTotals.distance &&
        <CommonStats allRidesTotals={allRidesTotals} allYTDRidesTotals={allYTDRidesTotals} />
      }
      <div className='calendar'>
      <FullCalendar
        plugins={[ dayGridPlugin ]}
        initialView="dayGridMonth"
        eventContent={function(events) { return events.event.extendedProps.content}}
        height={'auto'}
        locale={'ru'}
        firstDay={1}
        // showNonCurrentDates={false}
        fixedWeekCount={false}
        events={getAllActivitiesForCalendar()}
        displayEventTime={false}
        headerToolbar={vv}


      />
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
