import EditButton from 'components/UI/EditButton/EditButton';
import { BikePart } from 'types/BikePart';

interface BikePartsCardProps {
  part: BikePart;
  onOpenEdit: () => void;
  getEditingPart: ((part: BikePart) => void) | undefined;
  onDelete: (partId: string) => void;
}

export default function BikePartsCard({ part, onOpenEdit, getEditingPart, onDelete }: BikePartsCardProps) {
  const isInstalled = part.installed ? 'Установлена' : 'Снята';

  return (
    <div>
      <div>
        {part.brand} {part.model} ({part.distance} км, {part.price} $) {isInstalled}
      </div>
      <EditButton item={part} openPopup={onOpenEdit} getEditingItem={getEditingPart} />
      <button onClick={() => onDelete(part.id)}>Delete</button>
    </div>
  );
}
