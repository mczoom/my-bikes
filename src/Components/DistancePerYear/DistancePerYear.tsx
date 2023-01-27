import React, { useEffect, useState } from 'react';
import { Bike } from '../../models/Bike';
import { MyBike } from '../../models/MyBike';
import { fromYear, tillYear } from '../../utils/constants';
import { getActivities } from '../../utils/stravaApi';


interface DistancePerYear {
  year: number
  bike: Bike
  myBike: MyBike | undefined
}


export default function DistancePerYear({year, bike, myBike}: DistancePerYear) {

  const [yearDistance, setYearDistance] = useState<any>([])

function getDistancePerYear() {
  const fromDate = fromYear(year);
  const tillDate = tillYear(year);
  getActivities({fromDate, tillDate})
    .then((res) => {
      let distance: number = 0;
      res.forEach((activity: any) => {
        if(bike.id === activity.gear_id) {
        distance += (Math.round(activity.distance / 1000))
      }});
      return distance;

    })
    .then((dist) => setYearDistance(dist))
    .catch((err) => console.log(err))
};

// useEffect(() => {
//   getDistancePerYear();
// }, []);



  return (
    <p onClick={getDistancePerYear}>{year}: {yearDistance} км</p>
  )
}
