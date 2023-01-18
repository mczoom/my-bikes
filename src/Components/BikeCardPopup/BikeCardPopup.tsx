import React from 'react';
import { MyBike } from '../../models/MyBike';


interface BikeCardPopupProps {
  isPopupOpen: boolean
  bikePopupData: MyBike | undefined
}

export default function BikeCardPopup({isPopupOpen, bikePopupData}: BikeCardPopupProps) {

const popupClassName = isPopupOpen ? 'bike-popup' : 'bike-popup_off';

  return (
    <div className={popupClassName}>
      <figure className='image'>
        <button type='button' className='bike-popup__close-btn'>X</button>
        <img src={bikePopupData?.src} className='bike-popup__image'/>
        <figcaption>{bikePopupData?.name}</figcaption>
      </figure>
    </div>
  )
}
