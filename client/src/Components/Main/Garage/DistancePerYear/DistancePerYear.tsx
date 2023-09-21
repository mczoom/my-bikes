interface DistancePerYear {
  year: number
  distancePerYear: (y: number) => number
}


export default function DistancePerYear({year, distancePerYear}: DistancePerYear) {

  // const distanceInKM = (y: number) => {
  //   return Math.round(distancePerYear(y) / 1000);
  // };

  const dist = distancePerYear(year);
  


  return (
    <>
      {dist > 0 && (
          <p className='distance-card__year'>{year}: <span className='distance-card__dist'>{dist}</span> км</p> 
        )
      }
    </>
  )
}
