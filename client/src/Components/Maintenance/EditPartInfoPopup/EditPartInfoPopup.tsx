import { useEffect, useState } from 'react';
import Input from 'ui/Input/Input';
import PopupWithForm from 'components/shared/PopupWithForm/PopupWithForm';
import { BikePart } from 'types/BikePart';
import { PartInfo } from 'types/PartInfo';
import { Bike } from 'types/Bike';
import Select from 'components/UI/Select/Select';
import { SubmitHandler, useForm } from 'react-hook-form';
import { removeEmptyFields } from 'utils/service';

interface EditPartInfoPopupProps {
  updateInfo: (id: string, specs: PartInfo) => void;
  closePopup: () => void;
  item: BikePart;
  isPopupOpen: boolean;
  bikes: Bike[];
}

interface SelectData {
  bikeSelect: string;
  bikeOdo: number;
}

interface PartInfoFormValues {
  brand: string;
  model: string;
  weight: string | number;
  price: string | number;
  bikeSelect: string;
  bikeOdo: number;
}

type PartInfoData = PartInfoFormValues & SelectData;

export default function EditPartInfoPopup({
  item,
  updateInfo,
  isPopupOpen,
  closePopup,
  bikes
}: EditPartInfoPopupProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState,
    formState: { isSubmitSuccessful }
  } = useForm<PartInfoFormValues>({
    mode: 'onChange',
    defaultValues: {
      brand: '',
      model: '',
      weight: '',
      price: '',
      bikeSelect: ''
    }
  });

  const numberInputRules = {
    valueAsNumber: true
  };

  const [partInfo, setPartInfo] = useState<PartInfoData>({} as PartInfoData);

  const selectTitle = item.installed ? 'Поменять байк или снять' : 'Установить на байк';

  function handleSelectInputValue(selectValue: string) {
    if (selectValue === 'uninstall') {
      const selectedBikeData = { bikeSelect: selectValue, bikeOdo: 0 };
      return selectedBikeData;
    }
    const selectedBike = bikes.find((bike) => bike.id === selectValue);
    if (selectedBike) {
      const selectedBikeData = { bikeSelect: selectedBike._id, bikeOdo: selectedBike.converted_distance };
      return selectedBikeData;
    }
  }

  const submitHandler: SubmitHandler<PartInfoFormValues> = (data) => {
    const sanitizedData = removeEmptyFields(data);
    const selectedBikeData = handleSelectInputValue(sanitizedData.bikeSelect);
    const submitData = { ...sanitizedData, ...selectedBikeData };

    setPartInfo(submitData);
    updateInfo(item.id, submitData);
    closePopup();
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset();
    }
  }, [formState, partInfo, reset]);

  return (
    <>
      <PopupWithForm
        name="edit-part"
        title="Редактирование компонента"
        btnText="Сохранить"
        submitHandler={handleSubmit(submitHandler)}
        isPopupOpen={isPopupOpen}
        onClose={closePopup}
      >
        <Input name="brand" label="Производитель" inputType="text" register={register} />
        <Input name="model" label="Модель" inputType="text" register={register} />

        <Input name="weight" label="Вес" inputType="number" register={register} rules={numberInputRules} />
        <Input name="price" label="Цена" inputType="number" register={register} rules={numberInputRules} />
        <Select
          name={'bikeSelect'}
          title={selectTitle}
          items={bikes}
          removeOption={'Снять с велосипеда'}
          initialtOption={''}
          register={register}
        />
      </PopupWithForm>
    </>
  );
}
