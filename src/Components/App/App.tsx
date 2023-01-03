import React, {useState, useEffect} from 'react';
import {Routes, Route, useNavigate} from 'react-router-dom';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Stats from '../Stats/Stats';
import { exchangeToken, renewToken } from '../../utils/stravaAuthApi';
import { Token } from '../../models/Token';
import AccessPage from '../AccessPage/AccessPage';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';



function App() {

  // const accessToStrava = localStorage.getItem('token');
  const accessToStrava = false;
  const [token, setToken] = useState('');
  const [bikes, setBikes] = useState('');

  const navigate = useNavigate();

  const dateNow: number = Date.now() / 1000;
  const tokenData: Token = JSON.parse(localStorage.getItem('token') || "");
  console.log(localStorage.getItem('token'));
  const expDate: number = tokenData.expires_at;
  const isTokenExpired: number = (expDate - dateNow);
  const refreshToken: string = tokenData.refresh_token;



  useEffect(() => {
    if(!localStorage.getItem('token')) {
      exchangeToken();
    } else if (isTokenExpired <= 0) {
      renewToken(refreshToken);
    }
  }, [])



  return (
    <div className="page">
      <Header />
      <Routes>
        <Route path='/access' element={<AccessPage />} />
        <Route path='/' element={<ProtectedRoute component={<Main/>} isAuthorized={accessToStrava}/>}  />

        {/* <Route path='/access' element={<AccessPage />} /> */}
        <Route path='/stats' element={<Stats />} />
      </Routes>
    </div>
  );
}

export default App;
