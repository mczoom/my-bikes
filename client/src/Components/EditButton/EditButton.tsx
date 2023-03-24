import React from 'react';
import { UserBike } from '../../models/UserBike';

interface EditButtonProps {
    text: string
    openPopup: () => void
    bike: UserBike
    getBikeId: (id: string) => void
}


export default function EditButton({text, openPopup, bike, getBikeId}: EditButtonProps) {

  function handleClick() {
    openPopup();
    getBikeId(bike.id);    
  }

  return (
    <button className='edit-btn' onClick={handleClick}>{text}</button>
  )
}



