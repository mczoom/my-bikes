import React from 'react';


interface FormButtonProps {
  btnText: string
  btnType: 'submit' | 'button'
}

export default function FormButton({btnText, btnType}: FormButtonProps) {

  const buttonClassName = `form-btn ${btnType === 'submit' ? 'submit-btn' : 'common-btn'}`;

  return (
    <button className={buttonClassName} type={btnType}>{btnText}</button>
  )
}
