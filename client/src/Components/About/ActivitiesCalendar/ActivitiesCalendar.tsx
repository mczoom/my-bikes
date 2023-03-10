import React from 'react';
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import multiMonthPlugin from '@fullcalendar/multimonth';
import { Activity } from '../../../models/Activity';
import CalendarLegend from '../../CalendarLegend/CalendarLegend';
import CalendarTileContent from '../../CalendarTileContent/CalendarTileContent';


interface ActivitiesCalendarProps {
  allActivities: Activity[]
}

export default function ActivitiesCalendar({allActivities}: ActivitiesCalendarProps) {

  function getAllActivitiesForCalendar() {
    let activities: any = [];
    allActivities.forEach((act: Activity) => {
      const dotClassName = () => {
        if(act.type.includes('Ride')) {
        if(act.trainer === true) {
          return 'tile-content__dot tile-content__dot_indoor-ride';
        }else{
          return 'tile-content__dot tile-content__dot_outdoor-ride';
        }
      }else{
        return 'tile-content__dot tile-content__dot_other-activity';
      }
    };
      activities.push({
        start: act.start_date,
        title: `${Math.round(act.distance / 1000)} км`,
        allDay: 'false',
        content: <CalendarTileContent dotClassName={dotClassName} activity={act} />
      })
    })
    return activities;
  }


  // const calendarNavButtons = {end: 'multiMonthYear,today,prev,next'}


  return (
    <div className='calendar'>
      <FullCalendar
        plugins={[ dayGridPlugin, multiMonthPlugin ]}
        initialView="dayGridMonth"
        eventContent={function(events) { return events.event.extendedProps.content}}
        height={'auto'}
        locale={'ru'}
        firstDay={1}
        fixedWeekCount={true}
        events={getAllActivitiesForCalendar()}
        displayEventTime={false}
        // headerToolbar={calendarNavButtons}
        buttonText={{today: 'сегодня'}}
      />
      <CalendarLegend />
      </div>
  )
}
