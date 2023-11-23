import { currentYear } from 'utils/constants';
import DistancePerYear from 'components/Main/Garage/DistancePerYear/DistancePerYear';


interface DistancePerYearListProps {
  yearsAtStrava: number[]
  distancePerYear: (y: number) => number
}

export default function DistancePerYearList({yearsAtStrava, distancePerYear}: DistancePerYearListProps) {
  
  return (
    <ul className='year-dist-cardslist'>
      {yearsAtStrava.map((year: number, i: number) => (
        <li className='year-dist-card' key={i}><DistancePerYear year={year} distancePerYear={distancePerYear} /></li>
      ))}
    </ul>
  )
}
