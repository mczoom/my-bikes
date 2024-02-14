import { Route, Routes } from 'react-router-dom';
import BikePartsCategories from './BikePartsCategories/BikePartsCategories';
import BikePartsList from './BikePartsList/BikePartsList';
import PopupWithForm from 'components/shared/PopupWithForm/PopupWithForm';
import Input from 'components/UI/Input/Input';
import { useEffect, useState } from 'react';
import { BikePart } from 'types/BikePart';
import { addPart, getAllParts } from 'utils/appApi';
import useSnackbar from 'hooks/useSnackbar';

export default function Maintenance() {
  const [isAddPartPopupOpen, setIsAddPartPopupOpen] = useState<boolean>(false);
  const [allParts, setAllParts] = useState<BikePart[]>([]);
  const [partInfo, setPartInfo] = useState<BikePart>({} as BikePart);

  const snackbar = useSnackbar();

  const defaultInputValues: BikePart = {
    brand: '',
    model: '',
    year: '',
    weight: '',
    price: ''
  };

  function addNewPart(specs: BikePart) {
    addPart(specs)
      .then((res) => setAllParts(res))
      .catch((err) => snackbar.handleSnackbarError(err));
  }

  function handleInputValue(
    e: React.ChangeEvent<HTMLInputElement>,
    value: string | number | boolean,
    partData: BikePart
  ) {
    setPartInfo({ ...partData, [e.target.name]: value });
  }

  function handleTextInputValue(e: React.ChangeEvent<HTMLInputElement>) {
    handleInputValue(e, e.target.value, partInfo);
  }

  function openAddPartPopup() {
    setIsAddPartPopupOpen(true);
  }

  function closeAddPartPopup() {
    setIsAddPartPopupOpen(false);
  }

  function submitHandler(e: React.SyntheticEvent) {
    e.preventDefault();
    addNewPart(partInfo);
    closeAddPartPopup();
    setPartInfo(defaultInputValues);
  }

  useEffect(() => {
    let ignore = false;
    getAllParts().then((parts) => {
      if (!ignore) {
        setAllParts(parts);
      }
    });
    return () => {
      ignore = true;
    };
  }, []);

  return (
    <section className="maintenance">
      <h1 className="maintenance__header">
        Раздел для отслеживания пробега различных компонентов велосипеда и проведения своевременного ТО
      </h1>
      <div className="maintenance__content-wrapper">
        <div className="maintenance__parts-categories">
          <BikePartsCategories />
        </div>
        <div className="maintenance__parts-list">
          <Routes>
            <Route path="chains" element={<BikePartsList parts={allParts} />} />
            <Route path="wheels" element={<BikePartsList parts={allParts} />} />
            <Route path="frames" element={<BikePartsList parts={allParts} />} />
            <Route path="tires" element={<BikePartsList parts={allParts} />} />
            <Route path="bb" element={<BikePartsList parts={allParts} />} />
            <Route path="chainrings" element={<BikePartsList parts={allParts} />} />
          </Routes>
        </div>
        <PopupWithForm
          name="add-bike-part"
          title="Добавить компонент"
          btnText="Сохранить"
          submitHandler={submitHandler}
          isPopupOpen={isAddPartPopupOpen}
          onClose={closeAddPartPopup}
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
            name="year"
            value={partInfo.year}
            label="Модельный год"
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
          <Input
            name="price"
            value={partInfo.price}
            label="Цена"
            inputType="text"
            getInputValue={handleTextInputValue}
          />
        </PopupWithForm>
      </div>
      <button onClick={openAddPartPopup}>+ Добавить компонент</button>
    </section>
  );
}
