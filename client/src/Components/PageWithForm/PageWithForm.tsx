import React from 'react';
import Input from '../Input/Input';
import FormButton from '../FormButton/FormButton';
import AuthLink from '../AuthLink/AuthLink';
import { useNavigation } from 'react-router-dom';


interface PageWithFormProps {
  name: string
  children: React.ReactNode
  title: string
  btnText: string
  submitHandler?: (e: React.SyntheticEvent) => void
}

export default function PageWithForm({name, children, title, btnText, submitHandler}: PageWithFormProps) {

  const navigation = useNavigation();
  console.log(navigation.location);
  

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
      {/* {navigation.location === /login && ( 
      <div className='page-with-form__auth-text'>
        <p>Нет аккаунта?</p>
        <AuthLink link={'/registration'} text={'Регистрация'} />
      </div>)
} */}
    </div>
  )
}
