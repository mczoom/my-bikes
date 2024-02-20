import { useEffect, useState } from 'react';
import Input from 'ui/Input/Input';
import PopupWithForm from 'components/shared/PopupWithForm/PopupWithForm';
import { BikePart } from 'types/BikePart';
import { PartInfo } from 'types/PartInfo';

interface EditPartInfoPopupProps {
  updateInfo: (id: string, cat: string, specs: PartInfo) => void;
  closePopup: () => void;
  item: BikePart;
  isPopupOpen: boolean;
}

export default function EditPartInfoPopup({ item, updateInfo, isPopupOpen, closePopup }: EditPartInfoPopupProps) {
  const defaultInputValues: PartInfo = {
    category: '',
    brand: '',
    model: '',
    weight: 0,
    price: 0
  };

  const [partInfo, setPartInfo] = useState<PartInfo>(defaultInputValues);

  function handleInputValue(e: React.ChangeEvent<HTMLInputElement>, value: string | boolean, partData: PartInfo) {
    setPartInfo({ ...partData, [e.target.name]: value });
  }

  function handleTextInputValue(e: React.ChangeEvent<HTMLInputElement>) {
    handleInputValue(e, e.target.value, partInfo);
  }

  function submitHandler(e: React.SyntheticEvent) {
    e.preventDefault();
    updateInfo(item.id, item.category, partInfo);
    closePopup();
    setPartInfo(defaultInputValues);
  }

  // useEffect(() => {
  //   setTrainerCheckbox(isTrainer);
  // }, [isTrainer]);

  return (
    <>
      <PopupWithForm
        name="edit-part"
        title="Редактирование данных компонента"
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
          inputType="text"
          getInputValue={handleTextInputValue}
        />
        <Input name="price" value={partInfo.price} label="Цена" inputType="text" getInputValue={handleTextInputValue} />
      </PopupWithForm>
    </>
  );
}
