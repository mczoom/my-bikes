import { useEffect, useState } from 'react';
import Input from 'ui/Input/Input';
import PopupWithForm from 'components/shared/PopupWithForm/PopupWithForm';
import Checkbox from 'components/shared/Checkbox/Checkbox';
import { Bike } from 'types/Bike';

interface EditBikeInfoPopupProps {
  updateInfo: (id: string, specs: BikeInfo) => void;
  closePopup: () => void;
  bike: Bike;
  isPopupOpen: boolean;
}

interface BikeInfo {
  photo: string | undefined;
  bikename: string | undefined;
  brand: string | undefined;
  model: string | undefined;
  year: string | number | undefined;
  weight: string | number | undefined;
  trainer?: boolean;
}

export default function EditBikeInfoPopup({ bike, updateInfo, isPopupOpen, closePopup }: EditBikeInfoPopupProps) {
  const isTrainer = bike.trainer;

  const [trainerCheckbox, setTrainerCheckbox] = useState<boolean>(bike.trainer);

  const defaultInputValues: BikeInfo = {
    photo: undefined,
    bikename: undefined,
    brand: undefined,
    model: undefined,
    year: undefined,
    weight: undefined,
    trainer: isTrainer
  };

  const [bikeInfo, setBikeInfo] = useState<BikeInfo>({} as BikeInfo);

  function onClose() {
    setBikeInfo(defaultInputValues);
    closePopup();
  }

  function handleInputValue(e: React.ChangeEvent<HTMLInputElement>, value: string | boolean, bikeData: BikeInfo) {
    setBikeInfo({ ...bikeData, [e.target.name]: value });
  }

  function handleTextInputValue(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.value) {
      if (typeof e.target.value === 'string' && e.target.value.trim() !== '') {
        handleInputValue(e, e.target.value, bikeInfo);
      }
    }
  }

  function switchTrainerCheckbox(e: React.ChangeEvent<HTMLInputElement>) {
    setTrainerCheckbox((v) => !v);
    handleInputValue(e, !trainerCheckbox, bikeInfo);
  }

  function submitHandler(e: React.SyntheticEvent) {
    e.preventDefault();
    updateInfo(bike.id, bikeInfo);
    setBikeInfo(defaultInputValues);
    closePopup();
  }

  console.log(bikeInfo);

  useEffect(() => {
    setTrainerCheckbox(isTrainer);
  }, [isTrainer]);

  return (
    <>
      <PopupWithForm
        name="edit-bike-photo"
        title="Редактирование данных велосипеда"
        btnText="Сохранить"
        submitHandler={submitHandler}
        isPopupOpen={isPopupOpen}
        onClose={onClose}
      >
        <Input name="photo" label="Ссылка на фото" inputType="text" getInputValue={handleTextInputValue} />
        <Input name="brand" label="Производитель" inputType="text" getInputValue={handleTextInputValue} />
        <Input name="model" label="Модель" inputType="text" getInputValue={handleTextInputValue} />
        <Input name="year" label="Модельный год" inputType="text" getInputValue={handleTextInputValue} />
        <Input name="weight" label="Вес" inputType="text" getInputValue={handleTextInputValue} />
        <Checkbox name="trainer" text="Станок" checkboxStatus={trainerCheckbox} onChange={switchTrainerCheckbox} />
      </PopupWithForm>
    </>
  );
}
