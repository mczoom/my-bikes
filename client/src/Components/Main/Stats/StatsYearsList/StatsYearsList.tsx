import StatsYearCard from 'components/Main/Stats/StatsYearCard/StatsYearCard';

interface StatsYearsListProps {
  yearsAtStrava: number[];
  totalDistance: (y: number, sport: string) => number;
  totalTime: (y: number, sport: string) => number;
  totalTrainings: (y: number, sport: string) => number;
  yearLongestDistance: (y: number, sport: string) => number;
  totalOverHundredRides: (y: number, sport: string) => number;
}

export default function StatsYearsList({
  yearsAtStrava,
  totalDistance,
  totalTime,
  totalTrainings,
  yearLongestDistance,
  totalOverHundredRides,
}: StatsYearsListProps) {
  return (
    <ul className="years-list">
      {yearsAtStrava.map((year: number, i: number) => (
        <li key={i}>
          <StatsYearCard
            year={year}
            totalDistance={totalDistance}
            totalTime={totalTime}
            totalTrainings={totalTrainings}
            yearLongestDistance={yearLongestDistance}
            totalOverHundredRides={totalOverHundredRides}
          />
        </li>
      ))}
    </ul>
  );
}
