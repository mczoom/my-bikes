import React, {useState, useEffect} from 'react';
import {Routes, Route} from 'react-router-dom';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Stats from '../Stats/Stats';
import AccessPage from '../AccessPage/AccessPage';
import { useNavigate } from 'react-router-dom';
import { translateToken, renewToken } from '../../utils/stravaAuthApi';
import { Token } from '../../models/Token';



function App() {

  const accessToStrava = localStorage.getItem('accessGranted');

  const [token, setToken] = useState('');
  const [bikes, setBikes] = useState('');

  const navigate = useNavigate();

  const dateNow: number = Date.now() / 1000;
  const tokenData: Token = JSON.parse(localStorage.getItem('token') || "");
  const expDate: number = tokenData.expires_at;
  const isTokenExpired: number = (expDate - dateNow);
  const refreshToken: string = tokenData.refresh_token;







  useEffect(() => {
    if(!localStorage.getItem('token')) {
      translateToken();
      navigate("/");
    } else if (isTokenExpired <= 0) {
      renewToken(refreshToken);
    }
  }, [])



  return (
    <div className="page">
      <Header />
      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/access' element={<AccessPage />} />
        <Route path='/stats' element={<Stats />} />
      </Routes>
    </div>
  );
}

export default App;
