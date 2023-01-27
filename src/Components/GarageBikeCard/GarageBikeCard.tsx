import React from 'react';
import { Bike } from '../../models/Bike';
import {MyBike} from '../../models/MyBike';
import NS26 from '../../images/bikes/26.jpg';
import deli from '../../images/bikes/deli.jpg';
import deliIndoor from '../../images/bikes/deli_indoor.jpg';
import trek from '../../images/bikes/trek.jpg';
import trekIndoor from '../../images/bikes/trek_indoor.jpg';
import BikeSpecs from '../BikeSpecs/BikeSpecs';
import DistancePerYearList from '../DistancePerYearList/DistancePerYearList';
import { Activity } from '../../models/Activity';



interface BikeCardProps {
  bike: Bike
  openBikePopup: (bikeData: MyBike | undefined) => void
  yearsAtStrava: (currentYear: number) => number[]
  activities: Activity[]
}


export default function GarageBikeCard({bike, openBikePopup, yearsAtStrava, activities}: BikeCardProps) {

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

const myBike: MyBike | undefined = myBikes.find((b: MyBike) => {
  return b.id.includes(bike.id)
});

function openPopup() {
  openBikePopup(myBike);
}


  return (
    <div className='bike-card' >
      <div className='bike-card__wrap'>
        <img src={myBike?.src} className='bike-card__image' onClick={openPopup}></img>
        <BikeSpecs myBike={myBike} bike={bike}/>
        <DistancePerYearList yearsAtStrava={yearsAtStrava} bike={bike} myBike={myBike} />
      </div>
    </div>
  )
}
