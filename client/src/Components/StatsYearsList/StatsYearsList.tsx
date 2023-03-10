import React from 'react';
import { Activity } from '../../models/Activity';
import { Ride } from '../../models/Ride';
import { currentYear } from '../../utils/constants';
import StatsYearCard from '../StatsYearCard/StatsYearCard';


interface StatsYearsListProps {
  registrationYear: number
  yearsAtStrava: (p: number) => number[]
  allActivities: Activity[]
  totalDistance: (y: number) => number
  totalTime: (y: number) => number
  totalTrainings: (y: number) => number
  yearLongestDistance: (y: number) => number
  totalOverHundredRides: (y: number) => number
}

export default function StatsYearsList({yearsAtStrava, allActivities, totalDistance, totalTime, totalTrainings, yearLongestDistance, totalOverHundredRides}: StatsYearsListProps) {
  return (
    <ul className='years-list'>
      {yearsAtStrava(currentYear).reverse().map((year: number, i: number) => (
          <li key={i}><StatsYearCard year={year} allActivities={allActivities} totalDistance={totalDistance} totalTime={totalTime} totalTrainings={totalTrainings} yearLongestDistance={yearLongestDistance} totalOverHundredRides={totalOverHundredRides} /></li>
        ))}
    </ul>
  )
}
