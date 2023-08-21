
import React, {useState, useEffect} from 'react';

import {CurrentUserContext} from '../../contexts/CurrentUserContext';
import {Route, useNavigate, Navigate, Routes, Outlet } from 'react-router-dom';
import * as appApi from '../../utils/appApi';

import Stats from '../Stats/Stats';
import { checkStravaPermissions, getStravaToken, stravaTokenCheck } from '../../utils/stravaAuthApi';
import {getCurrentAthlete, getActivities, getAthlete} from '../../utils/stravaApi';
import {Profile} from '../../models/Profile';
import StravaAccessPage from '../StravaAccessPage/StravaAccessPage';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Garage from '../Garage/Garage';
import { Activity } from '../../models/Activity';
import Page404 from '../Page404/Page404';
import Maintenance from '../Maintenance/Maintenance';
import { AthleteStats } from '../../models/AthleteStats';
import RegPage from '../RegPage/RegPage';
import LoginPage from '../LoginPage/LoginPage';
import { Bike } from '../../models/Bike';
import AppLayout from '../AppLayout/AppLayout';
import { ActivitiesLoadingState } from '../../contexts/ActivitiesLoadingState';
import StravaAccessResult from '../StravaAccessResult/StravaAccessResult';
import { getLocalStorage, setLocalStorage } from '../../utils/service';
import { AuthProvider } from '../../contexts/AuthProvider';
import useAuth from '../../hooks/useAuth';


interface MainProps {
    onLoad: () => void
    registrationYear: number
}


export default function Main({onLoad, registrationYear}: MainProps) {

  const auth = useAuth();
  const isLoggedIn = auth.isLoggedIn;
  const isStravaConnected = auth.isConnectedToStrava;
  const strToken = localStorage.getItem('stravaToken');


  const yearsAtStrava = (currentYear: number, regYear: number): number[] => {
    let years: number[] = [];
    for(let y = regYear; y <= (currentYear); y++) {
      years.push(y);
    };
    return years;
  };

  
  useEffect(() => {    
    if(isLoggedIn && strToken) {
        onLoad();   
    }
  }, [isLoggedIn, strToken]);
  
  
  


return(
    <>
    <Outlet yearsAtStrava={yearsAtStrava} />
    </>
)

}