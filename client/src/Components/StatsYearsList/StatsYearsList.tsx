import { currentYear } from '../../utils/constants';
import StatsYearCard from '../StatsYearCard/StatsYearCard';


interface StatsYearsListProps {
  registrationYear: number
  yearsAtStrava: (p: number) => number[]
  totalDistance: (y: number) => number
  totalTime: (y: number) => number
  totalTrainings: (y: number) => number
  yearLongestDistance: (y: number) => number
  totalOverHundredRides: (y: number) => number
}

export default function StatsYearsList({yearsAtStrava, totalDistance, totalTime, totalTrainings, yearLongestDistance, totalOverHundredRides}: StatsYearsListProps) {
  return (
    <ul className='years-list'>
      {yearsAtStrava(currentYear).reverse().map((year: number, i: number) => (
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
  )
}
