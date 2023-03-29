import React from 'react';
import {MyBike} from '../../models/MyBike';
import BikeSpecs from '../BikeSpecs/BikeSpecs';
import DistancePerYearList from '../DistancePerYearList/DistancePerYearList';
import { Activity } from '../../models/Activity';
import { Bike } from '../../models/Bike';
import { UserBike } from '../../models/UserBike';


interface BikeCardProps {
  bike: UserBike
  openBikePhotoPopup: (bikeData: UserBike | undefined) => void
  openEditInfoPopup: () => void
  yearsAtStrava: (currentYear: number) => number[]
  activities: Activity[]
  bikeTotalDistance: (bikeId: string) => number
  getBikeId: (id: string) => void
}


export default function GarageBikeCard({bike, openBikePhotoPopup, openEditInfoPopup, yearsAtStrava, activities, bikeTotalDistance, getBikeId}: BikeCardProps) {

  function openPhotoPopup() {
    openBikePhotoPopup(bike);
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
        <div className='bike-card__image-wrap'>        
          <img src={bike?.photo} className='bike-card__image' onClick={openPhotoPopup}></img>
        </div>  
        <BikeSpecs bike={bike} getBikeId={getBikeId} bikeTotalDistance={bikeTotalDistance} openEditInfoPopup={openEditInfoPopup} />
        <DistancePerYearList yearsAtStrava={yearsAtStrava} distancePerYear={getDistancePerYear} />
      </div>
    </div>
  )
}
