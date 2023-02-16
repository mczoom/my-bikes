import React from 'react'


interface InputProps {
  label: string
  inputType: string
  placeholder: string
}

export default function Input({label, inputType, placeholder}: InputProps) {
  return (
    <>
      <label className='input-label'>{label}</label>
      <input className='input-field' type={inputType} placeholder={placeholder}></input>
    </>
  )
}
