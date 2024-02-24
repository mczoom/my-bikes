interface SelectProps<Item> {
  name: string;
  items: Item[];
  defaultValue: string;
  getInputValue: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function Select<Item>({ name, items, defaultValue, getInputValue }: SelectProps<Item>) {
  function selectOptions(items: Item[]) {
    return items.map((item) => (
      <option key={item.id} value={item.id}>
        {item.name}
      </option>
    ));
  }

  return (
    <select name={name} id="bike-select" onChange={getInputValue}>
      <option selected disabled>
        {defaultValue}
      </option>
      {selectOptions(items)}
    </select>
  );
}
