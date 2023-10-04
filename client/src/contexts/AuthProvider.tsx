import { useEffect, useState } from "react";
import * as appApi from 'utils/appApi'

import { getLocalStorage, setLocalStorage } from "utils/service";
import { AuthContext } from "contexts/AuthContext";
import { checkStravaPermissions, getStravaToken } from "utils/stravaAuthApi";
import { useNavigate } from "react-router-dom";
import useSnackbar from "hooks/useSnackbar";
import { ErrorAPI } from "types/ErrorAPI";



interface AuthProviderProps {
  children: React.ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {

  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(() => getLocalStorage('logged'));
  const [isConnectedToStrava, setIsConnectedToStrava] = useState<boolean | null>(() => getLocalStorage('isStravaConnected'));

  const navigate = useNavigate();
  const snackbar = useSnackbar();

  function handleSnackbarError(err: ErrorAPI) {
    if(!err.status) {
      snackbar.addMessage(`${err}`);      
    }else{
      snackbar.addMessage(`Ошибка ${err.status}: ${err.message}`);
    }    
    console.log(err);
  };
  

  function setStrTokenToLocalStorage() {
    getStravaToken()
    .then((res) => {
      if (res.message) {
        throw new Error(res.message);
      }
      setLocalStorage('stravaToken', res);
      return res;
    })
    .catch((err) => handleSnackbarError(err)); 
  };


  function checkPermissions() {
    checkStravaPermissions()
    .then((permits) => {        
      if(!permits) {
        throw new Error('Приложение не привязано к аккаунту в Strava')
      }
      setIsConnectedToStrava(permits);
    })
    .catch((err) => handleSnackbarError(err));
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
        throw new Error(res.message);
      };        
    })
    .catch((err) => handleSnackbarError(err));
  };


  function handleRegistration(login: string, password: string) {
    appApi.register(login, password)
    .then((res) => {     
      console.log(res);        
      handleLogin(login, password);
      navigate('/access');       
    })
    .catch((err) => handleSnackbarError(err));
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