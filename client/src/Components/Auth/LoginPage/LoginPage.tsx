import { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Input from 'ui/Input/Input'
import PageWithForm from 'components/shared/PageWithForm/PageWithForm'
import useAuth from 'hooks/useAuth';



export default function LoginPage() {

  const auth = useAuth();
  const navigate = useNavigate();

  const [loginValue, setLoginValue] = useState<string>('');
  const [passwordValue, setPasswordValue] = useState<string>('');

  function getLoginInputValue(e: React.ChangeEvent<HTMLInputElement>) {
    setLoginValue(e.target.value);
  };

  function getPasswordInputValue(e: React.ChangeEvent<HTMLInputElement>) {
    setPasswordValue(e.target.value);
  };

  function login(e: React.SyntheticEvent) {
    e.preventDefault();
    auth.signIn(loginValue, passwordValue);
    navigate('/');
  };


  return (
    <PageWithForm name='login' title='Вход в сервис My-Bikes' btnText='Войти' submitHandler={login}>
      <Input name='login' label='Логин' inputType='text' placeholder='Логин' getInputValue={getLoginInputValue} />
      <Input name='password' label='Пароль' inputType='password' placeholder='Пароль' getInputValue={getPasswordInputValue} />
    </PageWithForm>
  )
}
