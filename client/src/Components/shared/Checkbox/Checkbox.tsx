interface CheckboxProps {
  name?: string
  text: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  checkboxStatus?: boolean
  switchTrainerCheckbox?: () => void
}

export default function Checkbox({name, text, checkboxStatus, onChange}: CheckboxProps) {

  console.log(checkboxStatus);

  

  return (
    <div className='type-filter'>
      <label className='type-filter__label'>
        {text}
        <input type='checkbox' name={name} className='type-filter__checkbox' checked={checkboxStatus} onChange={onChange}/>
      </label>
    </div>
  )
}
