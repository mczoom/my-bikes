import React from 'react'


interface InputProps {
  label: string
  inputType: string
}

export default function Input({label, inputType}: InputProps) {
  return (
    <>
      <label>{label}</label>
      <input type={inputType}></input>
    </>
  )
}
