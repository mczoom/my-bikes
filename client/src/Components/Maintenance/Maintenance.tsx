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
import { SubmitHandler, useForm } from 'react-hook-form';
import BikePartsListt from './BikeParts/BikeParts';
import BikeParts from './BikeParts/BikeParts';
import { AddPartPopup } from './AddPartPopup/AddPartPopup';

interface MaintenanceProps {
  bikes: Bike[];
}

interface PartInfoFormValues {
  id: string;
  bikeSelect?: string;
  bikeName?: string;
  userID?: string;
  category: string;
  brand: string;
  model: string;
  year: string;
  weight: number;
  price: number;
  distance?: number;
  installed?: boolean;
  retired?: boolean;
  _id?: string;
}

export default function Maintenance({ bikes }: MaintenanceProps) {
  const [allParts, setAllParts] = useState<BikePart[]>([] as BikePart[]);
  const [category, setCategory] = useState<string>('');
  const [partToEdit, setPartToEdit] = useState<BikePart>({} as BikePart);
  const [isAddPartPopupOpen, setIsAddPartPopupOpen] = useState<boolean>(false);
  const [isEditPartPopupOpen, setIsEditPartPopupOpen] = useState<boolean>(false);
  const [isDeletePartPopupOpen, setIsDeletePartPopupOpen] = useState<boolean>(false);

  const snackbar = useSnackbar();
  console.log(allParts);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BikePart>({ mode: 'onChange' });

  const parts = [
    {
      title: 'Звёзды',
      link: 'chainrings',
      id: 1,
    },
    {
      title: 'Каретки',
      link: 'bbs',
      id: 2,
    },
    {
      title: 'Кассеты',
      link: 'cassettes',
      id: 3,
    },
    {
      title: 'Колёса',
      link: 'wheels',
      id: 4,
    },
    {
      title: 'Педали',
      link: 'pedals',
      id: 5,
    },
    {
      title: 'Переключатель задний',
      link: 'rd',
      id: 6,
    },
    {
      title: 'Переключатель передний',
      link: 'fd',
      id: 7,
    },
    {
      title: 'Покрышки',
      link: 'tires',
      id: 8,
    },
    {
      title: 'Рамы',
      link: 'frames',
      id: 9,
    },
    {
      title: 'Сёдла',
      link: 'saddles',
      id: 10,
    },
    {
      title: 'Тормозные колодки',
      link: 'brakepads',
      id: 11,
    },
    {
      title: 'Тросики / рубашки',
      link: 'cables',
      id: 12,
    },
    {
      title: 'Цепи',
      link: 'chains',
      id: 13,
    },
  ];

  const defaultInputValues: BikePart = {
    id: '',
    category: '',
    brand: '',
    model: '',
    year: '',
    weight: 0,
    price: 0,
  };

  function addNewPart(specs: BikePart) {
    addPart(specs)
      .then((res) => setAllParts(res))
      .catch((err) => snackbar.handleSnackbarError(err));
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

  const submitHandler: SubmitHandler<BikePart> = (data) => {
    const id = partId();
    const newPart = { ...data, id, category };
    addNewPart(newPart);
    closeAddPartPopup();
  };

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
        <BikeParts
          items={parts}
          parts={allParts}
          onOpen={openAddPartPopup}
          onOpenEdit={openEditPartPopup}
          onOpenDelete={openDeletePartPopup}
          getCategory={getAddingPartCategory}
          getEditingPart={getEditingPart}
        />
        <AddPartPopup submitHandler={submitHandler} isPopupOpen={isAddPartPopupOpen} onClose={closeAddPartPopup} />
        <EditPartInfoPopup
          item={partToEdit}
          closePopup={closeEditPartPopup}
          isPopupOpen={isEditPartPopupOpen}
          updateInfo={updatePartInfo}
          bikes={bikes}
        />
        <ConfirmationPopup
          title={'Удаление компонента'}
          text={'Удалить навсегда?'}
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
