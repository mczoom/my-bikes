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
}


export default function GarageBikeCard({bike}: BikeCardProps) {

  const myBikes: MyBike[] = [
    {
      id: 'b7840399',
      name: 'Trek',
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

const bikePhoto: MyBike | undefined = myBikes.find((b: MyBike) => {return b.id.includes(bike.id)})



  return (
    <div className='bike-card'>
      <img src={bikePhoto?.src} className='bike-card__image'></img>
      <h2>{bike.name}</h2>
      <p>Пробег: {bike.converted_distance}</p>
    </div>
  )
}
