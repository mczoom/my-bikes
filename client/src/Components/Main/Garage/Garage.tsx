import {useEffect, useState} from 'react'
import { Activity } from 'types/Activity';
import BikeCardPopup from 'components/shared/BikeCardPopup/BikeCardPopup';
import BikesTypeFilter from 'components/shared/BikesTypeFilter/BikesTypeFilter';
import GarageBikesList from 'components/Main/Garage/GarageBikesList/GarageBikesList';
import { Bike } from 'types/Bike';
import  *  as appApi from 'utils/appApi';
import { UserBike } from 'types/UserBike';
import EditBikeInfoPopup from 'components/Main/Garage/EditBikeInfoPopup/EditBikeInfoPopup';
import useSnackbar from 'hooks/useSnackbar';


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

  const snackbar = useSnackbar();

  
  
  function checkForNewBikesInStrava(stravaBikes: Bike[], savedBikes: Bike[]): Bike[] {    
    const newBike = stravaBikes.filter((b) => savedBikes.every((bike) => !bike.id.includes(b.id)));        
    return newBike;
  };

  function addNewBike(bikes: Bike | Bike[]) {
    appApi.addBike(bikes)
    .catch((err) => snackbar.handleSnackbarError(err));
  }; 
    

  function getUserBikes() {
    appApi.getAllBikes()
      .then((bikes: UserBike[]) => {
        const newBikes = checkForNewBikesInStrava(userBikesStrava, bikes);
          if(newBikes.length > 0) {
            addNewBike(newBikes);
          }    
          setUserBikes(bikes); 
          setBikesToRender(bikes);       
      })
      .catch(err => snackbar.handleSnackbarError(err));
  }; 


  function toggleBikesFilter() {
    setIsBikesFilterChecked(v => !v);
  };

  function filterBikeCardsToRender() {
    if(isBikesFilterChecked) {
      const trainerBikesToRender = userBikes.filter((bike) => {
        return bike.trainer === true;
    });
    setBikesToRender(trainerBikesToRender);
    } else {
      setBikesToRender(userBikes);
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

  useEffect(() => {
    filterBikeCardsToRender();
  }, [isBikesFilterChecked]);

  useEffect(() => {
    getUserBikes();
  }, [])

console.log(userBikes);
console.log(userBikesStrava);

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
