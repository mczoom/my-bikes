import React, { useState } from 'react'
import Input from '../Input/Input'
import PageWithForm from '../PageWithForm/PageWithForm'


interface LoginPageProps {
  handleLogin: (login: string, password: string) => void
}

export default function LoginPage({handleLogin}: LoginPageProps) {

  const [loginValue, setLoginValue] = useState<string>('');
  const [passwordValue, setPasswordValue] = useState<string>('');

  function getLoginInputValue(e: React.ChangeEvent<HTMLInputElement>) {
    setLoginValue(e.target.value);
  };

  function getPasswordInputValue(e: React.ChangeEvent<HTMLInputElement>) {
    setPasswordValue(e.target.value);
  };

  function loginHandler(e: React.SyntheticEvent) {
    e.preventDefault();
    handleLogin(loginValue, passwordValue);
  }


  return (
    <PageWithForm name='login' title='Вход в сервис My-Bikes' btnText='Залогиниться' loginHandler={loginHandler}>
      <Input name='login' label='Логин' inputType='text' placeholder='Логин' getLoginInputValue={getLoginInputValue} />
      <Input name='password' label='Пароль' inputType='password' placeholder='Пароль' getPasswordInputValue={getPasswordInputValue} />
    </PageWithForm>
  )
}
