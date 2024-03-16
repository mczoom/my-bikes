import { FieldValues, Path, RegisterOptions, UseFormRegister } from 'react-hook-form';

interface InputProps<T extends FieldValues> {
  label: string;
  inputType: string;
  placeholder?: string;
  value?: string | number | undefined;
  name: Path<T>;
  register: UseFormRegister<T>;
  rules?: RegisterOptions;
}

export default function Input<T extends FieldValues>({
  name,
  label,
  inputType,
  placeholder,
  value,
  register,
  rules
}: InputProps<T>) {
  return (
    <div className="input">
      <label className="input-label">{label}</label>
      <input
        className="input-field"
        value={value}
        type={inputType}
        placeholder={placeholder}
        {...register(name, rules)}
      ></input>
    </div>
  );
}
