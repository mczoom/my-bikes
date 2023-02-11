import React from 'react';
import { MyBike } from '../../models/MyBike';


interface BikeCardPopupProps {
  isPopupOpen: boolean
  bikePopupData: MyBike | undefined
  closeBikePopup: () => void
}

export default function BikeCardPopup({isPopupOpen, bikePopupData, closeBikePopup}: BikeCardPopupProps) {

const popupClassName = `bike-popup ${isPopupOpen ? 'bike-popup_on' : ''}`;

function closePopupByOverlayClick(e:React.SyntheticEvent) {
  if(e.currentTarget === e.target) {
    closeBikePopup();
  }
}

  return (
    <div className={popupClassName} onClick={closePopupByOverlayClick}>
      <div className='bike-popup__container'>
        <button type='button' className='bike-popup__close-btn' onClick={closeBikePopup}></button>
        <img src={bikePopupData?.src} className='bike-popup__image'/>
        <p className='bike-popup__bike-name'>{bikePopupData?.name}</p>
      </div>
    </div>
  )
}
