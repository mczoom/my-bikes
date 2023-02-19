import React from 'react'


interface InputProps {
  name: string
  label: string
  inputType: string
  placeholder: string
  getLoginInputValue?: (e: React.ChangeEvent<HTMLInputElement>) => void
  getPasswordInputValue?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function Input({name, label, inputType, placeholder, getLoginInputValue, getPasswordInputValue}: InputProps) {

  const inputHandler = name === 'login' ?  getLoginInputValue : getPasswordInputValue;

  return (
    <>
      <label className='input-label'>{label}</label>
      <input className='input-field' type={inputType} placeholder={placeholder} onChange={inputHandler}></input>
    </>
  )
}
