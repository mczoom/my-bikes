import React, { useEffect } from 'react';


interface DistancePerYear {
  year: number
  distancePerYear: (y: number) => number
}


export default function DistancePerYear({year, distancePerYear}: DistancePerYear) {


  const distanceInKM = (y: number) => {
    return Math.round(distancePerYear(y) / 1000);
  }


  return (
    <>
      {distanceInKM(year) ?
        ( <p>{year}: <span>{distanceInKM(year)}</span> км</p> ) :
        ('')
      }
    </>
  )
}
