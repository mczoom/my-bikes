import DeleteButton from 'components/UI/DeleteButton/DeleteButton';
import EditButton from 'components/UI/EditButton/EditButton';
import { BikePart } from 'types/BikePart';

interface BikePartsCardProps {
  part: BikePart;
  onOpenEdit: () => void;
  onOpenDelete: () => void;
  getEditingPart: ((part: BikePart) => void) | undefined;
}

export default function BikePartsCard({ part, onOpenEdit, getEditingPart, onOpenDelete }: BikePartsCardProps) {
  const isInstalled = part.installed ? 'Компонент установлен' : 'Не используется';

  return (
    <div>
      <div>
        {part.brand} {part.model} ({part.distance} км, {part.price} $) {isInstalled}
      </div>
      <EditButton item={part} openPopup={onOpenEdit} getEditingItem={getEditingPart} />
      <DeleteButton item={part} openPopup={onOpenDelete} getEditingItem={getEditingPart} />
    </div>
  );
}
