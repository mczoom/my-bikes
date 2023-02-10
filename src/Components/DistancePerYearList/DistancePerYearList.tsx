import React from 'react';
import { Bike } from '../../models/Bike';
import { MyBike } from '../../models/MyBike';
import { currentYear } from '../../utils/constants';
import DistancePerYear from '../DistancePerYear/DistancePerYear';


interface DistancePerYearListProps {
  yearsAtStrava: (currentYear: number) => number[]
  distancePerYear: (y: number) => number
}

export default function DistancePerYearList({yearsAtStrava, distancePerYear}: DistancePerYearListProps) {
  return (
    <ul className='year-dist-cardslist'>
      {yearsAtStrava(currentYear).reverse().map((year: number, i: number) => (
        <li className='year-dist-card' key={i}><DistancePerYear year={year} distancePerYear={distancePerYear} /></li>
      ))}
    </ul>
  )
}
