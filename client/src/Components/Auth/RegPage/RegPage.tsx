import { useForm, SubmitHandler } from 'react-hook-form';
import Input from 'ui/Input/Input';
import PageWithForm from 'components/shared/PageWithForm/PageWithForm';
import useAuth from 'hooks/useAuth';
import { loginInputRules, passwordInputRules } from 'utils/constants';
import { AuthFormValues } from 'types/AuthFormValues';

export default function RegPage() {
  const auth = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<AuthFormValues>({ mode: 'onChange' });

  // const [loginValue, setLoginValue] = useState<string>('');
  // const [passwordValue, setPasswordValue] = useState<string>('');

  // function getLoginInputValue(e: React.ChangeEvent<HTMLInputElement>) {
  //   setLoginValue(e.target.value);
  // }

  // function getPasswordInputValue(e: React.ChangeEvent<HTMLInputElement>) {
  //   setPasswordValue(e.target.value);
  // }

  const registrationHandler: SubmitHandler<AuthFormValues> = (data) => {
    auth.signUp(data.login, data.password);
  };

  const err = Object.keys(errors).length > 0 ? true : false;

  return (
    <PageWithForm
      name="reg"
      title="Регистрация в сервисе My-Bikes"
      btnText="Зарегаться"
      submitHandler={(e: React.BaseSyntheticEvent<HTMLFormElement>) => handleSubmit(registrationHandler)(e)}
      error={err}
    >
      <Input
        name="login"
        label="Логин"
        inputType="text"
        placeholder="Логин"
        register={register}
        rules={loginInputRules}
      />
      <Input
        name="password"
        label="Пароль"
        inputType="password"
        placeholder="Пароль"
        register={register}
        rules={passwordInputRules}
      />
    </PageWithForm>
  );
}
