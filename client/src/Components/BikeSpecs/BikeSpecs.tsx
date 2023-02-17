import React, { useEffect } from 'react';
import { MyBike } from '../../models/MyBike';


interface BikeSpecsProps {
  bike: MyBike
  bikeTotalDistance: (bikeId: string) => number
}

export default function BikeSpecs({bike, bikeTotalDistance}: BikeSpecsProps) {


  return (
    <ul className='bike-specs'>
      <li className='bike-specs__spec'>
        <h2 className='bike-specs__bike-name'>{bike.name}</h2>
      </li>
      <li className='bike-specs__spec'>
        <p className='spec'>Бренд: <span className='bold'>{bike.brand}</span></p>
      </li>
      <li className='bike-specs__spec'>
        <p className='spec'>Модель: <span className='bold'>{bike.model}</span></p>
      </li>
      <li className='bike-specs__spec'>
        <p className='spec'>Год: <span className='bold'>{bike.year || 'н/д'}</span></p>
      </li>
      <li className='bike-specs__spec'>
        <p className='spec'>Вес: <span className='bold'>{bike.weight || 'н/д'}</span></p>
      </li>
      <li className='bike-specs__spec'>
        <p className='spec'>Пробег: <span className='bold'>{Math.round(bikeTotalDistance(bike.id) / 1000) || '--'} км</span></p>
      </li>
    </ul>
  )
}
