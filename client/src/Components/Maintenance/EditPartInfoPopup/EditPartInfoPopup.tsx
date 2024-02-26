import { useEffect, useState } from 'react';
import Input from 'ui/Input/Input';
import PopupWithForm from 'components/shared/PopupWithForm/PopupWithForm';
import { BikePart } from 'types/BikePart';
import { PartInfo } from 'types/PartInfo';
import { Bike } from 'types/Bike';
import Select from 'components/UI/Select/Select';

interface EditPartInfoPopupProps {
  updateInfo: (id: string, specs: PartInfo) => void;
  closePopup: () => void;
  item: BikePart;
  isPopupOpen: boolean;
  bikes: Bike[];
}

interface SelectData {
  bikeSelect: string | undefined;
  bikeOdoAtInstal: number | undefined;
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
    bikeOdoAtInstal: undefined
  };

  const [partInfo, setPartInfo] = useState<PartInfo>(defaultInputValues);

  function handleTextValue(e: React.ChangeEvent<HTMLInputElement>, value: string | boolean, partData: PartInfo) {
    if (!value) {
      return;
    }
    setPartInfo({ ...partData, [e.target.name]: value });
  }

  function handleNumberValue(e: React.ChangeEvent<HTMLInputElement>, value: string, partData: PartInfo) {
    if (!value) {
      return;
    }
    setPartInfo({ ...partData, [e.target.name]: parseInt(value) });
  }

  function handleTextInputValue(e: React.ChangeEvent<HTMLInputElement>) {
    handleTextValue(e, e.target.value, partInfo);
  }

  function handleSelectValue(
    e: React.ChangeEvent<HTMLSelectElement>,
    value: SelectData | undefined,
    partData: PartInfo
  ) {
    if (!value) {
      return;
    }
    setPartInfo({ ...partData, ...value });
  }

  function handleSelectInputValue(e: React.ChangeEvent<HTMLSelectElement>) {
    const selectedBike = bikes.find((bike) => bike.id === e.target.value);
    const selectedBikeData = { bikeSelect: selectedBike?.id, bikeOdoAtInstal: selectedBike?.converted_distance };
    handleSelectValue(e, selectedBikeData, partInfo);
  }

  function handleNumberInputValue(e: React.ChangeEvent<HTMLInputElement>) {
    handleNumberValue(e, e.target.value, partInfo);
  }

  function submitHandler(e: React.SyntheticEvent) {
    e.preventDefault();
    updateInfo(item.id, partInfo);
    closePopup();
    setPartInfo(defaultInputValues);
  }

  return (
    <>
      <PopupWithForm
        name="edit-part"
        title="Редактирование компонента"
        btnText="Сохранить"
        submitHandler={submitHandler}
        isPopupOpen={isPopupOpen}
        onClose={closePopup}
      >
        <Input
          name="brand"
          value={partInfo.brand}
          label="Производитель"
          inputType="text"
          getInputValue={handleTextInputValue}
        />
        <Input
          name="model"
          value={partInfo.model}
          label="Модель"
          inputType="text"
          getInputValue={handleTextInputValue}
        />

        <Input
          name="weight"
          value={partInfo.weight}
          label="Вес"
          inputType="number"
          getInputValue={handleNumberInputValue}
        />
        <Input
          name="price"
          value={partInfo.price}
          label="Цена"
          inputType="number"
          getInputValue={handleNumberInputValue}
        />
        <Select
          name={'bikeSelect'}
          items={bikes}
          defaultValue={'-- Выберите байк --'}
          getInputValue={handleSelectInputValue}
        />
      </PopupWithForm>
    </>
  );
}
