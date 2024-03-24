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
  const isInstalled = part.installed ? `Установлено на ${part.bikeName || part.bikeSelect}` : 'Не используется';

  return (
    <div className="part-card">
      <div className="part-card__heading">
        <div className="part-card__title-wrapper">
          <h4 className="part-card__title">{part.brand}</h4>
          <h4 className="part-card__title">{part.model}</h4>
        </div>
        <div className="part-card__buttons">
          <EditButton item={part} openPopup={onOpenEdit} getEditingItem={getEditingPart} />
          <DeleteButton item={part} openPopup={onOpenDelete} getEditingItem={getEditingPart} />
        </div>
      </div>
      <div className="part-card__specs">
        <p>{isInstalled}</p>
        <p>Пробег: {part.distance} км</p>
        <p>Вес: {part.weight} г</p>
        <p>Цена: {part.price} $</p>
        <p>Добавлен: </p>
      </div>
    </div>
  );
}
