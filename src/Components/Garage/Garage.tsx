import React, {useState} from 'react'
import { MyBike } from '../../models/MyBike';
import BikeCardPopup from '../BikeCardPopup/BikeCardPopup'
import GarageBikesList from '../GarageBikesList/GarageBikesList'

export default function Garage() {

  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
  const [bikePopupData, setBikePopupData] = useState<MyBike | undefined>({} as MyBike);

function openBikePopup(bikeData: MyBike | undefined) {
  setIsPopupOpen((state) => !state);
  setBikePopupData(bikeData);
}

  return (
    <section className='garage'>
      <GarageBikesList openBikePopup={openBikePopup}/>
      <BikeCardPopup isPopupOpen={isPopupOpen} bikePopupData={bikePopupData}/>
    </section>
  )
}
