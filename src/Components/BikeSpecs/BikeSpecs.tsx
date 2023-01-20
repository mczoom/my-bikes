import React from 'react';
import { Bike } from '../../models/Bike';
import { MyBike } from '../../models/MyBike';


interface BikeSpecsProps {
  myBike: MyBike | undefined
  bike: Bike
}

export default function BikeSpecs({myBike, bike}: BikeSpecsProps) {
  return (
    <ul className='bike-specs'>
      <li className='bike-specs__spec'>
        <h2 className='bike-specs__bike-name'>{myBike?.name}</h2>
      </li>
      <li className='bike-specs__spec'>
        <p >Бренд: <span className='bold'>{myBike?.brand}</span></p>
      </li>
      <li className='bike-specs__spec'>
        <p>Модель: <span className='bold'>{myBike?.model}</span></p>
      </li>
      <li className='bike-specs__spec'>
        <p>Год: <span className='bold'>{myBike?.year || 'н/д'}</span></p>
      </li>
      <li className='bike-specs__spec'>
        <p>Вес: <span className='bold'>{myBike?.weight || 'н/д'}</span></p>
      </li>
      <li className='bike-specs__spec'>
        <p>Общий пробег: <span className='bold'>{Math.round(bike.converted_distance)} км</span></p>
      </li>
    </ul>
  )
}
