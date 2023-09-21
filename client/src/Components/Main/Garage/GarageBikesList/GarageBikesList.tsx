import GarageBikeCard from 'components/Main/Garage/GarageBikeCard/GarageBikeCard';
import { Activity } from 'types/Activity';
import { Bike } from 'types/Bike';
import { UserBike } from 'types/UserBike';


interface GarageBikesListProps {
  openBikePhotoPopup: (bikeData: UserBike | undefined) => void
  openEditInfoPopup: () => void
  yearsAtStrava: (currentYear: number) => number[]
  activities: Activity[]
  bikesToRender: Bike[]
  bikeTotalDistance: (bikeId: string) => number
  getBikeId: (id: string) => void
}


export default function GarageBikesList({bikesToRender, openBikePhotoPopup, openEditInfoPopup, yearsAtStrava, activities, bikeTotalDistance, getBikeId}: GarageBikesListProps) {
  
  return (
    <ul className='bike-cards-list'>
      {bikesToRender.map((bike) => (
        <li key={bike.id} className='bike-cards-list__item'>
          <GarageBikeCard bike={bike} openBikePhotoPopup={openBikePhotoPopup} openEditInfoPopup={openEditInfoPopup} yearsAtStrava={yearsAtStrava} activities={activities} bikeTotalDistance={bikeTotalDistance} getBikeId={getBikeId} />
        </li>
      ))}
    </ul>
  )
}
