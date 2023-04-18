/* eslint-disable no-loop-func */
import React, {useState, useEffect} from 'react';
import {CurrentUserContext} from '../../contexts/CurrentUserContext';
import {createBrowserRouter, RouterProvider, createRoutesFromElements, Routes, Route, useNavigate, Navigate, useNavigation, redirect } from 'react-router-dom';
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



function App() {

  

  const accessToStrava: string | null = localStorage.getItem('accessToStrava');

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<Profile>({} as Profile);
  const [allActivities, setAllActivities] = useState<Activity[]>([]);
  const [userBikes, setUserBikes] = useState<Bike[]>([]);
  const [allRidesTotals, setAllRidesTotals] = useState<AthleteStats>({} as AthleteStats);
  const [allYTDRidesTotals, setAllYTDRidesTotals] = useState<AthleteStats>({} as AthleteStats);
  const [errMessage, setErrMessage] = useState<string>('');

  const [isLoading, setIsLoading] = useState<boolean>(false);

  
  const yearOfRegistrationAtStrava: number = new Date(currentUser.created_at).getFullYear();

  
  

  function checkAppToken() {
    const jwt = localStorage.getItem('jwt');
    if(jwt) {
      appApi.getAllBikes()  //TODO: заменить на надежный запрос ***************************************
        .then((bikes: Bike[]) => {
          if(bikes) {
            setIsLoggedIn(true);
            localStorage.setItem('logged', 'true')
        }
      })
      .catch(err => console.log('Неправильный токен приложения'));             
    }
  };


  function checkStravaToken() {
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


  function addAllUserBikes() {
    if(currentUser && currentUser.bikes.length !== 0) {
    const userBikes: Bike[] = currentUser.bikes.map((bike) => {      
      return {...bike, trainer: isTrainer(bike.id)};
    });
    appApi.addAllBikes(userBikes);
    console.log(userBikes);
    
    }
  }

  function updateBikeDistance() {
    if(currentUser.id) {
      const userBikes: Bike[] = currentUser.bikes;
      appApi.updateBikeOdo(userBikes);
    }
  }

  function setStrTokenToLocalStorage() {
    getStravaToken()
      .then((res) => {
        console.log(res);        
        localStorage.setItem('stravaToken', res.strToken)
      })
      .catch((err) => console.log(err));
  }

  
  function handleRegistration(login: string, password: string) {
    appApi.register(login, password)
      .then((res) => {
        if(res) {
          handleLogin(login, password);
          redirect('/access');
        }
      })
      .catch((err) => {
        console.log(err + 'Ошибка при регистрации');
      })
  }


  function handleLogin(login: string, password: string) {
    appApi.login(login, password)
    .then((data) => {
      if (data.token) {
        localStorage.setItem('jwt', data.token);
        setIsLoggedIn(true);
        localStorage.setItem('logged', 'true')      
        setStrTokenToLocalStorage();        
      };
    })
    .catch((err: string) => {
      console.log(err);
    });
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
    if(fromDate) {
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
      .catch((err) => {
        setErrMessage(err);
        console.log(err)
      });
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
          setUserBikes(bikes);
        }
      })
      .catch(err => console.log(err));
  };


  function logout() {
    localStorage.clear();
    setIsLoggedIn(false);
    redirect('/access');
  }



  useEffect(() => {
    if(isLoggedIn) {
      getCurrentUserInfo()
    }  
  }, [isLoggedIn]);
  console.log(currentUser);


  useEffect(() => {
    if(currentUser.id) {
      getUserStats(currentUser);
      addAllUserBikes();
    }
  }, [currentUser]);


  useEffect(() => {
    checkAppToken();
    checkStravaToken();
    updateBikeDistance();
  }, []);


  

console.log(isLoggedIn);


const router = createBrowserRouter(
  createRoutesFromElements(
    
      <>
      <Route element={<Header isLoggedIn={isLoggedIn} onLogout={logout}/>}>
        <Route path='/access' element={<AccessPage />} />
        <Route path='/registration' element={!isLoggedIn ? <RegPage handleRegistration={handleRegistration} /> : <Navigate to='/' replace={true} />} />
        <Route path='/login' element={!isLoggedIn ? <LoginPage handleLogin={handleLogin} /> : <Navigate to='/' replace={true} />} />
        
        
        <Route path='/about' element={<About />} />
        <Route element={<ProtectedRoute loggedIn={isLoggedIn} />}> 

          <Route path='/' element={<Main />}  />
          <Route path='/stats' 
            element={<Stats               
              registrationYear={yearOfRegistrationAtStrava} 
              yearsAtStrava={yearsAtStrava} 
              allRidesTotals={allRidesTotals} 
              allYTDRidesTotals={allYTDRidesTotals} 
              isLoading={isLoading} 
              allActivities={allActivities} 
            />}
          />          
        <Route path='/garage' 
            element={<Garage 
             
            bikes={userBikes} 
            yearsAtStrava={yearsAtStrava} 
            activities={allActivities} 
            bikeTotalDistance={getBikeTotalDistance} 
            />} 
          />
        
      
        <Route path='/maintenance' element={<Maintenance />} />
      </Route>
        <Route path='/*' element={<Page404 />} />
      </Route>        
        </>
  )
  );


  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
    
    <main>
      <RouterProvider router={router} />
      </main>
    <ErrorMessagePopup errMsg={errMessage} />
  </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
