import React from 'react'
import Input from '../Input/Input'
import PageWithForm from '../PageWithForm/PageWithForm'

export default function RegPage() {
  return (
    <PageWithForm title='Регистрация в сервисе My-Bikes' btnText='Зарегаться'>
      <Input label={'Логин'} inputType={'text'} placeholder={'Логин'} />
      <Input label={'Пароль'} inputType={'password'} placeholder={'Пароль'} />
    </PageWithForm>
  )
}
