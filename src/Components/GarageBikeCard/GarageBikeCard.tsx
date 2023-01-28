import React from 'react';
import { Bike } from '../../models/Bike';
import {MyBike} from '../../models/MyBike';
import BikeSpecs from '../BikeSpecs/BikeSpecs';
import DistancePerYearList from '../DistancePerYearList/DistancePerYearList';
import { Activity } from '../../models/Activity';



interface BikeCardProps {
  bike: MyBike
  openBikePopup: (bikeData: MyBike | undefined) => void
  yearsAtStrava: (currentYear: number) => number[]
  activities: Activity[]
  bikeTotalDistance: (bikeId: string) => number
}


export default function GarageBikeCard({bike, openBikePopup, yearsAtStrava, activities, bikeTotalDistance}: BikeCardProps) {

  // const myBike: MyBike | undefined = myBikes.find((b: MyBike) => {
  //   return b.id.includes(bike.id)
  // });

  function openPopup() {
    openBikePopup(bike);
  }

  function getDistancePerYear (y: number): number {
    let distance = 0;
    activities.forEach((act: Activity) => {
      if(new Date(act.start_date_local).getFullYear() === y && bike.id === act.gear_id) {
        distance += act.distance;
      }
    })
    return distance;
  }



  return (
    <div className='bike-card' >
      <div className='bike-card__wrap'>
        <img src={bike?.src} className='bike-card__image' onClick={openPopup}></img>
        <BikeSpecs bike={bike} bikeTotalDistance={bikeTotalDistance} />
        <DistancePerYearList yearsAtStrava={yearsAtStrava} distancePerYear={getDistancePerYear} />
      </div>
    </div>
  )
}
