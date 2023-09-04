import { useEffect, useState } from "react";
import * as appApi from '../utils/appApi'

import { getLocalStorage, setLocalStorage } from "../utils/service";
import { AuthContext } from "./AuthContext";
import { checkStravaPermissions, getStravaToken } from "../utils/stravaAuthApi";
import { useNavigate } from "react-router-dom";

export function AuthProvider({ children }: { children: React.ReactNode }) {

    const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(() => getLocalStorage('logged'));
    const [isConnectedToStrava, setIsConnectedToStrava] = useState<boolean | null>(() => getLocalStorage('isStravaConnected'));

    const navigate = useNavigate();

    function setStrTokenToLocalStorage() {
      getStravaToken()
        .then((res) => {
          if(res.message) {
            throw new Error(res.message);
          }  
          setLocalStorage('stravaToken', res.strToken)
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
        .catch((err) => console.log(err));
    };
    

    function handleLogin(login: string, password: string) {
      appApi.login(login, password)
      .then((res) => {
        if (res.token) {     
          localStorage.setItem('jwt', res.token)
          //setLocalStorage('jwt', res.token);
          setIsLoggedIn(true);
          //setLocalStorage('logged', true);
          setStrTokenToLocalStorage();
          checkPermissions();
        } else {
          throw new Error(res.message);
        };        
      })
      .catch((err) => console.log(err));
    };



    function handleRegistration(login: string, password: string) {
      appApi.register(login, password)
        .then((res) => {       
          if(res.message) {
            throw new Error(res.message);
          } else {
            handleLogin(login, password);
            navigate('/access');
          }
        })
        .catch((err) => console.log(err));
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

  