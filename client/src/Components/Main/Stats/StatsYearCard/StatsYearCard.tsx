import { useContext, useState } from 'react';
import { Preloader } from 'ui/Preloader/Preloader';
import { ActivitiesLoadingState } from 'contexts/ActivitiesLoadingState';
import Radio from 'components/UI/Radio/Radio';

interface StatsYearCardProps {
  year: number;
  totalDistance: (y: number, sport: string) => number;
  totalTime: (y: number, sport: string) => number;
  totalTrainings: (y: number, sport: string) => number;
  yearLongestDistance: (y: number, sport: string) => number;
  totalOverHundredRides: (y: number, sport: string) => number;
}

export default function StatsYearCard({
  year,
  totalDistance,
  totalTime,
  totalTrainings,
  yearLongestDistance,
  totalOverHundredRides,
}: StatsYearCardProps) {
  const hasActivitiesLoaded = useContext(ActivitiesLoadingState);

  const [isStatsShown, setIsStatsShown] = useState<boolean>(false);
  const [radioValue, setradioValue] = useState<string>('Ride');

  const dashboardClassName = `stats_dashboard ${isStatsShown ? 'stats_dashboard_on' : ''}`;
  const emptyDashboardClassName = `stats_dashboard stats_dashboard_empty ${isStatsShown ? 'stats_dashboard_on' : ''}`;
  const openerIconClassName = isStatsShown ? 'stats__opener-icon_hide' : 'stats__opener-icon_show';
  const yearStatsButtonText = isStatsShown ? 'скрыть' : 'показать статистику';

  function toggleYearStatsDisplay() {
    setIsStatsShown((v) => !v);
  }

  function handleRadio(e: React.ChangeEvent<HTMLInputElement>) {
    setradioValue(e.target.value);
  }

  return (
    <div className="year-card">
      <h2 className="year-card__header">{year} год</h2>
      {!hasActivitiesLoaded ? (
        <div className="year_card__stats">
          <div className="stats__wrapper">
            <p className="stats__opener-text">Загрузка...</p>
            <div className="preloader_small">
              <Preloader isLoading={!hasActivitiesLoaded} />
            </div>
          </div>
        </div>
      ) : (
        <div className="year_card__stats">
          <div className="stats__wrapper" onClick={toggleYearStatsDisplay}>
            <p className="stats__opener-text">{yearStatsButtonText}</p>
            <div className={openerIconClassName}></div>
          </div>
          {totalTrainings(year, 'Ride') > 0 || (totalTrainings(year, 'Trainer') > 0 && hasActivitiesLoaded) ? (
            <>
              <div className={dashboardClassName}>
                <div className="dashboard__sports-filter-wrapper">
                  <Radio
                    label="Вело"
                    name={`${year}`}
                    value="Ride"
                    onChange={handleRadio}
                    checked={radioValue === 'Ride'}
                  />
                  <Radio
                    label="Станок"
                    name={`${year}`}
                    value="Trainer"
                    onChange={handleRadio}
                    checked={radioValue === 'Trainer'}
                  />
                  <Radio
                    label="Лыжи XC"
                    name={`${year}`}
                    value="NordicSki"
                    onChange={handleRadio}
                    checked={radioValue === 'NordicSki'}
                  />
                  <Radio
                    label="Другой спорт"
                    name={`${year}`}
                    value="Other"
                    onChange={handleRadio}
                    checked={radioValue === 'Other'}
                  />
                </div>
                <ul className="dashboard__year-stats">
                  <li className="stats__text">
                    Общая дистанция
                    <div className="stats__text__wrapper">
                      <span className="stats__text_bold">{totalDistance(year, radioValue)}</span> км
                    </div>
                  </li>
                  <li className="stats__text">
                    Тренировок
                    <div className="stats__text__wrapper">
                      <span className="stats__text_bold">{totalTrainings(year, radioValue)}</span>
                    </div>
                  </li>
                  <li className="stats__text">
                    Общее время
                    <div className="stats__text__wrapper">
                      <span className="stats__text_bold">{totalTime(year, radioValue)}</span> ч
                    </div>
                  </li>
                  <li className="stats__text">
                    Самая длинная {radioValue === 'Ride' ? 'поездка' : 'тренировка'}
                    <div className="stats__text__wrapper">
                      <span className="stats__text_bold">{yearLongestDistance(year, radioValue)}</span> км
                    </div>
                  </li>
                  {radioValue === 'Ride' && (
                    <li className="stats__text">
                      Поездок 100+ км
                      <div className="stats__text__wrapper">
                        <span className="stats__text_bold">{totalOverHundredRides(year, radioValue)}</span>
                      </div>
                    </li>
                  )}
                </ul>
              </div>
            </>
          ) : (
            <div className={emptyDashboardClassName}>
              <p className="stats__text">Тренировки не найдены</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
