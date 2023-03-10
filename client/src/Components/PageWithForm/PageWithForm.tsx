import React from 'react';
import Input from '../Input/Input';
import FormButton from '../FormButton/FormButton';


interface PageWithFormProps {
  name: string
  children: React.ReactNode
  title: string
  btnText: string
  registrationHandler?: (e: React.SyntheticEvent) => void
  loginHandler?: (e: React.SyntheticEvent) => void
}

export default function PageWithForm({name, children, title, btnText, registrationHandler, loginHandler}: PageWithFormProps) {

  const submitHandler = name === 'reg' ? registrationHandler : loginHandler;

  return (
    <div className='page-with-form'>
      <h1 className='page-with-form__title'>Добро пожаловать!</h1>
      <h2 className='page-with-form__text'>{title}</h2>
      <form className='page-with-form__form' onSubmit={submitHandler}>
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
