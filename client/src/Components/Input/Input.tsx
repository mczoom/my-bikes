import React from 'react'


interface InputProps {
  name: string
  label: string
  inputType: string
  placeholder: string
  getInputValue?: (e: React.ChangeEvent<HTMLInputElement>) => void
  getLoginInputValue?: (e: React.ChangeEvent<HTMLInputElement>) => void
  getPasswordInputValue?: (e: React.ChangeEvent<HTMLInputElement>) => void
  value?: string | number
}

export default function Input({name, label, inputType, placeholder, getInputValue, value}: InputProps) {

  return (
    <div className='input'>
      <label className='input-label'>{label}</label>
      <input className='input-field' name={name} value={value} type={inputType} placeholder={placeholder} onChange={getInputValue}></input>
    </div>
  )
}
