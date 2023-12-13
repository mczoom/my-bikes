import { useEffect, useState } from "react";
import * as appApi from 'utils/appApi'

import { getLocalStorageParsedValue, setLocalStorage } from "utils/service";
import { AuthContext } from "contexts/AuthContext";
import { checkStravaPermissions, getStravaToken } from "utils/stravaAuthApi";
import { useNavigate } from "react-router-dom";
import useSnackbar from "hooks/useSnackbar";



interface AuthProviderProps {
  children: React.ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {

  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(() => getLocalStorageParsedValue('logged'));
  const [isConnectedToStrava, setIsConnectedToStrava] = useState<boolean | null>(() => getLocalStorageParsedValue('isStravaConnected'));

  const navigate = useNavigate();
  const snackbar = useSnackbar();

  
  function setStrTokenToLocalStorage() {
    getStravaToken()
    .then((res) => {
      setLocalStorage('stravaToken', res);
      return res;
    })
    .catch((err) => console.log(err)); 
  };


  function checkPermissions() {
    checkStravaPermissions()
    .then((permits) => {        
      if(!permits) {
        throw new Error('Приложение не привязано к аккаунту в Strava')
      }
      setIsConnectedToStrava(permits);
    })
    .catch((err) => snackbar.handleSnackbarError(err));
  };
  

  function handleLogin(login: string, password: string) {
    appApi.login(login, password)
    .then((res) => {
      if (res.token) {     
        localStorage.setItem('jwt', res.token)
        setIsLoggedIn(true);
        setStrTokenToLocalStorage();
        checkPermissions();
      } else {
        throw new Error('Не удалось войти в приложение');
      };        
    })
    .catch((err) => snackbar.handleSnackbarError(err));
  };


  function handleRegistration(login: string, password: string) {
    appApi.register(login, password)
    .then(() => {      
      handleLogin(login, password);
      navigate('/access');       
    })
    .catch((err) => snackbar.handleSnackbarError(err));
  };


  const signUp = (login: string, password: string) => {      
    handleRegistration(login, password);
  };


  const signIn = (login: string, password: string) => {      
    handleLogin(login, password); 
  };


  const logout = () => {
    localStorage.clear();
    setIsLoggedIn(false);
    setIsConnectedToStrava(false);    
  };
    
  const authData = { isLoggedIn, setIsLoggedIn, isConnectedToStrava, setIsConnectedToStrava, signUp, signIn, logout, checkPermissions };
  
  useEffect(() => {
    setLocalStorage("logged", isLoggedIn);    
  }, [isLoggedIn]);

  useEffect(() => {      
    setLocalStorage("isStravaConnected", isConnectedToStrava);
  }, [isConnectedToStrava]);

  useEffect(() => {
    checkStravaPermissions();
  }, []);
    
  return <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>;  
    
  }