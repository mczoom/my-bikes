import { Bike } from 'types/Bike';
import { UserBike } from 'types/UserBike';

interface EditButtonProps {
  openPopup: () => void
  bike: UserBike
  getEditingBike: (bike: Bike) => void
}


export default function EditButton({openPopup, bike, getEditingBike}: EditButtonProps) {

  function handleClick() {
    openPopup();
    getEditingBike(bike);    
  };

  return (
    <button className='edit-btn' onClick={handleClick}></button>
  )
}



