import { UserBike } from '../../models/UserBike';

interface EditButtonProps {
    openPopup: () => void
    bike: UserBike
    getBikeId: (id: string) => void
}


export default function EditButton({openPopup, bike, getBikeId}: EditButtonProps) {

  function handleClick() {
    openPopup();
    getBikeId(bike.id);    
  }

  return (
    <button className='edit-btn' onClick={handleClick}></button>
  )
}



