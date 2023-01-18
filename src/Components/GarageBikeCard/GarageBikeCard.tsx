import React from 'react';
import { Bike } from '../../models/Bike';
import {MyBike} from '../../models/MyBike';
import NS26 from '../../images/bikes/26.jpg';
import deli from '../../images/bikes/deli.jpg';
import deliIndoor from '../../images/bikes/deli_indoor.jpg';
import trek from '../../images/bikes/trek.jpg';
import trekIndoor from '../../images/bikes/trek_indoor.jpg';



interface BikeCardProps {
  bike: Bike
  openBikePopup: (bikeData: MyBike | undefined) => void
}


export default function GarageBikeCard({bike, openBikePopup}: BikeCardProps) {

  const myBikes: MyBike[] = [
    {
      id: 'b7840399',
      name: 'Trek Alpha 1.5',
      src: trek
    },
    {
      id: 'b11562279',
      name: 'Delihea',
      src: deli
    },
    {
      id: 'b8653526',
      name: 'Trek (indoor)',
      src: trekIndoor
    },
    {
      id: 'b11690555',
      name: 'Delihea (indoor)',
      src: deliIndoor
    },
    {
      id: 'b6048640',
      name: 'NS Clash',
      src: NS26
    }
  ]

const bikePhoto: MyBike | undefined = myBikes.find((b: MyBike) => {
  return b.id.includes(bike.id)
});

function openPopup() {
  openBikePopup(bikePhoto);

}



  return (
    <div className='bike-card' onClick={openPopup}>
      <img src={bikePhoto?.src} className='bike-card__image'></img>
      <h2 className='bike-card__bike-name'>{bike.name}</h2>
      <p className='bike-card__stats'>Пробег: {bike.converted_distance}</p>
    </div>
  )
}
