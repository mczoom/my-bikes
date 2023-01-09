import React, {useState, useEffect} from 'react';
import {CurrentUserContext} from '../../contexts/CurrentUserContext'
import {Routes, Route, useNavigate} from 'react-router-dom';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Stats from '../Stats/Stats';
import { exchangeToken, renewToken } from '../../utils/stravaAuthApi';
import {getCurrentAthlete} from '../../utils/stravaApi'
import {Profile} from '../../models/Profile'
import { Token } from '../../models/Token';
import AccessPage from '../AccessPage/AccessPage';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import About from '../About/About';



function App() {

  const accessToStrava = localStorage.getItem('token');
  // const accessToStrava = false;
  const [currentUser, setCurrentUser] = useState<Profile>({} as Profile);
  const [token, setToken] = useState('');
  const [bikes, setBikes] = useState('');

  const navigate = useNavigate();

  const isLoggedIn = true;  //временный костыль для проверки на залогиненость

  const yearOfRegistrationAtStrava: number = new Date(currentUser.created_at).getFullYear();

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


  useEffect(() => {
    getCurrentUserInfo();
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
        <Route path='/stats' element={<Stats registrationYear={yearOfRegistrationAtStrava}/>} />
      </Routes>
    </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
