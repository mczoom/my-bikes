import Input from 'components/UI/Input/Input';
import PopupWithForm from 'components/shared/PopupWithForm/PopupWithForm';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { BikePart } from 'types/BikePart';

interface AddPartPopupProps {
  submitHandler: (data: BikePart) => void;
  isPopupOpen: boolean;
  onClose: () => void;
}

export function AddPartPopup({ submitHandler, isPopupOpen, onClose }: AddPartPopupProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState,
    formState: { isSubmitSuccessful },
  } = useForm<BikePart>({
    mode: 'onChange',
    defaultValues: {
      brand: '',
      model: '',
      year: '',
      weight: '',
      price: '',
    },
  });

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [formState, reset]);

  return (
    <PopupWithForm
      name="add-bike-part"
      title="Добавить компонент"
      btnText="Сохранить"
      submitHandler={handleSubmit(submitHandler)}
      isPopupOpen={isPopupOpen}
      onClose={onClose}
    >
      <Input name="brand" label="Производитель" inputType="text" register={register} />
      <Input name="model" label="Модель" inputType="text" register={register} />
      <Input name="year" label="Модельный год" inputType="text" register={register} />
      <Input name="weight" label="Вес" inputType="text" register={register} />
      <Input name="price" label="Цена" inputType="text" register={register} />
    </PopupWithForm>
  );
}
