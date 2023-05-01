import React from 'react';
import Input from '../Input/Input';
import FormButton from '../FormButton/FormButton';
import AuthLink from '../AuthLink/AuthLink';
import { useLocation } from 'react-router-dom';


interface PageWithFormProps {
  name: string
  children: React.ReactNode
  title: string
  btnText: string
  submitHandler?: (e: React.SyntheticEvent) => void
}

export default function PageWithForm({name, children, title, btnText, submitHandler}: PageWithFormProps) {

  const location = useLocation();

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
      {location.pathname === '/login' && ( 
        <div className='page-with-form__auth-text'>
          <p>Нет аккаунта?</p>
          <AuthLink link={'/registration'} text={'Зарегистрироваться'} />
        </div>
      )}
      {location.pathname === '/registration' && ( 
        <div className='page-with-form__auth-text'>
          <p>Уже есть аккаунт?</p>
          <AuthLink link={'/login'} text={'Войти'} />
        </div>
      )}
    </div>
  )
}
