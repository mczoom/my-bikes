import {useEffect, useState} from 'react'
import { Activity } from 'types/Activity';
import BikeCardPopup from 'components/shared/BikeCardPopup/BikeCardPopup';

import GarageBikesList from 'components/Main/Garage/GarageBikesList/GarageBikesList';
import { Bike } from 'types/Bike';
import  *  as appApi from 'utils/appApi';
import { UserBike } from 'types/UserBike';
import EditBikeInfoPopup from 'components/Main/Garage/EditBikeInfoPopup/EditBikeInfoPopup';
import useSnackbar from 'hooks/useSnackbar';
import useBikes from 'hooks/useBikes';
import Checkbox from 'components/shared/Checkbox/Checkbox';


interface GarageProps {
  userBikes: Bike[]
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

export default function Garage({userBikes, yearsAtStrava, activities}: GarageProps) {

  //const bikes = useBikes();
  const snackbar = useSnackbar();
  console.log(userBikes);
  

  const [isBikesFilterChecked, setIsBikesFilterChecked] = useState<boolean>(false);
  const [bikesToRender, setBikesToRender] = useState<Bike[]>(userBikes);
  const [isBikePhotoPopupOpen, setBikePhotoPopupOpen] = useState<boolean>(false);
  const [isEditPopupOpen, setEditPopupOpen] = useState<boolean>(false);
  const [bikePopupData, setBikePopupData] = useState<UserBike | undefined>({} as UserBike);
  const [curentBikeId, setCurentBikeId] = useState<string>('');

  console.log(bikesToRender);
  //console.log(bikes);
  
     
  function toggleBikesFilter() {
    setIsBikesFilterChecked(v => !v);
  };

  function filterBikeCardsToRender(bikes: Bike[]) {
    if(isBikesFilterChecked) {
      const trainerBikesToRender = bikes.filter((bike) => {
        return bike.trainer === true;
      });
      setBikesToRender(trainerBikesToRender);
    } else {
      console.log('AAAAAA');
      
      setBikesToRender(bikes);
    }
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
      .then(updatedInfo => setBikesToRender(updatedInfo))
      .catch((err) => snackbar.handleSnackbarError(err));    
  };

  function addTrainer(id: string, trainer: any) {
    appApi.updateBikeInfo(id, trainer)
      .then(updatedInfo => console.log(updatedInfo))
      .catch((err) => snackbar.handleSnackbarError(err));    
  };
  console.log(isBikesFilterChecked);
  

  // useEffect(() => {
    
  //   setBikesToRender(bikes)
  // }, [bikes]);

  useEffect(() => {
    filterBikeCardsToRender(userBikes);
  }, [isBikesFilterChecked, userBikes]);

  



  return (
    <section className='garage'>
      <Checkbox text='Показать только велостанки' onChange={toggleBikesFilter} />
      {/* <input type='checkbox' className='type-filter__checkbox' onChange={toggleBikesFilter}/> */}
      <GarageBikesList
        bikesToRender={bikesToRender}
        openBikePhotoPopup={openBikePhotoPopup}
        openEditInfoPopup={openEditBikeInfoPopup}
        yearsAtStrava={yearsAtStrava}
        activities={activities}
        getBikeId={getBikeId}
      />
      <BikeCardPopup isPopupOpen={isBikePhotoPopupOpen} bikePopupData={bikePopupData} closePopup={closeBikePhotoPopup} />
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