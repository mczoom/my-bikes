import { BikePart } from 'types/BikePart';
import BikePartsCard from '../BikePartsCard/BikePartsCard';

interface BikePartsListProps {
  parts: BikePart[];
}

export default function BikePartsList({ parts }: BikePartsListProps) {
  return (
    <ul>
      {parts &&
        parts.map((item: BikePart, i: number) => (
          <li key={item._id}>
            <BikePartsCard part={item} />
          </li>
        ))}
    </ul>
  );
}
