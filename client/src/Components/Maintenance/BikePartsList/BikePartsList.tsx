import { BikePart } from 'types/BikePart';
import BikePartsCard from '../BikePartsCard/BikePartsCard';

interface BikePartsListProps {
  cat: string;
  parts: BikePart[];
  onOpen: () => void;
  onOpenEdit: () => void;
  getEditingPart?: ((part: BikePart) => void) | undefined;
  getCategory?: (cat: string) => void;
}

export default function BikePartsList({
  cat,
  parts,
  onOpen,
  onOpenEdit,
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
      <ul>
        {filteredParts &&
          filteredParts.map((item: BikePart) => (
            <li key={item.id}>
              <BikePartsCard part={item} getEditingPart={getEditingPart} onOpenEdit={onOpenEdit} />
            </li>
          ))}
      </ul>
      <button onClick={() => handleAddClick()}>+ Добавить компонент</button>
    </>
  );
}
