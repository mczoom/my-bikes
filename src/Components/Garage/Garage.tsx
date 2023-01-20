import React, {useState} from 'react'
import { MyBike } from '../../models/MyBike';
import BikeCardPopup from '../BikeCardPopup/BikeCardPopup';
import GarageBikesList from '../GarageBikesList/GarageBikesList';


interface GarageProps {
  yearsAtStrava: (currentYear: number) => number[]
}

export default function Garage({yearsAtStrava}: GarageProps) {

  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
  const [bikePopupData, setBikePopupData] = useState<MyBike | undefined>({} as MyBike);

function openBikePopup(bikeData: MyBike | undefined) {
  setIsPopupOpen(true);
  setBikePopupData(bikeData);
}

function closeBikePopup() {
  setIsPopupOpen(false);
}


  return (
    <section className='garage'>
      <GarageBikesList openBikePopup={openBikePopup} yearsAtStrava={yearsAtStrava} />
      <BikeCardPopup isPopupOpen={isPopupOpen} bikePopupData={bikePopupData} closeBikePopup={closeBikePopup} />
    </section>
  )
}
