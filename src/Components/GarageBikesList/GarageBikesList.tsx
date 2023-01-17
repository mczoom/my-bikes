import React, {useState} from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { Profile } from '../../models/Profile';
import GarageBikeCard from '../GarageBikeCard/GarageBikeCard';
import NS26 from '../../images/bikes/26.jpg';
import deli from '../../images/bikes/deli.jpg';
import deliIndoor from '../../images/bikes/deli_indoor.jpg';
import trek from '../../images/bikes/trek.jpg';
import trekIndoor from '../../images/bikes/trek_indoor.jpg';


export default function GarageBikesList() {

  const currentUser = React.useContext<Profile>(CurrentUserContext);

const myBikes = [
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
];




  return (
    <ul>
      {currentUser?.bikes?.map((bike) => (
        <li key={bike.id}>
          <GarageBikeCard bike={bike}/>
        </li>
      ))}
    </ul>
  )
}
