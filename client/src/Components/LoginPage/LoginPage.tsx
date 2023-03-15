import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { getStravaToken } from '../../utils/appApi';
import Input from '../Input/Input'
import PageWithForm from '../PageWithForm/PageWithForm'


interface LoginPageProps {
  handleLogin: (login: string, password: string) => void
}

export default function LoginPage({handleLogin}: LoginPageProps) {

  const navigate = useNavigate();


  const [loginValue, setLoginValue] = useState<string>('');
  const [passwordValue, setPasswordValue] = useState<string>('');

  function getLoginInputValue(e: React.ChangeEvent<HTMLInputElement>) {
    setLoginValue(e.target.value);
  };

  function getPasswordInputValue(e: React.ChangeEvent<HTMLInputElement>) {
    setPasswordValue(e.target.value);
  };

  function setStrTokenToLocalStorage() {
    getStravaToken()
      .then(res => localStorage.setItem('stravaToken', res.strToken))
  }

  function login(e: React.SyntheticEvent) {
    e.preventDefault();
    handleLogin(loginValue, passwordValue);
    setStrTokenToLocalStorage();
    navigate('/');
  }


  return (
    <PageWithForm name='login' title='Вход в сервис My-Bikes' btnText='Войти' submitHandler={login}>
      <Input name='login' label='Логин' inputType='text' placeholder='Логин' getLoginInputValue={getLoginInputValue} />
      <Input name='password' label='Пароль' inputType='password' placeholder='Пароль' getPasswordInputValue={getPasswordInputValue} />
    </PageWithForm>
  )
}
