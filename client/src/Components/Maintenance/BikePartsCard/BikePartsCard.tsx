import { BikePart } from 'types/BikePart';

interface BikePartsCardProps {
  part: BikePart;
}

export default function BikePartsCard({ part }: BikePartsCardProps) {
  return (
    <div>
      <p>
        {part.brand} {part.model} ({part.distance} км)
      </p>
    </div>
  );
}
