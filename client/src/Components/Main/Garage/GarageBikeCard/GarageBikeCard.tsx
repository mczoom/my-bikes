import BikeSpecs from 'components/Main/Garage/BikeSpecs/BikeSpecs';
import DistancePerYearList from 'components/Main/Garage/DistancePerYearList/DistancePerYearList';
import { Activity } from 'types/Activity';
import { UserBike } from 'types/UserBike';
import { convertDistanceToKM } from 'utils/constants';


interface BikeCardProps {
  bike: UserBike
  openBikePhotoPopup: (bikeData: UserBike | undefined) => void
  openEditInfoPopup: () => void
  yearsAtStrava: number[]
  activities: Activity[]
  getBikeId: (id: string) => void
}


export default function GarageBikeCard({bike, openBikePhotoPopup, openEditInfoPopup, yearsAtStrava, activities, getBikeId}: BikeCardProps) {

  function openPhotoPopup() {
    openBikePhotoPopup(bike);
  };

  function getDistancePerYear (y: number): number {
    let distance = 0;
    activities.forEach((act: Activity) => {
      if(new Date(act.start_date_local).getFullYear() === y && bike.id === act.gear_id) {
        distance += act.distance;
      }
    })
    return convertDistanceToKM(distance);
  };

  

  return (
    <div className='bike-card' >
      <div className='bike-card__wrap'>
        <div className='bike-card__image-wrap'>        
          <img src={bike?.photo} className='bike-card__image' onClick={openPhotoPopup}></img>
        </div>  
        <BikeSpecs bike={bike} getBikeId={getBikeId} openEditInfoPopup={openEditInfoPopup} />
        <DistancePerYearList yearsAtStrava={yearsAtStrava} distancePerYear={getDistancePerYear} />
      </div>
    </div>
  )
}
