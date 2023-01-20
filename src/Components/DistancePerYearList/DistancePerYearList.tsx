import React from 'react';
import { Bike } from '../../models/Bike';
import { currentYear } from '../../utils/constants';
import DistancePerYear from '../DistancePerYear/DistancePerYear';


interface DistancePerYearListProps {
  yearsAtStrava: (currentYear: number) => number[]
  bike: Bike
}

export default function DistancePerYearList({yearsAtStrava, bike}: DistancePerYearListProps) {
  return (
    <ul>
{yearsAtStrava(currentYear).map((year: number, i: number) => (
  <li key={i}><DistancePerYear year={year} bike={bike}/></li>
))}
    </ul>
  )
}
