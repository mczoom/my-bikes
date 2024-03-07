import { Route, Routes } from 'react-router-dom';
import * as appApi from 'utils/appApi';
import BikePartsCategories from './BikePartsCategories/BikePartsCategories';
import BikePartsList from './BikePartsList/BikePartsList';
import PopupWithForm from 'components/shared/PopupWithForm/PopupWithForm';
import Input from 'components/UI/Input/Input';
import { useEffect, useState } from 'react';
import { BikePart } from 'types/BikePart';
import { addPart, getAllParts } from 'utils/appApi';
import useSnackbar from 'hooks/useSnackbar';
import { partId } from 'utils/constants';
import { PartInfo } from 'types/PartInfo';
import EditPartInfoPopup from './EditPartInfoPopup/EditPartInfoPopup';
import { Bike } from 'types/Bike';
import ConfirmationPopup from 'components/shared/ConfirmationPopup/ConfirmationPopup';
import Navigation from 'components/Header/NavBar/NavBar';

interface MaintenanceProps {
  bikes: Bike[];
}

export default function Maintenance({ bikes }: MaintenanceProps) {
  const [allParts, setAllParts] = useState<BikePart[]>([] as BikePart[]);
  const [partInfo, setPartInfo] = useState<BikePart>({} as BikePart);
  const [category, setCategory] = useState<string>('');
  const [partToEdit, setPartToEdit] = useState<BikePart>({} as BikePart);
  const [isAddPartPopupOpen, setIsAddPartPopupOpen] = useState<boolean>(false);
  const [isEditPartPopupOpen, setIsEditPartPopupOpen] = useState<boolean>(false);
  const [isDeletePartPopupOpen, setIsDeletePartPopupOpen] = useState<boolean>(false);

  const snackbar = useSnackbar();
  console.log(allParts);

  const parts = [
    {
      title: 'Звёзды',
      link: 'chainrings'
    },
    {
      title: 'Каретки',
      link: 'bbs'
    },
    {
      title: 'Кассеты',
      link: 'cassettes'
    },
    {
      title: 'Колёса',
      link: 'wheels'
    },
    {
      title: 'Педали',
      link: 'pedals'
    },
    {
      title: 'Покрышки',
      link: 'tires'
    },
    {
      title: 'Рамы',
      link: 'frames'
    },
    {
      title: 'Сёдла',
      link: 'saddles'
    },
    {
      title: 'Тормозные колодки',
      link: 'brakepads'
    },
    {
      title: 'Тросики / рубашки',
      link: 'cables'
    },
    {
      title: 'Цепи',
      link: 'chains'
    }
  ];

  const defaultInputValues: BikePart = {
    id: '',
    category: '',
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

  function openAddPartPopup() {
    setIsAddPartPopupOpen(true);
  }

  function getAddingPartCategory(cat: string) {
    setCategory(cat);
  }

  function openEditPartPopup() {
    setIsEditPartPopupOpen(true);
  }

  function openDeletePartPopup() {
    setIsDeletePartPopupOpen(true);
  }

  function getEditingPart(part: BikePart) {
    setPartToEdit(part);
  }

  function closeAddPartPopup() {
    setIsAddPartPopupOpen(false);
  }

  function closeEditPartPopup() {
    setIsEditPartPopupOpen(false);
  }

  function closeDeletePartPopup() {
    setIsDeletePartPopupOpen(false);
  }

  function submitHandler(e: React.SyntheticEvent) {
    e.preventDefault();
    const id = partId();
    const newPart = { ...partInfo, id, category };
    addNewPart(newPart);
    closeAddPartPopup();
    setPartInfo(defaultInputValues);
  }

  function updatePartInfo(id: string, specs: PartInfo) {
    appApi
      .updatePartInfo(id, specs)
      .then((res) => setAllParts(res))
      .catch((err) => snackbar.handleSnackbarError(err));
  }

  function deletePart(id: string) {
    appApi
      .deletePart(id)
      .then((res) => setAllParts(res))
      .catch((err) => snackbar.handleSnackbarError(err));
  }

  useEffect(() => {
    let ignore = false;
    getAllParts()
      .then((parts) => {
        if (!ignore) {
          setAllParts(parts);
        }
      })
      .catch((err) => console.log(err));
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
        <div className="maintenance__parts-categories navigation__nav-links_column">
          <BikePartsCategories navLinks={parts} />
        </div>
        <div className="maintenance__parts-list">
          <Routes>
            <Route
              path="chainrings"
              element={
                <BikePartsList
                  cat={'chainrings'}
                  parts={allParts}
                  onOpen={openAddPartPopup}
                  onOpenEdit={openEditPartPopup}
                  onOpenDelete={openDeletePartPopup}
                  getCategory={getAddingPartCategory}
                  getEditingPart={getEditingPart}
                />
              }
            />
            <Route
              path="bbs"
              element={
                <BikePartsList
                  cat={'bbs'}
                  parts={allParts}
                  onOpen={openAddPartPopup}
                  onOpenEdit={openEditPartPopup}
                  onOpenDelete={openDeletePartPopup}
                  getCategory={getAddingPartCategory}
                  getEditingPart={getEditingPart}
                />
              }
            />
            <Route
              path="cassettes"
              element={
                <BikePartsList
                  cat={'cassettes'}
                  parts={allParts}
                  onOpen={openAddPartPopup}
                  onOpenEdit={openEditPartPopup}
                  onOpenDelete={openDeletePartPopup}
                  getCategory={getAddingPartCategory}
                  getEditingPart={getEditingPart}
                />
              }
            />
            <Route
              path="wheels"
              element={
                <BikePartsList
                  cat={'wheels'}
                  parts={allParts}
                  onOpen={openAddPartPopup}
                  onOpenEdit={openEditPartPopup}
                  onOpenDelete={openDeletePartPopup}
                  getCategory={getAddingPartCategory}
                  getEditingPart={getEditingPart}
                />
              }
            />
            <Route
              path="pedals"
              element={
                <BikePartsList
                  cat={'pedals'}
                  parts={allParts}
                  onOpen={openAddPartPopup}
                  onOpenEdit={openEditPartPopup}
                  onOpenDelete={openDeletePartPopup}
                  getCategory={getAddingPartCategory}
                  getEditingPart={getEditingPart}
                />
              }
            />
            <Route
              path="tires"
              element={
                <BikePartsList
                  cat={'tires'}
                  parts={allParts}
                  onOpen={openAddPartPopup}
                  onOpenEdit={openEditPartPopup}
                  onOpenDelete={openDeletePartPopup}
                  getCategory={getAddingPartCategory}
                  getEditingPart={getEditingPart}
                />
              }
            />
            <Route
              path="frames"
              element={
                <BikePartsList
                  cat={'frames'}
                  parts={allParts}
                  onOpen={openAddPartPopup}
                  onOpenEdit={openEditPartPopup}
                  onOpenDelete={openDeletePartPopup}
                  getCategory={getAddingPartCategory}
                  getEditingPart={getEditingPart}
                />
              }
            />
            <Route
              path="saddles"
              element={
                <BikePartsList
                  cat={'saddles'}
                  parts={allParts}
                  onOpen={openAddPartPopup}
                  onOpenEdit={openEditPartPopup}
                  onOpenDelete={openDeletePartPopup}
                  getCategory={getAddingPartCategory}
                  getEditingPart={getEditingPart}
                />
              }
            />
            <Route
              path="brakepads"
              element={
                <BikePartsList
                  cat={'brakepads'}
                  parts={allParts}
                  onOpen={openAddPartPopup}
                  onOpenEdit={openEditPartPopup}
                  onOpenDelete={openDeletePartPopup}
                  getCategory={getAddingPartCategory}
                  getEditingPart={getEditingPart}
                />
              }
            />
            <Route
              path="cables"
              element={
                <BikePartsList
                  cat={'cables'}
                  parts={allParts}
                  onOpen={openAddPartPopup}
                  onOpenEdit={openEditPartPopup}
                  onOpenDelete={openDeletePartPopup}
                  getCategory={getAddingPartCategory}
                  getEditingPart={getEditingPart}
                />
              }
            />
            <Route
              path="chains"
              element={
                <BikePartsList
                  cat={'chains'}
                  parts={allParts}
                  onOpen={openAddPartPopup}
                  onOpenEdit={openEditPartPopup}
                  onOpenDelete={openDeletePartPopup}
                  getCategory={getAddingPartCategory}
                  getEditingPart={getEditingPart}
                />
              }
            />
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
        <EditPartInfoPopup
          item={partToEdit}
          closePopup={closeEditPartPopup}
          isPopupOpen={isEditPartPopupOpen}
          updateInfo={updatePartInfo}
          bikes={bikes}
        />
        <ConfirmationPopup
          title={'Вы действительно хотите удалить компонент?'}
          ConfirmBtnText={'Удалить'}
          CancelBtnText={'Отмена'}
          onDelete={deletePart}
          isPopupOpen={isDeletePartPopupOpen}
          onClose={closeDeletePartPopup}
          partId={partToEdit.id}
        />
      </div>
    </section>
  );
}
