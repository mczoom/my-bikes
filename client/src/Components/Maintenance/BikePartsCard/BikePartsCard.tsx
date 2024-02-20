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
      <p>
        {part.brand} {part.model} ({part.distance} км)
      </p>
      <EditButton item={part} openPopup={onOpenEdit} getEditingItem={getEditingPart} />
    </div>
  );
}
