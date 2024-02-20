import { useContext } from 'react';
import { UserBike } from 'types/UserBike';
import EditButton from 'ui/EditButton/EditButton';
import { ActivitiesLoadingState } from 'contexts/ActivitiesLoadingState';
import { Preloader } from 'ui/Preloader/Preloader';
import { Bike } from 'types/Bike';

interface BikeSpecsProps {
  bike: UserBike;
  openEditInfoPopup: () => void;
  getEditingBike: (item: Bike) => void;
}

export default function BikeSpecs({ bike, openEditInfoPopup, getEditingBike }: BikeSpecsProps) {
  const hasAllActivitiesLoaded = useContext(ActivitiesLoadingState);
  const totalDist = Math.round(bike.converted_distance);

  return (
    <div className="bike-specs">
      <ul className="bike-specs__specs-list">
        <li className="bike-specs__spec">
          <h2 className="bike-specs__bike-name">{bike.name}</h2>
        </li>
        <li className="bike-specs__spec">
          <p className="spec">
            Бренд: <span className="bold">{bike.brand || 'н/д'}</span>
          </p>
        </li>
        <li className="bike-specs__spec">
          <p className="spec">
            Модель: <span className="bold">{bike.model || 'н/д'}</span>
          </p>
        </li>
        <li className="bike-specs__spec">
          <p className="spec">
            Год: <span className="bold">{bike.year || 'н/д'}</span>
          </p>
        </li>
        <li className="bike-specs__spec">
          <p className="spec">
            Вес: <span className="bold">{bike.weight || 'н/д'}</span>
          </p>
        </li>
        <li className="bike-specs__spec">
          {hasAllActivitiesLoaded ? (
            <p className="spec">
              Пробег:
              <span className="bold"> {totalDist} км</span>
            </p>
          ) : (
            <div className="spec__preloader-container">
              <p className="spec">Пробег: </p>
              <div className="preloader_XS">
                <Preloader isLoading={!hasAllActivitiesLoaded} />
              </div>
            </div>
          )}
        </li>
      </ul>
      <EditButton item={bike} getEditingItem={getEditingBike} openPopup={openEditInfoPopup} />
    </div>
  );
}
