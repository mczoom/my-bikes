interface DistancePerYear {
  year: number
  distancePerYear: (y: number) => number
}


export default function DistancePerYear({year, distancePerYear}: DistancePerYear) {

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
