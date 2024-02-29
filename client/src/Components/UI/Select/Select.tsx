interface SelectProps {
  name: string;
  items: any;
  removeOption: string;
  defaultValue: string;
  getInputValue: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function Select({ name, items, removeOption, defaultValue, getInputValue }: SelectProps) {
  function selectOptions(items: any) {
    return items.map((item: any) => (
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
      <option value={'uninstall'}>{removeOption}</option>
    </select>
  );
}
