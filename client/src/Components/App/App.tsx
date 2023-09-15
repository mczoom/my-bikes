/* eslint-disable no-loop-func */
import {useState, useEffect} from 'react';
import {CurrentUserContext} from '../../contexts/CurrentUserContext';
import {Route, Navigate, Routes } from 'react-router-dom';
import * as appApi from '../../utils/appApi';
import Main from '../Main/Main';
import Stats from '../Stats/Stats';
import { getStravaToken, stravaTokenCheck } from '../../utils/stravaAuthApi';
import {getCurrentAthlete, getActivities, getAthlete} from '../../utils/stravaApi';
import {Profile} from '../../models/Profile';
import StravaAccessPage from '../Auth/StravaAuth/StravaAccessPage';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import Garage from '../Garage/Garage';
import { Activity } from '../../models/Activity';
import Page404 from '../Page404/Page404';
import Maintenance from '../Maintenance/Maintenance';
import { AthleteStats, RidesTotals } from '../../models/AthleteStats';
import RegPage from '../Auth/RegPage/RegPage';
import LoginPage from '../Auth/LoginPage/LoginPage';
import { Bike } from '../../models/Bike';
import AppLayout from '../AppLayout/AppLayout';
import { ActivitiesLoadingState } from '../../contexts/ActivitiesLoadingState';
import StravaAccessResult from '../Auth/StravaAuth/StravaAccessResult';
import useAuth from '../../hooks/useAuth';



export default function App() {

  const [currentUser, setCurrentUser] = useState<Profile>({} as Profile);
  const [allActivities, setAllActivities] = useState<Activity[]>([]);
  const [hasAllActivitiesLoaded, setHasAllActivitiesLoaded] = useState<boolean>(false)
  const [userBikes, setUserBikes] = useState<Bike[]>([]);
  const [allRidesTotals, setAllRidesTotals] = useState<RidesTotals>({} as RidesTotals);
  const [allYTDRidesTotals, setAllYTDRidesTotals] = useState<RidesTotals>({} as RidesTotals);
  const [errMessage, setErrMessage] = useState<string[]>([]);
  
  const auth = useAuth();
  const isLoggedIn = auth.isLoggedIn;
  const isStravaConnected = auth.isConnectedToStrava;
  const setIsLoggedIn = auth.setIsLoggedIn;
  
  const strToken = localStorage.getItem('stravaToken');
  const yearOfRegistrationAtStrava: number = new Date(currentUser.created_at).getFullYear();

  
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

  
  function addAllUserBikes(currentUser: Profile) {
    if(currentUser.bikes.length !== 0 && hasAllActivitiesLoaded === true) {
      const userBikesFromStrava: Bike[] = currentUser.bikes.map((bike: Bike) => {  
        const isTrainer = checkIfTrainer(bike.id);
        return {...bike, trainer: isTrainer};
      });      
      appApi.addAllBikes(userBikesFromStrava);    
    }
  };

  function addAllBikes(user: Profile) {
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
      .then((strToken: string) => {
        if(!strToken) {
          throw new Error('StravaToken не найден')
        };  
        return checkStravaToken(strToken);
      })
      .then(() => getCurrentUserData())
      .catch((err) => {
        setErrMessage([...errMessage, `Ошибка: ${err.message}`])
      });    
  };
  


  function getUserRideStats(user: Profile) {
    getAthlete(user.id)
      .then((res: AthleteStats) => {
        setAllRidesTotals((res.all_ride_totals));
        setAllYTDRidesTotals(res.ytd_ride_totals);
      })
      .catch((err) => console.log(err))
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
         throw new Error(JSON.stringify(user))         
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
    checkAppToken();   
  }, []); 
  

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
            <Route path='/access-result' element={<StravaAccessResult onError={handleErrors}/>} />
      
            <Route path='/' element={<ProtectedRoute />}>
              <Route index element={<Main />}  />                
              <Route path='/stats' 
                element={<Stats               
                  registrationYear={yearOfRegistrationAtStrava} 
                  yearsAtStrava={yearsAtStrava} 
                  allRidesTotals={allRidesTotals} 
                  allYTDRidesTotals={allYTDRidesTotals}
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
