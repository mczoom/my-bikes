import { useState } from 'react';
import Input from 'ui/Input/Input';
import PopupWithForm from 'components/shared/PopupWithForm/PopupWithForm';
import Checkbox from 'components/shared/Checkbox/Checkbox';
import { Bike } from 'types/Bike';
import { SubmitHandler, useForm } from 'react-hook-form';
import { removeEmptyFields } from 'utils/service';

interface EditBikeInfoPopupProps {
  updateInfo: (id: string, specs: BikeInfo) => void;
  closePopup: () => void;
  bike: Bike;
  isPopupOpen: boolean;
}

interface BikeInfo {
  photo: string;
  bikename: string;
  brand: string;
  model: string;
  year: string | number;
  weight: string | number;
  trainer?: boolean;
}

export default function EditBikeInfoPopup({ bike, updateInfo, isPopupOpen, closePopup }: EditBikeInfoPopupProps) {
  const isTrainer = bike.trainer;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<BikeInfo>({
    mode: 'onChange',
    defaultValues: {
      photo: '',
      bikename: '',
      brand: '',
      model: '',
      year: '',
      weight: '',
      trainer: isTrainer
    }
  });

  function onClose() {
    closePopup();
  }

  const submitHandler: SubmitHandler<BikeInfo> = (data: BikeInfo) => {
    const sanitizedFields = removeEmptyFields<BikeInfo>(data);
    updateInfo(bike.id, sanitizedFields);
    closePopup();
    reset();
  };

  return (
    <>
      <PopupWithForm
        name="edit-bike-photo"
        title="Редактирование данных велосипеда"
        btnText="Сохранить"
        submitHandler={handleSubmit(submitHandler)}
        isPopupOpen={isPopupOpen}
        onClose={onClose}
      >
        <Input name="photo" label="Ссылка на фото" inputType="text" register={register} />
        <Input name="brand" label="Производитель" inputType="text" register={register} />
        <Input name="model" label="Модель" inputType="text" register={register} />
        <Input name="year" label="Модельный год" inputType="number" register={register} />
        <Input name="weight" label="Вес" inputType="number" register={register} />
        <Checkbox name="trainer" text="Станок" register={register} />
      </PopupWithForm>
    </>
  );
}
