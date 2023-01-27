import React from 'react';
import { Bike } from '../../models/Bike';
import { MyBike } from '../../models/MyBike';
import { currentYear } from '../../utils/constants';
import DistancePerYear from '../DistancePerYear/DistancePerYear';


interface DistancePerYearListProps {
  yearsAtStrava: (currentYear: number) => number[]
  bike: Bike
  myBike: MyBike | undefined
}

export default function DistancePerYearList({yearsAtStrava, bike, myBike}: DistancePerYearListProps) {
  return (
    <ul>
{yearsAtStrava(currentYear).map((year: number, i: number) => (
  <li key={i}><DistancePerYear year={year} bike={bike} myBike={myBike} /></li>
))}
    </ul>
  )
}
