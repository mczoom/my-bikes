import React, { useState } from 'react';
import Input from '../Input/Input';
import PageWithForm from '../PageWithForm/PageWithForm';


interface BikeCardPopupProps {
  isPopupOpen: boolean  
  closeBikePopup: () => void
}

export default function BikeCardPopup({isPopupOpen, closeBikePopup}: BikeCardPopupProps) {

  const [linkValue, setLinkValue] = useState<string>('');


  function getPhotoInputValue(e: React.ChangeEvent<HTMLInputElement>) {
    setLinkValue(e.target.value);
  };
  
  function updatePhotoHandler(e: React.SyntheticEvent) {
    e.preventDefault();
    //updatePhoto(linkValue);
  }  

  const popupClassName = `bike-popup ${isPopupOpen ? 'bike-popup_on' : ''}`;

  function closePopupByOverlayClick(e:React.MouseEvent) {
    if(e.currentTarget === e.target) {
      closeBikePopup();
    }
  }

  
  return (
    <div className={popupClassName} onClick={closePopupByOverlayClick}>
      <div className='bike-popup__container'>
        <button type='button' className='bike-popup__close-btn' onClick={closeBikePopup}></button>
        <PageWithForm name='edit-bike-photo' title='Редактирование фотографии велосипеда' btnText='Сохранить' submitHandler={updatePhotoHandler}>
          <Input name='login' label='Логин' inputType='text' placeholder='Логин' getLoginInputValue={getPhotoInputValue} />
          
        </PageWithForm>        
      </div>
    </div>
  )
}
