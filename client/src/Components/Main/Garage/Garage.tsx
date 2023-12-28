import {useEffect, useState} from 'react'
import { Activity } from 'types/Activity';
import BikeCardPopup from 'components/shared/BikeCardPopup/BikeCardPopup';
import GarageBikesList from 'components/Main/Garage/GarageBikesList/GarageBikesList';
import { Bike } from 'types/Bike';
import  *  as appApi from 'utils/appApi';
import { UserBike } from 'types/UserBike';
import EditBikeInfoPopup from 'components/Main/Garage/EditBikeInfoPopup/EditBikeInfoPopup';
import useSnackbar from 'hooks/useSnackbar';
import Checkbox from 'components/shared/Checkbox/Checkbox';
import useBikes from 'hooks/useBikes';


interface GarageProps {
  yearsAtStrava: number[]
  activities: Activity[]
}

interface BikeCardInfo {
  photo: string
  bikename: string
  brand: string  
  model: string
  year: string | number
  weight: string | number
  trainer?: boolean
}

export default function Garage({yearsAtStrava, activities}: GarageProps) {

  const userBikes = useBikes();
  const snackbar = useSnackbar();  

  const [isBikesFilterChecked, setIsBikesFilterChecked] = useState<boolean>(false);
  const [savedBikes, setSavedBikes] = useState<Bike[]>([]);
  const [bikesToRender, setBikesToRender] = useState<Bike[]>([]);
  const [isBikePhotoPopupOpen, setBikePhotoPopupOpen] = useState<boolean>(false);
  const [isEditPopupOpen, setEditPopupOpen] = useState<boolean>(false);
  const [bikePopupData, setBikePopupData] = useState<UserBike | undefined>({} as UserBike);
  const [curentBikeId, setCurentBikeId] = useState<string>('');
  
     

  function filterBikeCardsToRender(bikes: Bike[], filter: boolean) {
    if(!filter) {
      const trainerBikesToRender = bikes.filter((bike) => {
        return bike.trainer === true;
      });
      setBikesToRender(trainerBikesToRender);
    } else {
      setBikesToRender(bikes);
    }
  };


  function toggleBikesFilter() {
    setIsBikesFilterChecked(v => !v);    
    filterBikeCardsToRender(savedBikes, isBikesFilterChecked)
  };
  

  function openBikePhotoPopup(bikeData: UserBike | undefined) {
    setBikePhotoPopupOpen(true);
    setBikePopupData(bikeData);
  };

  function closeBikePhotoPopup() {
    setBikePhotoPopupOpen(false);
  };

  function openEditBikeInfoPopup() {
    setEditPopupOpen(true);  
  };

  function closeEditBikeInfoPopup() {
    setEditPopupOpen(false);
  };

  function getBikeId(id: string) {
    setCurentBikeId(id)
  };

  function updateBikeCardInfo(id: string, specs: BikeCardInfo) {
    appApi.updateBikeInfo(id, specs)
      .then(updatedInfo => setSavedBikes(updatedInfo))
      .catch((err) => snackbar.handleSnackbarError(err));    
  };


  useEffect(() => {
    setSavedBikes(userBikes);
    setBikesToRender(userBikes)
  }, [userBikes]); 
  
  
  // useEffect(() => {
  //   filterBikeCardsToRender(savedBikes);
  // }, [isBikesFilterChecked, savedBikes]);


  return (
    <section className='garage'>
      <Checkbox text='Показать только велостанки' onChange={toggleBikesFilter} />
      <GarageBikesList
        bikesToRender={bikesToRender}
        openBikePhotoPopup={openBikePhotoPopup}
        openEditInfoPopup={openEditBikeInfoPopup}
        yearsAtStrava={yearsAtStrava}
        activities={activities}
        getBikeId={getBikeId}
      />
      <BikeCardPopup 
        isPopupOpen={isBikePhotoPopupOpen} 
        bikePopupData={bikePopupData} 
        closePopup={closeBikePhotoPopup} 
      />
      <EditBikeInfoPopup 
        bikes={bikesToRender} 
        bikeId={curentBikeId}  
        updateInfo={updateBikeCardInfo}
        isPopupOpen={isEditPopupOpen} 
        closePopup={closeEditBikeInfoPopup} 
      />
    </section>
  )
}