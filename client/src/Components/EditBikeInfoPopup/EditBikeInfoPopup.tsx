import React, { useState } from 'react';
import Input from '../UI/Input/Input';
import PopupWithForm from '../PopupWithForm/PopupWithForm';


interface EditBikeInfoPopupProps {
  updateInfo: (id: string, specs: BikeInfo) => void
  isPopupOpen: boolean  
  closePopup: () => void
  bikeId: string
}

interface BikeInfo {
  photo: string
  bikename: string
  brand: string  
  model: string
  year: string | number
  weight: string | number
}

export default function EditBikeInfoPopup({updateInfo, isPopupOpen, closePopup, bikeId}: EditBikeInfoPopupProps) {

  const defaultInputValues: BikeInfo = {
    photo: '',
    bikename: '',
    brand: '',  
    model: '',
    year: '',
    weight: '',
  };

  const [bikeInfo, setBikeInfo] = useState<BikeInfo>(defaultInputValues);
  const popupClassName = `bike-popup ${isPopupOpen ? 'bike-popup_on' : ''}`;

  function handleInputValue(e: React.ChangeEvent<HTMLInputElement>) {
    setBikeInfo({...bikeInfo, [e.target.name]: e.target.value} );
  };  

  
  function submitHandler(e: React.SyntheticEvent) {
    e.preventDefault();
    updateInfo(bikeId, bikeInfo);
    closePopup();
    setBikeInfo(defaultInputValues);
  };
  

  function closePopupByOverlayClick(e:React.MouseEvent) {
    if(e.currentTarget === e.target) {
      closePopup();
    }
  };

  
  return (
    <div className={popupClassName} onClick={closePopupByOverlayClick}>
      <div className='bike-popup__container'>
        <button type='button' className='bike-popup__close-btn' onClick={closePopup}></button>        
        <PopupWithForm name='edit-bike-photo' title='Редактирование данных велосипеда' btnText='Сохранить' submitHandler={submitHandler}>
          <Input name='photo' value={bikeInfo.photo} label='Ссылка на фото' inputType='text' getInputValue={handleInputValue} />
          <Input name='brand' value={bikeInfo.brand} label='Производитель' inputType='text' getInputValue={handleInputValue} /> 
          <Input name='model' value={bikeInfo.model} label='Модель' inputType='text' getInputValue={handleInputValue} /> 
          <Input name='year'  value={bikeInfo.year} label='Модельный год' inputType='text' getInputValue={handleInputValue} /> 
          <Input name='weight' value={bikeInfo.weight} label='Вес' inputType='text' getInputValue={handleInputValue} /> 
        </PopupWithForm>            
      </div>
    </div>
  )
}
