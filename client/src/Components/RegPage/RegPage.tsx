import React, { useState } from 'react'
import Input from '../Input/Input'
import PageWithForm from '../PageWithForm/PageWithForm'


interface RegPageProps {
  handleRegistration: (login: string, password: string) => void
}

export default function RegPage({handleRegistration}: RegPageProps) {

  const [loginValue, setLoginValue] = useState<string>('');
  const [passwordValue, setPasswordValue] = useState<string>('');

  function getLoginInputValue(e: React.ChangeEvent<HTMLInputElement>) {
    setLoginValue(e.target.value);
  };

  function getPasswordInputValue(e: React.ChangeEvent<HTMLInputElement>) {
    setPasswordValue(e.target.value);
  };

  function registrationHandler(e: React.SyntheticEvent) {
    e.preventDefault();
    handleRegistration(loginValue, passwordValue);
  }

  return (
    <PageWithForm title='Регистрация в сервисе My-Bikes' btnText='Зарегаться' registrationHandler={registrationHandler} >
      <Input name = {'login'} label={'Логин'} inputType={'text'} placeholder={'Логин'} getLoginInputValue={getLoginInputValue} />
      <Input name = {'password'} label={'Пароль'} inputType={'password'} placeholder={'Пароль'} getPasswordInputValue={getPasswordInputValue} />
    </PageWithForm>
  )
}
