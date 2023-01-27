import React, {useState} from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { Profile } from '../../models/Profile';
import GarageBikeCard from '../GarageBikeCard/GarageBikeCard';
import { MyBike } from '../../models/MyBike';
import { Activity } from '../../models/Activity';


interface GarageBikesListProps {
  openBikePopup: (bikeData: MyBike | undefined) => void
  yearsAtStrava: (currentYear: number) => number[]
  activities: Activity[]
}


export default function GarageBikesList({openBikePopup, yearsAtStrava, activities}: GarageBikesListProps) {

  const currentUser = React.useContext<Profile>(CurrentUserContext);


  return (
    <ul className='bike-cards-list'>
      {currentUser?.bikes?.map((bike) => (
        <li key={bike.id} className='bike-cards-list__item'>
          <GarageBikeCard bike={bike} openBikePopup={openBikePopup} yearsAtStrava={yearsAtStrava} activities={activities} />
        </li>
      ))}
    </ul>
  )
}
