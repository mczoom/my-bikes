import { BikePart } from 'types/BikePart';
import BikePartsCard from '../BikePartsCard/BikePartsCard';
import { strict } from 'assert';

interface BikePartsListProps {
  cat: string;
  parts: BikePart[];
  onOpen: (cat: string) => void;
}

export default function BikePartsList({ cat, parts, onOpen }: BikePartsListProps) {
  return (
    <>
      <ul>
        {parts &&
          parts.map((item: BikePart, i: number) => (
            <li key={item.id}>
              <BikePartsCard part={item} />
            </li>
          ))}
      </ul>
      <button onClick={() => onOpen(cat)}>+ Добавить компонент</button>
    </>
  );
}
