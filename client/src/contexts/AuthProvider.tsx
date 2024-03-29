import * as appApi from 'utils/appApi';
import { AuthContext } from 'contexts/AuthContext';
import { getStravaToken } from 'utils/stravaAuthApi';
import { useNavigate } from 'react-router-dom';
import useSnackbar from 'hooks/useSnackbar';
import useLocalStorage from 'hooks/useLocalStorage';

interface AuthProviderProps {
  children: React.ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [appToken, setAppToken] = useLocalStorage('jwt', '');
  const [stravaToken, setStravaToken] = useLocalStorage('stravaToken', '');

  const navigate = useNavigate();
  const snackbar = useSnackbar();

  function setStrTokenToLocalStorage(appToken: string) {
    getStravaToken(appToken)
      .then((sToken: string) => {
        setStravaToken(sToken);
      })
      .catch((err) => console.log(err));
  }

  function handleLogin(login: string, password: string) {
    appApi
      .login(login, password)
      .then((token) => {
        if (token) {
          setAppToken(token);
          setStrTokenToLocalStorage(token);
        } else {
          throw new Error('Не удалось войти в приложение');
        }
      })
      .catch((err) => snackbar.handleSnackbarError(err));
  }

  function handleRegistration(login: string, password: string) {
    appApi
      .register(login, password)
      .then(() => {
        handleLogin(login, password);
        navigate('/access');
      })
      .catch((err) => snackbar.handleSnackbarError(err));
  }

  const signUp = (login: string, password: string) => {
    handleRegistration(login, password);
  };

  const signIn = (login: string, password: string) => {
    handleLogin(login, password);
  };

  const logout = () => {
    setAppToken('');
    setStravaToken('');
    localStorage.clear();
  };

  const authData = { appToken, stravaToken, setStravaToken, signUp, signIn, logout };

  return <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>;
}
