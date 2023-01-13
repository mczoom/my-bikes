import React from 'react';
import { Activities } from '../../models/Activities';
import { Ride } from '../../models/Ride';
import { currentYear } from '../../utils/constants';
import StatsYearCard from '../StatsYearCard/StatsYearCard';


interface StatsYearsListProps {
  registrationYear: number
  yearsAtStrava: (p: number) => number[]
}

export default function StatsYearsList({registrationYear, yearsAtStrava}: StatsYearsListProps) {
  return (
    <ul className='years-list'>
      {yearsAtStrava(currentYear).reverse().map((year: number, i: number) => (
          <li key={i}><StatsYearCard year={year} /></li>
        ))}
    </ul>
  )
}
