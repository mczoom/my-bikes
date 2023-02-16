import React from 'react'
import Input from '../Input/Input'
import PageWithForm from '../PageWithForm/PageWithForm'

export default function LoginPage() {
  return (
    <PageWithForm title='Вход в сервис My-Bikes' btnText='Залогиниться'>
      <Input label={'Логин'} inputType={'text'} placeholder={'Логин'} />
      <Input label={'Пароль'} inputType={'password'} placeholder={'Пароль'} />
    </PageWithForm>
  )
}
