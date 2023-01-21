import React, {useState, useEffect} from 'react';
import {CurrentUserContext} from '../../contexts/CurrentUserContext';
import {Routes, Route, useNavigate} from 'react-router-dom';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Stats from '../Stats/Stats';
import { exchangeToken, renewToken } from '../../utils/stravaAuthApi';
import {getCurrentAthlete, getActivities} from '../../utils/stravaApi';
import {Profile} from '../../models/Profile';
import { Token } from '../../models/Token';
import {Ride} from '../../models/Ride';
import AccessPage from '../AccessPage/AccessPage';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import About from '../About/About';
import Garage from '../Garage/Garage';
import { currentYear } from '../../utils/constants';



function App() {

  const accessToStrava = localStorage.getItem('token');
  // const accessToStrava = false;
  const [currentUser, setCurrentUser] = useState<Profile>({} as Profile);
  const [allActivities, setAllActivities] = useState<Ride[]>([]);
  const [token, setToken] = useState('');
  const [bikes, setBikes] = useState('');

  const dateOfRegistrationAtStrava: string = currentUser.created_at;
  const yearOfRegistrationAtStrava: number = new Date(currentUser.created_at).getFullYear();

  const navigate = useNavigate();

  const isLoggedIn = true;  //временный костыль для проверки на залогиненость


  function getAllActivities() {
    const fromDate = Date.parse(dateOfRegistrationAtStrava) / 1000;
    const tillDate = Date.now() / 1000;
    getActivities({fromDate, tillDate})
      .then((res) => setAllActivities(res))
      .catch((err) => console.log(err));
  }
  console.log(allActivities)


  // const fromYear = (y: number) => {
  //   return Date.parse(y.toString()) / 1000;
  // }currentUser

  // const tillYear = (y:number) => {
  //   return Date.parse((y + 1).toString()) / 1000 - 1;
  // }


  const tokenData = (): Token => {
    let token = {};
    if(localStorage.getItem('token')) {
      token = JSON.parse(localStorage.getItem('token') || "");
    }
    return token;
  }

  const dateNow: number = Date.now() / 1000;
  // const tokenData: Token = JSON.parse(localStorage.getItem('token') || "");

  const expDate: any = tokenData().expires_at;
  const isTokenExpired: number = (expDate - dateNow);
  const refreshToken: string | undefined = tokenData().refresh_token;

  function getCurrentUserInfo() {
    getCurrentAthlete()
      .then((user) => setCurrentUser(user))
      .catch((err) => console.log(err));
  }



  // function yearsAtStrava(currentYear: number): number[] {
  //   let years: number[] = [];
  //   for(let i = yearOfRegistrationAtStrava; i <= (currentYear); i++) {
  //     years.push(i);
  //   };
  //   return years;
  // }


  const yearsAtStrava = (currentYear: number): number[] => {
    let years: number[] = [];
    for(let i = yearOfRegistrationAtStrava; i <= (currentYear); i++) {
      years.push(i);
    };
    return years;
  }



  useEffect(() => {
    getCurrentUserInfo();
    getAllActivities();
  }, [isLoggedIn])
  console.log(currentUser);

  useEffect(() => {
    if(accessToStrava) {
    if(!localStorage.getItem('token')) {
      exchangeToken();
    } else if (isTokenExpired <= 0) {
      renewToken(refreshToken);
    }
  }
  }, [])



  return (
    <CurrentUserContext.Provider value={currentUser}>
    <div className="page">
      <Header />
      <Routes>
        <Route path='/access' element={<AccessPage />} />
        <Route path='/' element={<ProtectedRoute component={Main} isAuthorized={accessToStrava}/>}  />
        <Route path='/about' element={<About />} />
        <Route path='/stats' element={<Stats registrationYear={yearOfRegistrationAtStrava} yearsAtStrava={yearsAtStrava}/>} />
        <Route path='/garage' element={<Garage yearsAtStrava={yearsAtStrava}/>} />
      </Routes>
    </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
