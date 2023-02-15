import React from 'react';


interface SubmitButtonProps {
  btnText: string
}

export default function SubmitButton({btnText}: SubmitButtonProps) {
  return (
    <button>{btnText}</button>
  )
}
