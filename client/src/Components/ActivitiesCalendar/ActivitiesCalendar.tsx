import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!
import multiMonthPlugin from '@fullcalendar/multimonth';
import { Activity } from 'types/Activity';
import CalendarLegend from 'components/ActivitiesCalendar/CalendarLegend/CalendarLegend';
import CalendarTileContent from 'components/ActivitiesCalendar/CalendarTileContent/CalendarTileContent';
import { convertDistanceToKM } from 'utils/constants';


interface ActivitiesCalendarProps {
  allActivities: Activity[]
}

interface CalendarActivities {
  start: string,
  title: string,
  allDay: boolean | undefined,
  content: React.ReactNode
}

export default function ActivitiesCalendar({allActivities}: ActivitiesCalendarProps) {

  const trainings = getAllActivitiesForCalendar();

  function getAllActivitiesForCalendar() {
    let activities: CalendarActivities[] = [];
    allActivities.forEach((act: Activity) => {
      const dotClassName = () => {
        if(act.type.includes('Ride')) {
          if(act.trainer === true) {
            return 'tile-content__dot tile-content__dot_indoor-ride';
          }else{
            return 'tile-content__dot tile-content__dot_outdoor-ride';
          };
        }else{
          return 'tile-content__dot tile-content__dot_other-activity';
        };
    };
      activities.push({
        start: act.start_date,
        title: `${convertDistanceToKM(act.distance)} км`,
        allDay: false,
        content: <CalendarTileContent dotClassName={dotClassName} activity={act} />
      });
    });
    return activities;
  };
  

  return (
    <div className='calendar'>
      <FullCalendar
        plugins={[ dayGridPlugin, multiMonthPlugin ]}
        initialView="dayGridMonth"
        eventContent={(events) => events.event.extendedProps.content}
        height={'auto'}
        locale={'ru'}
        firstDay={1}
        fixedWeekCount={true}
        events={trainings}
        displayEventTime={false}
        buttonText={{today: 'Сегодня'}}
      />
      <CalendarLegend />
    </div>
  )
}
