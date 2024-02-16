import { Route, Routes } from 'react-router-dom';
import BikePartsCategories from './BikePartsCategories/BikePartsCategories';
import BikePartsList from './BikePartsList/BikePartsList';
import PopupWithForm from 'components/shared/PopupWithForm/PopupWithForm';
import Input from 'components/UI/Input/Input';
import { useEffect, useState } from 'react';
import { BikePart } from 'types/BikePart';
import { addPart, getAllParts } from 'utils/appApi';
import useSnackbar from 'hooks/useSnackbar';
import { partId } from 'utils/constants';

export default function Maintenance() {
  const [isAddPartPopupOpen, setIsAddPartPopupOpen] = useState<boolean>(false);
  const [allParts, setAllParts] = useState<BikePart[]>([] as BikePart[]);
  const [partInfo, setPartInfo] = useState<BikePart>({} as BikePart);
  const [category, setCategory] = useState<string>('');

  const snackbar = useSnackbar();

  const defaultInputValues: BikePart = {
    brand: '',
    model: '',
    year: '',
    weight: 0,
    price: 0
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

  function openAddPartPopup(cat: string) {
    setIsAddPartPopupOpen(true);
    setCategory(cat);
  }

  function closeAddPartPopup() {
    setIsAddPartPopupOpen(false);
  }

  function submitHandler(e: React.SyntheticEvent) {
    e.preventDefault();
    const id = partId();
    const newPart = { ...partInfo, id, category };
    addNewPart(newPart);
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
            <Route path="chains" element={<BikePartsList cat={'chain'} parts={allParts} onOpen={openAddPartPopup} />} />
            <Route path="wheels" element={<BikePartsList cat={'wheel'} parts={allParts} onOpen={openAddPartPopup} />} />
            <Route
              path="brakepads"
              element={<BikePartsList cat={'brakepad'} parts={allParts} onOpen={openAddPartPopup} />}
            />
            <Route
              path="saddles"
              element={<BikePartsList cat={'saddle'} parts={allParts} onOpen={openAddPartPopup} />}
            />
            <Route path="frames" element={<BikePartsList cat={'frame'} parts={allParts} onOpen={openAddPartPopup} />} />
            <Route path="tires" element={<BikePartsList cat={'tire'} parts={allParts} onOpen={openAddPartPopup} />} />
            <Route path="bb" element={<BikePartsList cat={'bb'} parts={allParts} onOpen={openAddPartPopup} />} />
            <Route
              path="cassetes"
              element={<BikePartsList cat={'casset'} parts={allParts} onOpen={openAddPartPopup} />}
            />
            <Route
              path="chainrings"
              element={<BikePartsList cat={'chainring'} parts={allParts} onOpen={openAddPartPopup} />}
            />
            <Route path="pedals" element={<BikePartsList cat={'pedal'} parts={allParts} onOpen={openAddPartPopup} />} />
            <Route path="cables" element={<BikePartsList cat={'cable'} parts={allParts} onOpen={openAddPartPopup} />} />
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
    </section>
  );
}
