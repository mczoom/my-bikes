import { useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler, FieldError } from 'react-hook-form';
import Input from 'ui/Input/Input';
import PageWithForm from 'components/shared/PageWithForm/PageWithForm';
import useAuth from 'hooks/useAuth';
import { loginInputRules, passwordInputRules } from 'utils/constants';
import { AuthFormValues } from 'types/AuthFormValues';

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<AuthFormValues>({ mode: 'onChange' });

  const auth = useAuth();
  const navigate = useNavigate();

  // const [loginValue, setLoginValue] = useState<string>('');
  // const [passwordValue, setPasswordValue] = useState<string>('');

  // function getLoginInputValue(e: React.ChangeEvent<HTMLInputElement>) {
  //   setLoginValue(e.target.value);
  // }

  // function getPasswordInputValue(e: React.ChangeEvent<HTMLInputElement>) {
  //   setPasswordValue(e.target.value);
  // }

  const err = Object.keys(errors).length > 0 ? true : false;

  const login: SubmitHandler<AuthFormValues> = (data) => {
    auth.signIn(data.login, data.password);
    navigate('/');
  };

  return (
    <PageWithForm
      name="login"
      title="Вход в сервис My-Bikes"
      btnText="Войти"
      submitHandler={(e: React.BaseSyntheticEvent<HTMLFormElement>) => handleSubmit(login)(e)}
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
