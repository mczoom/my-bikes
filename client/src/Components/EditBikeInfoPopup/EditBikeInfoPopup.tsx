import React, { useState } from 'react';
import { updateBikeInfo } from '../../utils/appApi';
import Input from '../Input/Input';
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

  const [bikeInfo, setBikeInfo] = useState<BikeInfo>({} as BikeInfo);

  console.log(bikeInfo);

  const defaultInputValues = {
    photo: '',
    bikename: '',
    brand: '',  
    model: '',
    year: '',
    weight: '',
  }


  function handleInputValue(e: React.ChangeEvent<HTMLInputElement>) {
    setBikeInfo({...bikeInfo, [e.target.name]: e.target.value} );
  };

  
  
  function submitHandler(e: React.SyntheticEvent) {
    e.preventDefault();
    updateInfo(bikeId, bikeInfo);
    closePopup();
    setBikeInfo(defaultInputValues);
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
          <Input name='photo' value={bikeInfo.photo} label='Ссылка на фото' inputType='text' placeholder='Введите ссылку на фото' getInputValue={handleInputValue} />
          <Input name='bikename' value={bikeInfo.bikename } label='Название байка' inputType='text' placeholder='Введите название' getInputValue={handleInputValue} /> 
          <Input name='brand' value={bikeInfo.brand} label='Производитель' inputType='text' placeholder='Введите название производителя' getInputValue={handleInputValue} /> 
          <Input name='model' value={bikeInfo.model} label='Модель' inputType='text' placeholder='Введите название модели' getInputValue={handleInputValue} /> 
          <Input name='year'  value={bikeInfo.year} label='Модельный год' inputType='text' placeholder='Введите модельный год' getInputValue={handleInputValue} /> 
          <Input name='weight' value={bikeInfo.weight} label='Вес' inputType='text' placeholder='Введите вес байка' getInputValue={handleInputValue} /> 
        </PopupWithForm>            
      </div>
    </div>
  )
}
