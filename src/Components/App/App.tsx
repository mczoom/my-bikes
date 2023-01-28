import React, {useState, useEffect} from 'react';
import {CurrentUserContext} from '../../contexts/CurrentUserContext';
import {Routes, Route, useNavigate} from 'react-router-dom';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Stats from '../Stats/Stats';
import { exchangeToken, renewToken } from '../../utils/stravaAuthApi';
import {getCurrentAthlete, getActivities} from '../../utils/stravaApi';
import {Profile} from '../../models/Profile';
import { ExchangeToken } from '../../models/ExchangeToken';
import {Ride} from '../../models/Ride';
import AccessPage from '../AccessPage/AccessPage';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import About from '../About/About';
import Garage from '../Garage/Garage';
import { tokenData } from '../../utils/constants';
import { Activity } from '../../models/Activity';
import { RefreshToken } from '../../models/RefreshToken';
import Page404 from '../Page404/Page404';
import Maintenance from '../Maintenance/Maintenance';



function App() {

  const accessToStrava: string | null = localStorage.getItem('accessToStrava');

  const [currentUser, setCurrentUser] = useState<Profile>({} as Profile);
  const [allActivities, setAllActivities] = useState<Activity[]>([]);
  const [isStravaTokenExpired, setIsStravaTokenExpired] = useState<boolean>(false);
  const [bikes, setBikes] = useState('');

  const dateOfRegAtStrava: string = currentUser.created_at;
  const yearOfRegistrationAtStrava: number = new Date(currentUser.created_at).getFullYear();


  const isLoggedIn = true;  //временный костыль для проверки на залогиненость



  async function getAllActivities() {
    const fromDate: number = Date.parse(dateOfRegAtStrava) / 1000;
    const tillDate: number = Math.round(Date.now() / 1000);
    let activities: Activity[] = [];
    let page = 1;
    let response = 0;

      do {
        await getActivities({fromDate, tillDate, page})
          .then((res: Activity[]) => {
            response = res.length;
            activities.push(...res);
          })
          .catch((err) => {
            console.log(err);
          });

        page++;

      } while(response !== 0 );

      setAllActivities(activities);
  }

  console.log(allActivities);


  function checkIsStravaTokenExpired() {
    const dateNow: number = Date.now() / 1000;
    const expDate: any = tokenData().expires_at;
    const isTokenExpired: number = (expDate - dateNow);
    if(isTokenExpired) {
      setIsStravaTokenExpired(true);
    }
  }


  const refreshToken: string | undefined = tokenData().refresh_token;

  function getCurrentUserInfo() {
    getCurrentAthlete()
      .then((user) => {
        if(user.id) {
          setCurrentUser(user)}
      })
      .catch((err) => console.log(err));
  }


  function getBikeTotalDistance(bikeId: string) {
    let dist = 0;
    allActivities.forEach((act) => {
      if(act.gear_id === bikeId) {
        dist += act.distance;
      }
    });
    return dist;
  }


  const yearsAtStrava = (currentYear: number): number[] => {
    let years: number[] = [];
    for(let i = yearOfRegistrationAtStrava; i <= (currentYear); i++) {
      years.push(i);
    };
    return years;
  }

  useEffect(() => {
    checkIsStravaTokenExpired();
  }, []);

  useEffect(() => {
    if(isStravaTokenExpired) {
      renewToken(refreshToken);
    }
  }, [isStravaTokenExpired]);



  useEffect(() => {
    if(!accessToStrava) {
      exchangeToken();
    }
  }, [accessToStrava]);


  useEffect(() => {
    getCurrentUserInfo();
    getAllActivities();
  }, []);
  console.log(currentUser);




  return (
    <CurrentUserContext.Provider value={currentUser}>
    <div className="page">
      <Header />
      <main>
        <Routes>
          <Route path='/access' element={<AccessPage />} />
          <Route path='/' element={<ProtectedRoute element={Main} isAuthorized={accessToStrava}/>}  />
          <Route path='/about' element={<About />} />
          <Route path='/stats' element={<Stats registrationYear={yearOfRegistrationAtStrava} yearsAtStrava={yearsAtStrava}/>} />
          <Route path='/garage' element={<Garage yearsAtStrava={yearsAtStrava} activities={allActivities} bikeTotalDistance={getBikeTotalDistance} />} />
          <Route path='/maintenance' element={<Maintenance />} />
          <Route path='/*' element={<Page404 />} />
        </Routes>
      </main>
    </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
