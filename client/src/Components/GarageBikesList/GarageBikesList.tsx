import React, {useState} from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { Profile } from '../../models/Profile';
import GarageBikeCard from '../GarageBikeCard/GarageBikeCard';
import { MyBike } from '../../models/MyBike';
import { Activity } from '../../models/Activity';
import { Bike } from '../../models/Bike';
import { UserBike } from '../../models/UserBike';


interface GarageBikesListProps {
  openBikePhotoPopup: (bikeData: UserBike | undefined) => void
  yearsAtStrava: (currentYear: number) => number[]
  activities: Activity[]
  bikesToRender: Bike[]
  bikeTotalDistance: (bikeId: string) => number
}


export default function GarageBikesList({bikesToRender, openBikePhotoPopup, yearsAtStrava, activities, bikeTotalDistance}: GarageBikesListProps) {

  const currentUser = React.useContext<Profile>(CurrentUserContext);


  return (
    <ul className='bike-cards-list'>
      {bikesToRender.map((bike) => (
        <li key={bike.id} className='bike-cards-list__item'>
          <GarageBikeCard bike={bike} openBikePhotoPopup={openBikePhotoPopup} yearsAtStrava={yearsAtStrava} activities={activities} bikeTotalDistance={bikeTotalDistance} />
        </li>
      ))}
    </ul>
  )
}
