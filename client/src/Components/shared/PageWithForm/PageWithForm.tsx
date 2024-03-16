import { useLocation } from 'react-router-dom';
import FormButton from 'ui/FormButton/FormButton';
import AuthLink from 'ui/AuthLink/AuthLink';
import { FieldError, FieldErrors, SubmitHandler, useForm } from 'react-hook-form';

// interface FormValues {
//   login: string;
//   password: string;
// }

interface PageWithFormProps {
  name?: string;
  children: React.ReactNode;
  title: string;
  btnText: string;
  submitHandler: any;
  error: boolean;
}

export default function PageWithForm({ children, title, btnText, submitHandler, error }: PageWithFormProps) {
  const location = useLocation();

  return (
    <div className="page-with-form">
      <h1 className="page-with-form__title">Добро пожаловать!</h1>
      <h2 className="page-with-form__text">{title}</h2>
      <form className="page-with-form__form" onSubmit={submitHandler}>
        <div className="form__inputs-wrapper">{children}</div>
        <div className="form__buttons-wrapper">
          <FormButton btnText={btnText} btnType={'submit'} error={error} />
        </div>
      </form>
      {location.pathname === '/login' && (
        <div className="page-with-form__auth-text">
          <p>Нет аккаунта?</p>
          <AuthLink link={'/registration'} text={'Зарегистрироваться'} />
        </div>
      )}
      {location.pathname === '/registration' && (
        <div className="page-with-form__auth-text">
          <p>Уже есть аккаунт?</p>
          <AuthLink link={'/login'} text={'Войти'} />
        </div>
      )}
    </div>
  );
}
