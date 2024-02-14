import GarageBikeCard from 'components/Main/Garage/GarageBikeCard/GarageBikeCard';
import EmptyListMessage from 'components/UI/EmptyListMessage/EmptyListMessage';
import { Activity } from 'types/Activity';
import { Bike } from 'types/Bike';
import { UserBike } from 'types/UserBike';

interface GarageBikesListProps {
  openBikePhotoPopup: (bikeData: UserBike | undefined) => void;
  openEditInfoPopup: () => void;
  yearsAtStrava: number[];
  activities: Activity[];
  bikesToRender: Bike[];
  getEditingBike: (bike: Bike) => void;
  bikes: Bike[];
}

export default function GarageBikesList({
  bikes,
  bikesToRender,
  openBikePhotoPopup,
  openEditInfoPopup,
  yearsAtStrava,
  activities,
  getEditingBike
}: GarageBikesListProps) {
  return (
    <ul className="bike-cards-list">
      {bikesToRender.length ? (
        bikesToRender.map((bike) => (
          <li key={bike.id} className="bike-cards-list__item">
            <GarageBikeCard
              bike={bike}
              openBikePhotoPopup={openBikePhotoPopup}
              openEditInfoPopup={openEditInfoPopup}
              yearsAtStrava={yearsAtStrava}
              activities={activities}
              getEditingBike={getEditingBike}
            />
          </li>
        ))
      ) : (
        <EmptyListMessage text="Байки не найдены" />
      )}
    </ul>
  );
}
