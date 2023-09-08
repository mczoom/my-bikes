interface DistancePerYear {
  year: number
  distancePerYear: (y: number) => number
}


export default function DistancePerYear({year, distancePerYear}: DistancePerYear) {

  const distanceInKM = (y: number) => {
    return Math.round(distancePerYear(y) / 1000);
  };


  return (
    <>
      {distanceInKM(year) > 0 &&
        ( <p className='distance-card__year'>{year}: <span className='distance-card__dist'>{distanceInKM(year)}</span> км</p> )
      }
    </>
  )
}
