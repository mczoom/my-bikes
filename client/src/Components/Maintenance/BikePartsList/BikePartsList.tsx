import { BikePart } from 'types/BikePart';
import BikePartsCard from '../BikePartsCard/BikePartsCard';
import FormButton from 'components/UI/FormButton/FormButton';

interface BikePartsListProps {
  cat: string;
  parts: BikePart[];
  onOpen: () => void;
  onOpenEdit: () => void;
  onOpenDelete: () => void;
  getEditingPart?: ((part: BikePart) => void) | undefined;
  getCategory?: (cat: string) => void;
}

export default function BikePartsList({
  cat,
  parts,
  onOpen,
  onOpenEdit,
  onOpenDelete,
  getEditingPart,
  getCategory
}: BikePartsListProps) {
  function filterParts() {
    return parts.filter((part) => part.category === cat);
  }

  const filteredParts = filterParts();

  function handleAddClick() {
    if (getCategory) {
      getCategory(cat);
    }
    onOpen();
  }

  return (
    <>
      <ul className="parts-list">
        {filteredParts &&
          filteredParts.map((item: BikePart) => (
            <li className="parts-list__part" key={item.id}>
              <BikePartsCard
                part={item}
                getEditingPart={getEditingPart}
                onOpenEdit={onOpenEdit}
                onOpenDelete={onOpenDelete}
              />
            </li>
          ))}
      </ul>
      <div className="parts-list__add-btn">
        <FormButton btnText={'+ Добавить компонент'} btnType={'button'} onAction={handleAddClick} />
      </div>
    </>
  );
}
