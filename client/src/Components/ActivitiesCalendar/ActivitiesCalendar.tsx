import FullCalendar from '@fullcalendar/react'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import multiMonthPlugin from '@fullcalendar/multimonth';
import { Activity } from 'types/Activity';
import CalendarLegend from 'components/ActivitiesCalendar/CalendarLegend/CalendarLegend';
import CalendarTileContent from 'components/ActivitiesCalendar/CalendarTileContent/CalendarTileContent';
import { convertDistanceToKM } from 'utils/constants';
import { Bike } from 'types/Bike';

interface ActivitiesCalendarProps {
  allActivities: Activity[];
  trainers: Bike[];
}

interface CalendarActivities {
  start: string;
  title: string;
  allDay: boolean | undefined;
  content: React.ReactNode;
}

export default function ActivitiesCalendar({ allActivities, trainers }: ActivitiesCalendarProps) {
  const trainings = getAllActivitiesForCalendar();

  function getAllActivitiesForCalendar() {
    let activities: CalendarActivities[] = [];
    allActivities.forEach((act: Activity) => {
      const dotClassName = () => {
        if (act.type.includes('Ride')) {
          if (trainers.some((t) => t.id === act.gear_id)) {
            return 'tile-content__dot tile-content__dot_indoor-ride';
          } else {
            return 'tile-content__dot tile-content__dot_outdoor-ride';
          }
        } else {
          return 'tile-content__dot tile-content__dot_other-activity';
        }
      };

      activities.push({
        start: act.start_date_local,
        title: `${convertDistanceToKM(act.distance)} км`,
        allDay: false,
        content: <CalendarTileContent dotClassName={dotClassName} activity={act} />,
      });
    });
    return activities;
  }

  return (
    <div className="calendar">
      <FullCalendar
        plugins={[dayGridPlugin, multiMonthPlugin]}
        initialView="dayGridMonth"
        eventContent={(events) => events.event.extendedProps.content}
        height={'auto'}
        timeZone={'Europe/Moscow'}
        locale={'ru'}
        firstDay={1}
        fixedWeekCount={true}
        events={trainings}
        displayEventTime={false}
        buttonText={{ today: 'Сегодня' }}
      />
      <CalendarLegend />
    </div>
  );
}
