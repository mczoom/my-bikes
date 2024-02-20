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
  function handleClick() {
    if (getCategory) {
      getCategory(cat);
    }

    onOpen();
  }

  return (
    <>
      <ul>
        {parts &&
          parts.map((item: BikePart) => (
            <li key={item.id}>
              <BikePartsCard part={item} getEditingPart={getEditingPart} onOpenEdit={onOpenEdit} />
            </li>
          ))}
      </ul>
      <button onClick={() => handleClick()}>+ Добавить компонент</button>
    </>
  );
}
