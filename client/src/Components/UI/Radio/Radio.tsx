interface RadioProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  checked: boolean;
}

export default function Radio({ label, name, value, onChange, checked }: RadioProps) {
  return (
    <label>
      {label}
      <input
        className="sports-filter__radio"
        type="radio"
        name={name}
        value={value}
        onChange={onChange}
        checked={checked}
      />
    </label>
  );
}
