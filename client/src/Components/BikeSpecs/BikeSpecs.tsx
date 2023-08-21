import React, { useEffect } from 'react';
import { Bike } from '../../models/Bike';
import { UserBike } from '../../models/UserBike';
import EditButton from '../EditButton/EditButton';
import { ActivitiesLoadingState } from '../../contexts/ActivitiesLoadingState';
import { Preloader } from '../Preloader/Preloader';
import { Activity } from '../../models/Activity';


interface BikeSpecsProps {
  bike: UserBike
  activities: Activity[]
  bikeTotalDistance: (bikeId: string, activities: Activity[]) => number
  openEditInfoPopup: () => void
  getBikeId: (id: string) => void
}

export default function BikeSpecs({bike, activities, bikeTotalDistance, openEditInfoPopup, getBikeId}: BikeSpecsProps) {

  const hasAllActivitiesLoaded = React.useContext(ActivitiesLoadingState);


  return (
    <div className='bike-specs'>
      <ul className='bike-specs__specs-list'>
        <li className='bike-specs__spec'>
          <h2 className='bike-specs__bike-name'>{bike.name}</h2>
        </li>
        <li className='bike-specs__spec'>
          <p className='spec'>Бренд: <span className='bold'>{bike.brand || 'н/д'}</span></p>
        </li>
        <li className='bike-specs__spec'>
          <p className='spec'>Модель: <span className='bold'>{bike.model || 'н/д'}</span></p>
        </li>
        <li className='bike-specs__spec'>
          <p className='spec'>Год: <span className='bold'>{bike.year || 'н/д'}</span></p>
        </li>
        <li className='bike-specs__spec'>
          <p className='spec'>Вес: <span className='bold'>{bike.weight || 'н/д'}</span></p>
        </li>
        <li className='bike-specs__spec'>
          {hasAllActivitiesLoaded ? (
            <p className='spec'>Пробег:
              <span className='bold'> {Math.round(bikeTotalDistance(bike.id, activities) / 1000)} км</span>
            </p> 
          ) : (
            <div className='spec__preloader-container'>
              <p className='spec'>Пробег: </p>
              <div className='preloader_XS'>
                <Preloader isLoading={!hasAllActivitiesLoaded}/>              
              </div>
            </div>
          )}         
        </li>
      </ul>
      <EditButton bike={bike} getBikeId={getBikeId} text={'Редактировать'} openPopup={openEditInfoPopup}/>
    </div>
  )
}
