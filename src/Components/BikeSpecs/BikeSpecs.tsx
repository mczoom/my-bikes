import React from 'react';
import { MyBike } from '../../models/MyBike';


interface BikeSpecsProps {
  myBike: MyBike | undefined
}

export default function BikeSpecs({myBike}: BikeSpecsProps) {
  return (
    <ul className='bike-specs'>
      <li><p className='bike-specs__spec'>{myBike?.name}</p></li>
      <li><p className='bike-specs__spec'>Бренд {myBike?.brand}</p></li>
      <li><p className='bike-specs__spec'>Модель {myBike?.model}</p></li>
      <li><p className='bike-specs__spec'>Год {myBike?.year}</p></li>
      <li><p className='bike-specs__spec'>Вес {myBike?.weight}</p></li>
    </ul>
  )
}
