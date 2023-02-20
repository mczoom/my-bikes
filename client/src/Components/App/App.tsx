import React, {useState, useEffect} from 'react';
import {CurrentUserContext} from '../../contexts/CurrentUserContext';
import {Routes, Route, useNavigate} from 'react-router-dom';
import * as appApi from '../../utils/appApi';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Stats from '../Stats/Stats';
import { exchangeToken, renewToken } from '../../utils/stravaAuthApi';
import {getCurrentAthlete, getActivities, getAthlete} from '../../utils/stravaApi';
import {Profile} from '../../models/Profile';
import AccessPage from '../AccessPage/AccessPage';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import About from '../About/About';
import Garage from '../Garage/Garage';
import { tokenData } from '../../utils/constants';
import { Activity } from '../../models/Activity';
import Page404 from '../Page404/Page404';
import Maintenance from '../Maintenance/Maintenance';
import { AthleteStats } from '../../models/AthleteStats';
import RegPage from '../RegPage/RegPage';
import LoginPage from '../LoginPage/LoginPage';



function App() {

  const accessToStrava: string | null = localStorage.getItem('accessToStrava');

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<Profile>({} as Profile);
  const [allActivities, setAllActivities] = useState<Activity[]>([]);
  const [isStravaTokenExpired, setIsStravaTokenExpired] = useState<boolean>(false);
  const [allRidesTotals, setAllRidesTotals] = useState<AthleteStats>({} as AthleteStats);
  const [allYTDRidesTotals, setAllYTDRidesTotals] = useState<AthleteStats>({} as AthleteStats);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const dateOfRegAtStrava: string = currentUser.created_at;
  const yearOfRegistrationAtStrava: number = new Date(currentUser.created_at).getFullYear();


  // const access = () => localStorage.getItem('accessToStrava');
  const access = () => true;

  const navigate = useNavigate();


  function handleRegistration(login: string, password: string) {
    appApi.register(login, password)
      .then((res) => {
        if(res) {
          handleLogin(login, password);
        }
      })
      .catch((err) => {
        console.log('Ошибка при регистрации');
      })
  }


  function handleLogin(login: string, password: string) {
    appApi.login(login, password)
    .then((data) => {
      if(data.token) {
        localStorage.setItem('token', data.token);
        setIsLoggedIn(true);
        localStorage.setItem('isLoggedIn', 'true');
        navigate('/');
      };
    })
    .catch((err: string) => {
      console.log(err);
    });
    if(isLoggedIn) {
      getCurrentAthlete()
      .then((user) => {
        setCurrentUser(user)}
      )
      .catch((err) => console.log(err));
    }
  };


  function getUserStats(user: Profile) {
    setIsLoading(true);
    getAthlete(user.id)
      .then((res) => {
        setAllRidesTotals((res.all_ride_totals));
        setAllYTDRidesTotals(res.ytd_ride_totals);
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  };


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
            return;
          });
        page++;

      } while(response !== 0 );

    setAllActivities(activities);
  }

  console.log(allActivities);


  function checkIsStravaTokenExpired() {
    const dateNow: number = Date.now() / 1000;
    const expDate: number = tokenData()?.expires_at;
    const isTokenExpired: number = (expDate - dateNow);
    if(isTokenExpired < 0) {
      setIsStravaTokenExpired(true);
    }
  }


  const refreshToken: string | undefined = tokenData()?.refresh_token;

  function getCurrentUserInfo() {
    getCurrentAthlete()
      .then((user) => {
        if(user.id) {
          setCurrentUser(user)}
      })
      .catch((err) => console.log(err));
  }


  function getBikeTotalDistance(bikeId: string): number {
    let dist = 0;
    allActivities.forEach((act: Activity) => {
      if(act.gear_id === bikeId) {
        dist += act.distance;
      }
    });
    return dist;
  }


  const yearsAtStrava = (currentYear: number): number[] => {
    let years: number[] = [];
    for(let y = yearOfRegistrationAtStrava; y <= (currentYear); y++) {
      years.push(y);
    };
    return years;
  }


  useEffect(() => {
    checkIsStravaTokenExpired();
    if(isStravaTokenExpired) {
      renewToken(refreshToken);
    };
  });


  useEffect(() => {
    if(!tokenData()) {
      exchangeToken();
    }
  }, []);


  useEffect(() => {
    getCurrentUserInfo();
  }, []);
  console.log(currentUser);


  useEffect(() => {
    if(currentUser.id) {
      getUserStats(currentUser);
    }
  }, [currentUser]);

  useEffect(() => {
    getAllActivities();
  }, []);


  return (
    <CurrentUserContext.Provider value={currentUser}>
    <div className="page">
      <Header />
      <main>
        <Routes>
          <Route path='/access' element={<AccessPage />} />
          <Route path='/registration' element={<RegPage handleRegistration={handleRegistration} />} />
          <Route path='/login' element={<LoginPage handleLogin={handleLogin} />} />
          <Route path='/' element={<ProtectedRoute element={Main} isAuthorized={access}/>}  />
          <Route path='/about' element={<About />} />
          <Route path='/stats' element={<ProtectedRoute element={Stats} isAuthorized={access} registrationYear={yearOfRegistrationAtStrava} yearsAtStrava={yearsAtStrava} allRidesTotals={allRidesTotals} allYTDRidesTotals={allYTDRidesTotals} isLoading={isLoading} allActivities={allActivities} />} />
          <Route path='/garage' element={<ProtectedRoute element={Garage} isAuthorized={access} yearsAtStrava={yearsAtStrava} activities={allActivities} bikeTotalDistance={getBikeTotalDistance} />} />
          <Route path='/maintenance' element={<ProtectedRoute element={Maintenance} isAuthorized={access} />} />
          <Route path='/*' element={<Page404 />} />
        </Routes>
      </main>
    </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
