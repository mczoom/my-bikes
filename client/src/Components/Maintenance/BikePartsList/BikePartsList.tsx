import BikePartsCard from '../BikePartsCard/BikePartsCard';

export default function BikePartsList({ parts }: any) {
  return (
    <ul>
      {parts &&
        parts.map((item: any) => (
          <li key={item.id}>
            <BikePartsCard part={item} />
          </li>
        ))}
    </ul>
  );
}
