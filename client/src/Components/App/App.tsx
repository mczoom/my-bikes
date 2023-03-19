/* eslint-disable no-loop-func */
import React, {useState, useEffect} from 'react';
import {CurrentUserContext} from '../../contexts/CurrentUserContext';
import {Routes, Route, useNavigate} from 'react-router-dom';
import * as appApi from '../../utils/appApi';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Stats from '../Stats/Stats';
import { exchangeToken, refreshToken, stravaTokenCheck } from '../../utils/stravaAuthApi';
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



function App() {

  const accessToStrava: string | null = localStorage.getItem('accessToStrava');

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<Profile>({} as Profile);
  const [stravaTokenExpTime, setStravaTokenExpTime] = useState<number | undefined>(undefined);
  const [allActivities, setAllActivities] = useState<Activity[]>([]);
  const [userBikes, setUserBikes] = useState<Bike[]>([]);
  const [isStravaTokenExpired, setIsStravaTokenExpired] = useState<boolean>(false);
  const [allRidesTotals, setAllRidesTotals] = useState<AthleteStats>({} as AthleteStats);
  const [allYTDRidesTotals, setAllYTDRidesTotals] = useState<AthleteStats>({} as AthleteStats);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  
  const yearOfRegistrationAtStrava: number = new Date(currentUser.created_at).getFullYear();

  
  // const access = () => localStorage.getItem('accessToStrava');
  const access = () => true;

  const navigate = useNavigate();

  function strTokenCheck() {
    const token = localStorage.getItem('stravaToken');
    if(token) {
      stravaTokenCheck()
        .then((res) => {
          if(res.accessToken !== token) {
            localStorage.setItem('stravaToken', res.accessToken);
          }
        })
        .catch((err) => console.log(err));
    }  
  }; 

  function isTrainer(bikeId: string): boolean | undefined {
    const bike = allActivities.find( function(activity) {
      return activity.gear_id == bikeId;
    });    
    return bike?.trainer;
  }


  function addAllBikes() {    
    const userBikes: Bike[] = currentUser?.bikes?.map((bike) => {
      return {...bike, trainer: isTrainer(bike.id)};
    });
    appApi.addAllBikes(userBikes);
  }

 
  
  function handleRegistration(login: string, password: string) {
    appApi.register(login, password)
      .then((res) => {
        if(res) {
          handleLogin(login, password);
          navigate('/access', {replace: true});
        }
      })
      .catch((err) => {
        console.log(err + 'Ошибка при регистрации');
      })
  }


  function handleLogin(login: string, password: string) {
    appApi.login(login, password)
    .then((data) => {
      if(data.token) {
        localStorage.setItem('jwt', data.token);
        setIsLoggedIn(true);
      };
    })
    .catch((err: string) => {
      console.log(err);
    });
    // if(isLoggedIn) {
    //   getCurrentAthlete()
    //   .then((user) => {
    //     setCurrentUser(user)}
    //   )
    //   .catch((err) => console.log(err));
    // }
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


  async function getAllActivities(user: Profile) {
    const dateOfRegAtStrava: string = user.created_at;
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
  };

  console.log(allActivities);


  function getCurrentUserInfo() {
    getCurrentAthlete()
      .then((user) => {
        if(user.id) {
          setCurrentUser(user);          
        }        
        return user
      })
      .then((currentUser) => {      
        getAllActivities(currentUser);        
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
  };


  function getUserBikes() {
    appApi.getAllBikes()
      .then((bikes: Bike[]) => {
        if(bikes) {
          setIsLoggedIn(true);
          setUserBikes(bikes);
        }
      })
      .catch(err => console.log(err));
  };


  function checkToken() {
    const jwt = localStorage.getItem('jwt');
    if(jwt) {
      appApi.getAllBikes()
        .then((bikes) => {
          if(bikes) {
            setIsLoggedIn(true);
            setUserBikes(bikes);
          }
        })
        .catch(err => console.log(err));
    }
  };


  // useEffect(() => {
  //   checkIsStravaTokenExpired();
  //   if(isStravaTokenExpired) {
  //     renewToken(refreshToken);
  //     renewToken();
  //   };
  // });


  // useEffect(() => {
  //   if(!tokenData()) {
  //     exchangeToken();
  //   }
  // }, []);

  useEffect(() => {
    strTokenCheck();
  }, []);


  useEffect(() => {
    //checkToken();
    getCurrentUserInfo()  
  }, []);
  console.log(currentUser);

  // useEffect(() => {
  //   if(currentUser.id){
  //   addBikes();
  //   }
  // }, [currentUser]);


  useEffect(() => {
    if(currentUser.id) {
      getUserStats(currentUser);
      addAllBikes();
    }
  }, [currentUser]);


  // useEffect(() => {
  //   if(currentUser.id) {
  //     getAllActivities();
  //   }
  // }, []);




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
          <Route path='/garage' element={<ProtectedRoute element={Garage} isAuthorized={access} bikes={userBikes} yearsAtStrava={yearsAtStrava} activities={allActivities} bikeTotalDistance={getBikeTotalDistance} />} />
          <Route path='/maintenance' element={<ProtectedRoute element={Maintenance} isAuthorized={access} />} />
          <Route path='/*' element={<Page404 />} />
        </Routes>
      </main>
    </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
