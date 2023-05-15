/* eslint-disable no-loop-func */
import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import {CurrentUserContext} from '../../contexts/CurrentUserContext';
import {createBrowserRouter, RouterProvider, createRoutesFromElements, useNavigate, Navigate, useNavigation, redirect, useLocation, Outlet, Route } from 'react-router-dom';
import * as appApi from '../../utils/appApi';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Stats from '../Stats/Stats';
import { getStravaToken, stravaTokenCheck } from '../../utils/stravaAuthApi';
import {getCurrentAthlete, getActivities, getAthlete} from '../../utils/stravaApi';
import {Profile} from '../../models/Profile';
import AccessPage from '../AccessPage/AccessPage';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import About from '../About/About';
import Garage from '../Garage/Garage';
import { Activity } from '../../models/Activity';
import Page404 from '../Page404/Page404';
import Maintenance from '../Maintenance/Maintenance';
import { AthleteStats } from '../../models/AthleteStats';
import RegPage from '../RegPage/RegPage';
import LoginPage from '../LoginPage/LoginPage';
import { Bike } from '../../models/Bike';
import ErrorMessagePopup from '../ErrorMessagePopup/ErrorMessagePopup';
import AppLayout from '../AppLayout/AppLayout';
import App from './App';




function Root() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<App />}/>  
         
      )
  );

  
  


  return <RouterProvider router={router} />;

};
  

export default Root;
