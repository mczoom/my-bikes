import { FieldValues, Path, UseFormRegister } from 'react-hook-form';

interface SelectProps<T extends FieldValues> {
  name: Path<T>;
  title: string;
  items: Items[];
  removeOption: string;
  initialtOption: string;
  register: UseFormRegister<T>;
}

interface Items {
  id: string;
  name: string;
}

export default function Select<T extends FieldValues>({
  name,
  title,
  items,
  removeOption,
  initialtOption,
  register
}: SelectProps<T>) {
  function selectOptions(items: Items[]) {
    return items.map((item) => (
      <option key={item.id} value={item.id}>
        {item.name}
      </option>
    ));
  }

  return (
    <>
      <label>{title}</label>
      <select id="bike-select" {...register(name)}>
        <option selected value="">
          {initialtOption}
        </option>
        {selectOptions(items)}
        <option style={{ color: 'red' }} value={'uninstall'}>
          {removeOption}
        </option>
      </select>
    </>
  );
}
