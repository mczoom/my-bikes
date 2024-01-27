import { useState } from 'react';
import Input from 'ui/Input/Input';
import PopupWithForm from 'components/shared/PopupWithForm/PopupWithForm';
import Checkbox from 'components/shared/Checkbox/Checkbox';
import { Bike } from 'types/Bike';


interface EditBikeInfoPopupProps {
  updateInfo: (id: string, specs: BikeInfo) => void
  isPopupOpen: boolean  
  closePopup: () => void
  bike: Bike
}

interface BikeInfo {
  photo: string
  bikename: string
  brand: string  
  model: string
  year: string | number
  weight: string | number
  trainer?: boolean
}

export default function EditBikeInfoPopup({bike, updateInfo, isPopupOpen, closePopup}: EditBikeInfoPopupProps) {

  const isTrainer = bike.trainer;  

  const [trainerCheckbox, setTrainerCheckbox] = useState<boolean>(isTrainer);
  
  const defaultInputValues: BikeInfo = {
    photo: '',
    bikename: '',
    brand: '',  
    model: '',
    year: '',
    weight: '',
    trainer: trainerCheckbox
  };

  const [bikeInfo, setBikeInfo] = useState<BikeInfo>(defaultInputValues);  

  const popupClassName = `bike-popup ${isPopupOpen ? 'bike-popup_on' : ''}`;

  function handleInputValue(e: React.ChangeEvent<HTMLInputElement>, value: string | boolean, bikeData: BikeInfo) {
    setBikeInfo({...bikeData, [e.target.name]: value}); 
  };


  function handleTextInputValue(e: React.ChangeEvent<HTMLInputElement>) {
    handleInputValue(e, e.target.value, bikeInfo);
  };


  function switchTrainerCheckbox(e: React.ChangeEvent<HTMLInputElement>) {    
    setTrainerCheckbox(v => !v);
    handleInputValue(e, !trainerCheckbox, bikeInfo)
  };

    
  function submitHandler(e: React.SyntheticEvent) {
    e.preventDefault();    
    updateInfo(bike.id, bikeInfo);
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
          <Input name='photo' value={bikeInfo.photo} label='Ссылка на фото' inputType='text' getInputValue={handleTextInputValue} />
          <Input name='brand' value={bikeInfo.brand} label='Производитель' inputType='text' getInputValue={handleTextInputValue} /> 
          <Input name='model' value={bikeInfo.model} label='Модель' inputType='text' getInputValue={handleTextInputValue} /> 
          <Input name='year'  value={bikeInfo.year} label='Модельный год' inputType='text' getInputValue={handleTextInputValue} /> 
          <Input name='weight' value={bikeInfo.weight} label='Вес' inputType='text' getInputValue={handleTextInputValue} /> 
          <Checkbox name='trainer' text='Станок' checkboxStatus={trainerCheckbox} onChange={switchTrainerCheckbox}/>
        </PopupWithForm>            
      </div>
    </div>
  )
}
