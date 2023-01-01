import React, {useState, useEffect} from 'react';
import {Routes, Route} from 'react-router-dom'
import Header from '../Header/Header';
import Main from '../Main/Main';
import Stats from '../Stats/Stats';
import AccessPage from '../AccessPage/AccessPage';



function App() {

  const accessToStrava = localStorage.getItem('accessGranted');

  const [token, setToken] = useState('');
  const [bikes, setBikes] = useState('');






    //   const getAthlete = () => {
    //     return fetch(`https://www.strava.com/api/v3/athlete`, {
    //       method: 'GET',
    //       headers: {
    //         "Content-Type": "application/json",
    //         "Authorization": `Bearer ${token.access_token}`,
    //       }
    //     })
    //     .then((res) => res.json())
    //     .then((res) => setBikes(res.bikes))
    //     .catch((err) => console.log(err))
    //   };



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
