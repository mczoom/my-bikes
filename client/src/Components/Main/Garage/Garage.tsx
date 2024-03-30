import { useState } from 'react';
import { Activity } from 'types/Activity';
import BikeCardPopup from 'components/shared/BikeCardPopup/BikeCardPopup';
import GarageBikesList from 'components/Main/Garage/GarageBikesList/GarageBikesList';
import { Bike } from 'types/Bike';
import * as appApi from 'utils/appApi';
import { UserBike } from 'types/UserBike';
import EditBikeInfoPopup from 'components/Main/Garage/EditBikeInfoPopup/EditBikeInfoPopup';
import useSnackbar from 'hooks/useSnackbar';
import Checkbox from 'components/shared/Checkbox/Checkbox';
import { useForm } from 'react-hook-form';

interface GarageProps {
  savedBikes: Bike[];
  setSavedBikes: React.Dispatch<React.SetStateAction<Bike[]>>;
  yearsAtStrava: number[];
  activities: Activity[];
}

interface BikeCardInfo {
  photo: string | null;
  bikename: string | null;
  brand: string | null;
  model: string | null;
  year: string | number | null;
  weight: string | number | null;
  trainer?: boolean;
}

export default function Garage({ savedBikes, setSavedBikes, yearsAtStrava, activities }: GarageProps) {
  const {
    register,
    watch,
    formState: { errors },
  } = useForm<BikeCardInfo>({ mode: 'onChange' });

  const snackbar = useSnackbar();

  const [isBikesFilterChecked, setIsBikesFilterChecked] = useState<boolean>(false);
  const [isBikePhotoPopupOpen, setBikePhotoPopupOpen] = useState<boolean>(false);
  const [isEditPopupOpen, setEditPopupOpen] = useState<boolean>(false);
  const [bikePopupData, setBikePopupData] = useState<UserBike | undefined>({} as UserBike);
  const [bikeToEdit, setBikeToEdit] = useState<Bike>({} as Bike);

  const watchBikesFilter = watch('trainer', false);

  function filterBikeCardsToRender(bikes: Bike[], filter: boolean | undefined) {
    const filteredBikes = bikes.filter((bike) => {
      if (filter) {
        return bike.trainer === true;
      } else {
        return bike;
      }
    });
    return filteredBikes;
  }

  const bikesToRender = filterBikeCardsToRender(savedBikes, watchBikesFilter);

  function openBikePhotoPopup(bikeData: UserBike | undefined) {
    setBikePhotoPopupOpen(true);
    setBikePopupData(bikeData);
  }

  function closeBikePhotoPopup() {
    setBikePhotoPopupOpen(false);
  }

  function openEditBikeInfoPopup() {
    setEditPopupOpen(true);
  }

  function closeEditBikeInfoPopup() {
    setEditPopupOpen(false);
  }

  function getEditingBike(bike: Bike) {
    setBikeToEdit(bike);
  }

  function updateBikeCardInfo(id: string, specs: BikeCardInfo) {
    appApi
      .updateBikeInfo(id, specs)
      .then((res) => setSavedBikes(res))
      .catch((err) => snackbar.handleSnackbarError(err));
  }

  return (
    <section className="garage">
      <Checkbox text="Показать только велостанки" register={register} name="trainer" />
      <GarageBikesList
        bikesToRender={bikesToRender}
        openBikePhotoPopup={openBikePhotoPopup}
        openEditInfoPopup={openEditBikeInfoPopup}
        yearsAtStrava={yearsAtStrava}
        activities={activities}
        getEditingBike={getEditingBike}
        bikes={savedBikes}
      />
      <BikeCardPopup
        isPopupOpen={isBikePhotoPopupOpen}
        bikePopupData={bikePopupData}
        closePopup={closeBikePhotoPopup}
      />
      <EditBikeInfoPopup
        key={bikeToEdit.id}
        bike={bikeToEdit}
        updateInfo={updateBikeCardInfo}
        isPopupOpen={isEditPopupOpen}
        closePopup={closeEditBikeInfoPopup}
      />
    </section>
  );
}
