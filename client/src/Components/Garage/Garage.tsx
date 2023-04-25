import React, {useEffect, useState} from 'react'
import { Activity } from '../../models/Activity';
import { MyBike } from '../../models/MyBike';
import BikeCardPopup from '../BikeCardPopup/BikeCardPopup';
import BikesTypeFilter from '../BikesTypeFilter/BikesTypeFilter';
import GarageBikesList from '../GarageBikesList/GarageBikesList';
import { Bike } from '../../models/Bike';
import  *  as appApi from '../../utils/appApi';
import { UserBike } from '../../models/UserBike';
import EditBikeInfoPopup from '../EditBikeInfoPopup/EditBikeInfoPopup';


interface GarageProps {
  userBikesStrava: Bike[]
  yearsAtStrava: (currentYear: number) => number[]
  activities: Activity[]
  bikeTotalDistance: (bikeId: string) => number  
}

interface BikeCardInfo {
  photo: string
  bikename: string
  brand: string  
  model: string
  year: string | number
  weight: string | number
}

export default function Garage({userBikesStrava, yearsAtStrava, activities, bikeTotalDistance}: GarageProps) {

  const [userBikes, setUserBikes] = useState<UserBike[]>([]);
  const [isBikesFilterChecked, setIsBikesFilterChecked] = useState<boolean>(false);
  const [bikesToRender, setBikesToRender] = useState<Bike[]>([]);
  const [isBikePhotoPopupOpen, setBikePhotoPopupOpen] = useState<boolean>(false);
  const [isEditPopupOpen, setEditPopupOpen] = useState<boolean>(false);
  const [bikePopupData, setBikePopupData] = useState<UserBike | undefined>({} as UserBike);
  const [curentBikeId, setCurentBikeId] = useState<string>('');

  
  function checkForNewBikesInStrava(strBikes: any, savedBikes: any) {
    return savedBikes.filter((b: any)=> console.log(strBikes.indexOf(b)))
  }

    

  function getUserBikes() {
    appApi.getAllBikes()
      .then((bikes: UserBike[]) => {        
        if(bikes) {   
          const bbb = checkForNewBikesInStrava(userBikesStrava, bikes);
          console.log(bbb);
          
          setUserBikes(bikes);
          setBikesToRender(bikes);
        }
      })
      .catch(err => console.log(err));
  };
  console.log(userBikes);

console.log(userBikesStrava);



function toggleBikesFilter() {
  setIsBikesFilterChecked(v => !v);
}

function filterBikeCardsToRender() {
  if(isBikesFilterChecked) {
    const trainerBikesToRender = userBikes.filter((bike) => {
      return bike.trainer === true;
  });
  setBikesToRender(trainerBikesToRender);
  } else {
    setBikesToRender(userBikes);
  }
}

function openBikePhotoPopup(bikeData: UserBike | undefined) {
  setBikePhotoPopupOpen(true);
  setBikePopupData(bikeData);
};

function closeBikePhotoPopup() {
  setBikePhotoPopupOpen(false);
}

function openEditBikeInfoPopup() {
  setEditPopupOpen(true);  
}

function closeEditBikeInfoPopup() {
  setEditPopupOpen(false);
}

function getBikeId(id: string) {
  setCurentBikeId(id)
}

function updateBikeCardInfo(id: string, specs: BikeCardInfo) {
  appApi.updateBikeInfo(id, specs)
    .then(updatedInfo => setBikesToRender(updatedInfo))
    .catch((err) => console.log('Ошибка обновления данных байка'));    
};

useEffect(() => {
  filterBikeCardsToRender();
}, [isBikesFilterChecked]);

useEffect(() => {
  getUserBikes();
}, [])



  return (
    <section className='garage'>
      <BikesTypeFilter toggleBikesFilter={toggleBikesFilter} />
      <GarageBikesList
        bikesToRender={bikesToRender}
        openBikePhotoPopup={openBikePhotoPopup}
        openEditInfoPopup={openEditBikeInfoPopup}
        yearsAtStrava={yearsAtStrava}
        activities={activities}
        bikeTotalDistance={bikeTotalDistance}
        getBikeId={getBikeId}
      />
      <BikeCardPopup isPopupOpen={isBikePhotoPopupOpen} bikePopupData={bikePopupData} closePopup={closeBikePhotoPopup} />
      <EditBikeInfoPopup updateInfo={updateBikeCardInfo} bikeId={curentBikeId} isPopupOpen={isEditPopupOpen} closePopup={closeEditBikeInfoPopup} />
    </section>
  )
}
