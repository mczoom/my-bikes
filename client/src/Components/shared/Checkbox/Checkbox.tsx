import { FieldValues, Path, UseFormRegister } from 'react-hook-form';

interface CheckboxProps<T extends FieldValues> {
  name: Path<T>;
  text: string;
  register: UseFormRegister<T>;
  checkboxStatus?: boolean;
  switchTrainerCheckbox?: () => void;
}

export default function Checkbox<T extends FieldValues>({ name, text, register }: CheckboxProps<T>) {
  return (
    <div className="type-filter">
      <label className="type-filter__label">
        {text}
        <input
          type="checkbox"
          className="type-filter__checkbox"
          //checked={checkboxStatus}
          {...register(name)}
          //value="trainer"
        />
      </label>
    </div>
  );
}
