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

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isConnectedToStrava, setIsConnectedToStrava] = useState<boolean>(true);

  const navigate = useNavigate();
  const snackbar = useSnackbar();
  
  function setStrTokenToLocalStorage() {
    getStravaToken()
      .then((res) => {
        localStorage.setItem('stravaToken', res);
      })
      .catch((err) => console.log(err)); 
  };


  // function checkAccessToStrAndIfLoggedIn() {
  //   appApi.getCurrentUser()
  //     .then((res) => {
  //       if(res) {
  //         localStorage.setItem('logged', 'true');
  //         localStorage.setItem('isStravaConnected', 'true');
  //         setIsLoggedIn(true);
  //         setIsConnectedToStrava(true)  
  //       }
  //     })
  //     .catch((err) => console.log(err)); 
  // };


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
          //checkPermissions();
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
    
  const authData = { isLoggedIn, isConnectedToStrava, signUp, signIn, logout, checkPermissions };
  
  
  useEffect(() => {
    let ignore = false;
    appApi.getCurrentUser()
      .then((res) => {
        console.log(res);
        
          if(res.login) {
            if(!ignore) {
            console.log(res);
            
            // localStorage.setItem('logged', JSON.stringify(true));
            // localStorage.setItem('isStravaConnected', res.accessToStrava);
            setIsLoggedIn(true);
            //setIsConnectedToStrava(res.accessToStrava)  
          } else {
            // localStorage.setItem('logged', JSON.stringify(false));
            // localStorage.setItem('isStravaConnected', JSON.stringify(false));
            setIsLoggedIn(false);
            //etIsConnectedToStrava(false)
          }
        }
      })
      .catch((err) => console.log(err));

      return () => {
        ignore = true;
      };        
  }, []);

  useEffect(() => {
    let ignore = false;
    appApi.getCurrentUser()
      .then((res) => {
        console.log(res);
        
          if(res.login) {
            if(!ignore) {
            console.log(res);
            
            // localStorage.setItem('logged', JSON.stringify(true));
            // localStorage.setItem('isStravaConnected', res.accessToStrava);
            //setIsLoggedIn(true);
            setIsConnectedToStrava(res.accessToStrava)  
          } else {
            // localStorage.setItem('logged', JSON.stringify(false));
            // localStorage.setItem('isStravaConnected', JSON.stringify(false));
            //setIsLoggedIn(false);
            setIsConnectedToStrava(false)
          }
        }
      })
      .catch((err) => console.log(err));

      return () => {
        ignore = true;
      };        
  }, [isLoggedIn]);

  

  // useEffect(() => {
  //   let ignore = false;
  //   checkStravaPermissions()
  //     .then((permits) => { 
  //       if(!ignore) {       
  //         if(!permits) {
  //           throw new Error('Приложение не привязано к аккаунту в Strava')
  //         }
  //         setIsConnectedToStrava(permits);
  //       }
  //     })
  //     .catch((err) => snackbar.handleSnackbarError(err));

  //   return () => {
  //     ignore = true;
  //   };  
  // }, []);
    console.log(isConnectedToStrava);
    
  return (
    <AuthContext.Provider value={authData}>
      {children}
    </AuthContext.Provider>
  );  
}