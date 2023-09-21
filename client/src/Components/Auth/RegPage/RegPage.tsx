import { useState } from 'react'
import Input from 'ui/Input/Input'
import PageWithForm from 'components/shared/PageWithForm/PageWithForm'
import useAuth from 'hooks/useAuth';




export default function RegPage() {

  const auth = useAuth();

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
    auth.signUp(loginValue, passwordValue);  
  };  

  
  return (
    <PageWithForm name='reg' title='Регистрация в сервисе My-Bikes' btnText='Зарегаться' submitHandler={registrationHandler} >
      <Input name='login' label='Логин' inputType='text' placeholder='Логин' getInputValue={getLoginInputValue} />
      <Input name='password' label='Пароль' inputType='password' placeholder='Пароль' getInputValue={getPasswordInputValue} />
    </PageWithForm>
  )
}
