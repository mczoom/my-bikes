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
  bikeSelect?: string | undefined;
  bikeOdo?: number | undefined;
  uninstalled?: boolean;
}

export default function EditPartInfoPopup({
  item,
  updateInfo,
  isPopupOpen,
  closePopup,
  bikes
}: EditPartInfoPopupProps) {
  const defaultInputValues: PartInfo = {
    category: undefined,
    brand: undefined,
    model: undefined,
    weight: undefined,
    price: undefined,
    bikeSelect: undefined,
    bikeOdo: undefined,
    uninstalled: false
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<PartInfoFormValues>({ mode: 'onChange' });

  interface PartInfoFormValues {
    category: string | undefined;
    brand: string | undefined;
    model: string | undefined;
    weight: number | undefined;
    price: number | undefined;
    bikeSelect: string | undefined;
    bikeOdo: number | undefined;
    uninstalled: boolean | undefined;
  }

  const [partInfo, setPartInfo] = useState<PartInfo>(defaultInputValues);

  function handleSelectValue(value: SelectData | undefined, partData: PartInfo) {
    if (!value) {
      return;
    }
    setPartInfo({ ...partData, ...value });
  }

  function handleSelectInputValue(selectValue: any) {
    if (selectValue === 'uninstall') {
      return;
    }
    const selectedBike = bikes.find((bike) => bike.id === selectValue);
    const selectedBikeData = { bikeSelect: selectedBike?._id, bikeOdo: selectedBike?.converted_distance };
    return selectedBikeData;
  }

  const submitHandler: SubmitHandler<PartInfoFormValues> = (data) => {
    const sanitizedFields = removeEmptyFields(data);
    console.log(sanitizedFields);

    const selectedBikeData = handleSelectInputValue(sanitizedFields.bikeSelect);
    const p = { ...sanitizedFields, ...selectedBikeData };

    console.log(p);

    //updateInfo(item.id, sanitizedFields);
    //closePopup();
    reset();
  };

  return (
    <>
      <PopupWithForm
        key={partInfo.brand}
        name="edit-part"
        title="Редактирование компонента"
        btnText="Сохранить"
        submitHandler={handleSubmit(submitHandler)}
        isPopupOpen={isPopupOpen}
        onClose={closePopup}
      >
        <Input name="brand" value={partInfo.brand} label="Производитель" inputType="text" register={register} />
        <Input name="model" value={partInfo.model} label="Модель" inputType="text" register={register} />

        <Input name="weight" value={partInfo.weight} label="Вес" inputType="number" register={register} />
        <Input name="price" value={partInfo.price} label="Цена" inputType="number" register={register} />
        <Select
          name={'bikeSelect'}
          items={bikes}
          removeOption={'Снять с велосипеда'}
          defaultValue={'-- Выберите байк --'}
          register={register}
        />
      </PopupWithForm>
    </>
  );
}
