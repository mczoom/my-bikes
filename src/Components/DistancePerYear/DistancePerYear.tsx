import React, { useState } from 'react';
import { Bike } from '../../models/Bike';
import { fromYear, tillYear } from '../../utils/constants';
import { getActivities } from '../../utils/stravaApi';


interface DistancePerYear {
  year: number
  bike: Bike
}


export default function DistancePerYear({year, bike}: DistancePerYear) {

  const [yearDistance, setYearDistance] = useState<any>([])

function getDistancePerYear() {
  const fromDate = fromYear(year);
  const tillDate = tillYear(year);
  getActivities({fromDate, tillDate})
    .then((res) => {

      let distance: number = 0;
      res.forEach((activity: any) => {
        if(bike.id === activity.gear_id) {
        distance += (activity.distance / 1000)}});
      return distance;

    })
    .then((dist) => setYearDistance(dist))
}

console.log(yearDistance);

  return (
    <p onClick={getDistancePerYear}>{year}</p>
  )
}
