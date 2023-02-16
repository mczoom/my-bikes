import React from 'react';
import Input from '../Input/Input';
import FormButton from '../FormButton/FormButton';


interface PageWithFormProps {
  children: React.ReactNode
  title: string
  btnText: string
}

export default function PageWithForm({children, title, btnText}: PageWithFormProps) {
  return (
    <div className='page-with-form'>
      <h1 className='page-with-form__title'>Добро пожаловать!</h1>
      <h2 className='page-with-form__text'>{title}</h2>
      <form className='page-with-form__form'>
        <div className='form__inputs-wrapper'>
          {children}
        </div>
        <div className='form__buttons-wrapper'>
          <FormButton btnText={btnText} btnType={'submit'}/>
        </div>
      </form>
    </div>
  )
}
