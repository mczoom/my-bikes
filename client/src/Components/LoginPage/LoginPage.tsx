import React from 'react'
import Input from '../Input/Input'
import PageWithForm from '../PageWithForm/PageWithForm'

export default function LoginPage() {
  return (
    <PageWithForm title='Вход в сервис My-Bikes' btnText='Залогиниться'>
      <Input name='login' label={'Логин'} inputType={'text'} placeholder={'Логин'} />
      <Input name='password' label={'Пароль'} inputType={'password'} placeholder={'Пароль'} />
    </PageWithForm>
  )
}
