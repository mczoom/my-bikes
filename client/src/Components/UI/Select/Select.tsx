import { FieldValues, Path, UseFormRegister } from 'react-hook-form';

interface SelectProps<T extends FieldValues> {
  name: Path<T>;
  items: any;
  removeOption: string;
  defaultValue: string;
  register: UseFormRegister<T>;
}

export default function Select<T extends FieldValues>({
  name,
  items,
  removeOption,
  defaultValue,
  register
}: SelectProps<T>) {
  function selectOptions(items: any) {
    return items.map((item: any) => (
      <option key={item.id} value={item.id}>
        {item.name}
      </option>
    ));
  }

  return (
    <select id="bike-select" {...register(name)}>
      <option selected disabled>
        {defaultValue}
      </option>
      {selectOptions(items)}
      <option value={'uninstall'}>{removeOption}</option>
    </select>
  );
}
