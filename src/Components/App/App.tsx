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
import { Activity } from '../../models/Activity';



function App() {

  const accessToStrava = localStorage.getItem('token');

  const [currentUser, setCurrentUser] = useState<Profile>({} as Profile);
  const [allActivities, setAllActivities] = useState<Activity[]>([]);
  const [token, setToken] = useState('');
  const [bikes, setBikes] = useState('');

  const dateOfRegistrationAtStrava: string = currentUser.created_at;
  const yearOfRegistrationAtStrava: number = new Date(currentUser.created_at).getFullYear();



  const isLoggedIn = true;  //временный костыль для проверки на залогиненость


  const getAllActivities = () => {
    const fromDate = Date.parse(dateOfRegistrationAtStrava) / 1000;
    const tillDate = Math.round(Date.now() / 1000);
    let aaa: any = [];
    let page = 1;


    do {


          // setAllActivities((v) => (v.concat(res)));
          page += 1;
aaa.push(page);
          console.log(page);
          console.log(aaa);
          setAllActivities(aaa);

    } while(page <=5);
return aaa;



  // for(let page = 1; page <= 10; page++) {
  //   getActivities({fromDate, tillDate, page})
  //     .then((res: any) => {
  //       if(!res.message) {
  //         setAllActivities((v) => (v.concat(res)));
  //         aaa += 1;
  //         console.log(aaa);
  //       } else {
  //         return;
  //       }
  //     })
  //     .catch((err) => console.log(err));
  //   }

  }
  console.log(allActivities);
console.log(getAllActivities);




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
    if(!accessToStrava) {
      exchangeToken();
    } else if (!isTokenExpired) {
      renewToken(refreshToken);
    };
  }, [accessToStrava, isTokenExpired]);


  useEffect(() => {
    getCurrentUserInfo();
    getAllActivities();
  }, []);
  console.log(currentUser);




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
