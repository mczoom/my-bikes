import React, { useState } from 'react';
import Input from '../Input/Input';
import PageWithForm from '../PageWithForm/PageWithForm';


interface EditBikeInfoPopupProps {
  isPopupOpen: boolean  
  closePopup: () => void
}

export default function EditBikeInfoPopup({isPopupOpen, closePopup}: EditBikeInfoPopupProps) {

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
      closePopup();
    }
  }

  
  return (
    <div className={popupClassName} onClick={closePopupByOverlayClick}>
      <div className='bike-popup__container'>
        <button type='button' className='bike-popup__close-btn' onClick={closePopup}></button>
        <PageWithForm name='edit-bike-photo' title='Редактирование фотографии велосипеда' btnText='Сохранить' submitHandler={updatePhotoHandler}>
          <Input name='link' label='Ссылка на фото' inputType='text' placeholder='Введите ссылку на фото' getInputValue={getPhotoInputValue} />
          <Input name='bikename' label='Название байка' inputType='text' placeholder='Введите название' getInputValue={getPhotoInputValue} /> 
          <Input name='brand' label='Производитель' inputType='text' placeholder='Введите название производителя' getInputValue={getPhotoInputValue} /> 
          <Input name='model' label='Модель' inputType='text' placeholder='Введите название модели' getInputValue={getPhotoInputValue} /> 
          <Input name='year' label='Модельный год' inputType='text' placeholder='Введите модельный год' getInputValue={getPhotoInputValue} /> 
          <Input name='weight' label='Вес' inputType='text' placeholder='Введите вес байка' getInputValue={getPhotoInputValue} /> 
        </PageWithForm>        
      </div>
    </div>
  )
}
