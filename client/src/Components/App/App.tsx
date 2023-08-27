/* eslint-disable no-loop-func */
import React, {useState, useEffect} from 'react';
import {CurrentUserContext} from '../../contexts/CurrentUserContext';
import {Route, useNavigate, Navigate, Routes } from 'react-router-dom';
import * as appApi from '../../utils/appApi';
import Main from '../Main/Main';
import Stats from '../Stats/Stats';
import { checkStravaPermissions, getStravaToken, stravaTokenCheck } from '../../utils/stravaAuthApi';
import {getCurrentAthlete, getActivities, getAthlete} from '../../utils/stravaApi';
import {Profile} from '../../models/Profile';
import StravaAccessPage from '../StravaAccessPage/StravaAccessPage';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Garage from '../Garage/Garage';
import { Activity } from '../../models/Activity';
import Page404 from '../Page404/Page404';
import Maintenance from '../Maintenance/Maintenance';
import { AthleteStats } from '../../models/AthleteStats';
import RegPage from '../RegPage/RegPage';
import LoginPage from '../LoginPage/LoginPage';
import { Bike } from '../../models/Bike';
import AppLayout from '../AppLayout/AppLayout';
import { ActivitiesLoadingState } from '../../contexts/ActivitiesLoadingState';
import StravaAccessResult from '../StravaAccessResult/StravaAccessResult';
import { getLocalStorage, setLocalStorage } from '../../utils/service';
import { AuthProvider } from '../../contexts/AuthProvider';
import useAuth from '../../hooks/useAuth';



function App() {

  const [currentUser, setCurrentUser] = useState<Profile>({} as Profile);
  const [allActivities, setAllActivities] = useState<Activity[]>([]);
  const [hasAllActivitiesLoaded, setHasAllActivitiesLoaded] = useState<boolean>(false)
  const [userBikes, setUserBikes] = useState<Bike[]>([]);
  const [allRidesTotals, setAllRidesTotals] = useState<AthleteStats>({} as AthleteStats);
  const [allYTDRidesTotals, setAllYTDRidesTotals] = useState<AthleteStats>({} as AthleteStats);
  const [errMessage, setErrMessage] = useState<string[]>([]);
  
  
  const navigate = useNavigate();
  const auth = useAuth();
  const isLoggedIn = auth.isLoggedIn;
  const isStravaConnected = auth.isConnectedToStrava;
  const setIsLoggedIn = auth.setIsLoggedIn;

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const yearOfRegistrationAtStrava: number = new Date(currentUser.created_at).getFullYear();

  

  interface StravaResponseWithError {
    message: string
    errors: [
        {
            resource: string
            field: string
            code: string
        }
    ]
  };


  function checkAppToken() {
    const jwt = localStorage.getItem('jwt');
    if(jwt) {
      appApi.getCurrentUser()
        .then((userData: {login: string}) => {
          if(userData.login) {            
            setIsLoggedIn(true);
            localStorage.setItem('logged', 'true')
        }
      })
      .catch(() => {
        setIsLoggedIn(false);
        localStorage.setItem('logged', '');
        setErrMessage([...errMessage, 'Необходимо авторизоваться в приложении']);
      });             
    }
  };


  async function checkStravaToken(token: string) {
    if(token) {
      await stravaTokenCheck()
        .then((res: {accessToken: string}) => {
          if(res.accessToken !== token) {
            localStorage.setItem('stravaToken', res.accessToken);
          }
        })
        .catch((err) => console.log(err));
    }  
  }; 


  function checkIfTrainer(bikeId: string): boolean {
    const trainings = allActivities.filter((activity: Activity) => {
      return activity.gear_id === bikeId
    });

    const isTrainer = trainings.every((ride) => {
      return ride.trainer === true;
    });

    return isTrainer;
  };

  

  
  function addAllUserBikes(currentUser: any) {
    if(currentUser.bikes.length !== 0 && hasAllActivitiesLoaded === true) {
      const userBikesFromStrava: Bike[] = currentUser.bikes.map((bike: Bike) => {  
        const isTrainer = checkIfTrainer(bike.id);
        return {...bike, trainer: isTrainer};
      });
      console.log(userBikesFromStrava);
      
      appApi.addAllBikes(userBikesFromStrava);    
    }
  };

  function addAllBikes(user: any) {
    appApi.getAllBikes()
      .then((res) => {
        if(res.message) {
          addAllUserBikes(user);
        } else {
          return;
        }
      })
      .catch(err => console.log(err));
  };


  function updateBikeDistance(currentUser: Profile) {    
    const currentUserBikes: Bike[] = currentUser.bikes;
    if(currentUserBikes.length > 0) {
      appApi.updateBikeOdo(currentUserBikes);
    } else {
      console.log('Байки пользователя не найдены');      
    }
  };
  


  function onAppLoad() {
    setErrMessage([]);
    getStravaToken()
      .then((stravaToken: string) => {
        if(!stravaToken) {
          throw new Error('StravaToken не найден')
        };  
        return checkStravaToken(stravaToken);
      })
      .then(() => getCurrentUserData())
      .catch((err) => {
        setErrMessage([...errMessage, `Ошибка: ${err.message}`])
      });    
  };
  


  function getUserRideStats(user: Profile) {
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
    if(hasAllActivitiesLoaded) {      
      return allActivities;
    };
    setHasAllActivitiesLoaded(false);
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

      } while(response !== 0);

      setAllActivities(activities);      
    }
    setHasAllActivitiesLoaded(true); 
  };

  console.log(allActivities);


  async function getCurrentUserData() { 
    getCurrentAthlete()
      .then((user) => {
        if(!user.id) {
         throw new Error(user.message)         
        }
        setCurrentUser(user); 
        return user;       
      })      
      .then(async(currentUser) => { 
        getUserRideStats(currentUser);     
        await getAllActivities(currentUser);
        return currentUser;       
      })
      .then((currentUser) => {
        addAllBikes(currentUser);
        setUserBikes(currentUser.bikes);
        updateBikeDistance(currentUser);
      })
      .catch((err) => {
        setErrMessage([...errMessage, `Не удалось получить данные пользователя: ${err.message}`])
        console.log(`Не удалось получить данные пользователя: ${err.message}`);        
      });    
  };

  function handleErrorMessage(errMsg: string) {
    setErrMessage([...errMessage, errMsg])
  };


  function getBikeTotalDistance(bikeId: string): number {
    let dist = 0;
    allActivities.forEach((act: Activity) => {
      if(act.gear_id === bikeId) {
        dist += act.distance;
      }
    });
    return dist;
  };


  const yearsAtStrava = (currentYear: number): number[] => {
    let years: number[] = [];
    for(let y = yearOfRegistrationAtStrava; y <= (currentYear); y++) {
      years.push(y);
    };
    return years;
  };
  
  
console.log(userBikes);
  

  function handleErrors(errMsg: string) {
    setErrMessage([...errMessage, errMsg])
  };

  

  useEffect(() => {
    //setErrMessage([]);
    checkAppToken();   
  }, []);

 
  const strToken = localStorage.getItem('stravaToken');

  useEffect(() => {    
    if(isLoggedIn && strToken) {
      onAppLoad();   
    }
  }, [isLoggedIn, strToken]);
  
  
  console.log(currentUser);   
  
  
    return (      
      <CurrentUserContext.Provider value={currentUser}> 
      <ActivitiesLoadingState.Provider value={hasAllActivitiesLoaded}>            
        <Routes>
          <Route path='/' element={<AppLayout setUser={setCurrentUser} errMessage={errMessage}/>}>
            
            <Route path='/registration' element={!isLoggedIn ? <RegPage /> : <Navigate to='/' replace={true} />} />
            <Route path='/login' element={!isLoggedIn ? <LoginPage /> : <Navigate to='/' replace={true} />} />        
            
            <Route path='/access' element={!isStravaConnected ? <StravaAccessPage /> : <Navigate to='/' replace={true} />} />
            
            {/* <Route element={<ProtectedRoute />}>
              <Route path='/access' element={<StravaAccessPage />} />
            </Route>  */}

            <Route path='/access-result' element={<StravaAccessResult onError={handleErrors}/>} />
      
            <Route path='/' element={<ProtectedRoute />}>
              <Route index element={<Main />}  />                
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
                  userBikesStrava={userBikes} 
                  yearsAtStrava={yearsAtStrava} 
                  activities={allActivities} 
                  bikeTotalDistance={getBikeTotalDistance} 
                />} 
              />
              <Route path='/maintenance' element={<Maintenance />} />
            </Route>
            <Route path='/*' element={<Page404 />} />
          </Route>        
        </Routes>      
      </ActivitiesLoadingState.Provider>
      </CurrentUserContext.Provider>      
    );
  }

export default App;
