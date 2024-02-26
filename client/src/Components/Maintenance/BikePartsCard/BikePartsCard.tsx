import EditButton from 'components/UI/EditButton/EditButton';
import { BikePart } from 'types/BikePart';

interface BikePartsCardProps {
  part: BikePart;
  onOpenEdit: () => void;
  getEditingPart: ((part: BikePart) => void) | undefined;
}

export default function BikePartsCard({ part, onOpenEdit, getEditingPart }: BikePartsCardProps) {
  return (
    <div>
      <div>
        {part.brand} {part.model} ({part.distance} км, {part.price} $)
      </div>
      <EditButton item={part} openPopup={onOpenEdit} getEditingItem={getEditingPart} />
    </div>
  );
}
