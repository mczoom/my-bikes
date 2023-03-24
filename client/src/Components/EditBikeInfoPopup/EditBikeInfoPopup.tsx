import React, { useState } from 'react';
import { updateBikeInfo } from '../../utils/appApi';
import Input from '../Input/Input';
import PopupWithForm from '../PopupWithForm/PopupWithForm';


interface EditBikeInfoPopupProps {
  isPopupOpen: boolean  
  closePopup: () => void
  bikeId: string
}

interface BikeInfo {
  photo: string
  bikename: string
  brand: string  
  model: string
  year: number
  weight: number
}

export default function EditBikeInfoPopup({isPopupOpen, closePopup, bikeId}: EditBikeInfoPopupProps) {

  const [bikeInfo, setBikeInfo] = useState<BikeInfo>({} as BikeInfo);
  
console.log(bikeInfo);


  function handleInputValue(e: React.ChangeEvent<HTMLInputElement>) {
    setBikeInfo({...bikeInfo, [e.target.name]: e.target.value} );
  };
  
  function submitHandler(e: React.SyntheticEvent) {
    e.preventDefault();
    updateBikeInfo(bikeId, bikeInfo);
    closePopup();
  }  

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
        <PopupWithForm name='edit-bike-photo' title='Редактирование данных велосипеда' btnText='Сохранить' submitHandler={submitHandler}>
          <Input name='photo' label='Ссылка на фото' inputType='text' placeholder='Введите ссылку на фото' getInputValue={handleInputValue} />
          <Input name='bikename' label='Название байка' inputType='text' placeholder='Введите название' getInputValue={handleInputValue} /> 
          <Input name='brand' label='Производитель' inputType='text' placeholder='Введите название производителя' getInputValue={handleInputValue} /> 
          <Input name='model' label='Модель' inputType='text' placeholder='Введите название модели' getInputValue={handleInputValue} /> 
          <Input name='year' label='Модельный год' inputType='text' placeholder='Введите модельный год' getInputValue={handleInputValue} /> 
          <Input name='weight' label='Вес' inputType='text' placeholder='Введите вес байка' getInputValue={handleInputValue} /> 
        </PopupWithForm>        
      </div>
    </div>
  )
}
