import React from 'react';

interface EditButtonProps {
    text: string
    openPopup: () => void
}


export default function EditButton({text, openPopup}: EditButtonProps) {


  return (
    <button className='edit-btn' onClick={openPopup}>{text}</button>
  )
}



