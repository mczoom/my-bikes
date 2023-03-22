import React from 'react';
import { MyBike } from '../../models/MyBike';
import { UserBike } from '../../models/UserBike';


interface BikeCardPopupProps {
  isPopupOpen: boolean
  bikePopupData: UserBike | undefined
  closePopup: () => void
}

export default function BikeCardPopup({isPopupOpen, bikePopupData, closePopup}: BikeCardPopupProps) {

const popupClassName = `bike-popup ${isPopupOpen ? 'bike-popup_on' : ''}`;

function closePopupByOverlayClick(e:React.MouseEvent) {
  if(e.currentTarget === e.target) {
    closePopup();
  }
}

  return (
    <div className={popupClassName} onClick={closePopupByOverlayClick}>
      <div className='bike-popup__container'>
        <button type='button' className='bike-popup__close-btn' onClick={closePopup}></button>
        <img src={bikePopupData?.photo} className='bike-popup__image'/>
        <p className='bike-popup__bike-name'>{bikePopupData?.name}</p>
      </div>
    </div>
  )
}
