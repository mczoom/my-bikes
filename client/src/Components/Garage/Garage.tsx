import React, {useEffect, useState} from 'react'
import { Activity } from '../../models/Activity';
import { MyBike } from '../../models/MyBike';
import BikeCardPopup from '../BikeCardPopup/BikeCardPopup';
import BikesTypeFilter from '../BikesTypeFilter/BikesTypeFilter';
import GarageBikesList from '../GarageBikesList/GarageBikesList';
import NS26 from '../../images/bikes/26.jpg';
import deli from '../../images/bikes/deli.jpg';
import deliIndoor from '../../images/bikes/deli_indoor.jpg';
import trek from '../../images/bikes/trek.jpg';
import trekIndoor from '../../images/bikes/trek_indoor.jpg';


interface GarageProps {
  yearsAtStrava: (currentYear: number) => number[]
  activities: Activity[]
  bikeTotalDistance: (bikeId: string) => number
}

export default function Garage({yearsAtStrava, activities, bikeTotalDistance}: GarageProps) {

  const [isBikesFilterChecked, setIsBikesFilterChecked] = useState<boolean>(false);
  const [bikesToRender, setBikesToRender] = useState<MyBike[]>([]);
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
  const [bikePopupData, setBikePopupData] = useState<MyBike | undefined>({} as MyBike);


  const myBikes: MyBike[] = [
    {
      id: 'b7840399',
      name: 'Trek',
      src: trek,
      brand: 'Trek',
      model: 'Alpha 1.5',
      year: 2015,
      weight: 9,
      trainer: false
    },
    {
      id: 'b11562279',
      name: 'Delihea',
      src: deli,
      brand: 'Delihea',
      model: 'Rest',
      year: 2022,
      weight: 8,
      trainer: false
    },
    {
      id: 'b8653526',
      name: 'Trek (indoor)',
      src: trekIndoor,
      brand: 'b-twin',
      model: 'InRide 500',
      year: 2021,
      trainer: true
    },
    {
      id: 'b11690555',
      name: 'Delihea (indoor)',
      src: deliIndoor,
      brand: 'b-twin',
      model: 'InRide 500',
      year: 2021,
      trainer: true
    },
    {
      id: 'b6048640',
      name: 'NS Clash',
      src: NS26,
      brand: 'NS',
      model: 'Clash',
      year: 2015,
      weight: 13,
      trainer: false
    }
  ]


function toggleBikesFilter() {
  setIsBikesFilterChecked(v => !v);
}

function filterBikeCardsToRender() {
  if(isBikesFilterChecked) {
    const trainerBikesToRender = myBikes.filter((bike) => {
      return bike.trainer === true;
  });
  setBikesToRender(trainerBikesToRender);
  } else {
    setBikesToRender(myBikes);
  }
}

function openBikePopup(bikeData: MyBike | undefined) {
  setIsPopupOpen(true);
  setBikePopupData(bikeData);
}

function closeBikePopup() {
  setIsPopupOpen(false);
}

useEffect(() => {
  filterBikeCardsToRender();
}, [isBikesFilterChecked])


  return (
    <section className='garage'>
      <BikesTypeFilter toggleBikesFilter={toggleBikesFilter} />
      <GarageBikesList
        bikesToRender={bikesToRender}
        openBikePopup={openBikePopup}
        yearsAtStrava={yearsAtStrava}
        activities={activities}
        bikeTotalDistance={bikeTotalDistance}
      />
      <BikeCardPopup isPopupOpen={isPopupOpen} bikePopupData={bikePopupData} closeBikePopup={closeBikePopup} />
    </section>
  )
}
