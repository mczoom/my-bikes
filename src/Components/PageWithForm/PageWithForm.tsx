import React from 'react';
import Input from '../Input/Input';
import SubmitButton from '../SubmitButton/SubmitButton';


export default function PageWithForm() {
  return (
    <div className='page-with-form'>
      <h1 className='page-with-form__title'>Добро пожаловать!</h1>
      <form className='page-with-form__form'>
        <Input label={'Логин'} inputType={'text'} />
        <Input label={'Пароль'} inputType={'password'} />
        <SubmitButton btnText={'Зарегаться'} />
      </form>
    </div>
  )
}
