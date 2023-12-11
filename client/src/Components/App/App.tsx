/* eslint-disable no-loop-func */
import {useState, useEffect} from 'react';
import {CurrentUserContext} from 'contexts/CurrentUserContext'; 
import {Route, Navigate, Routes } from 'react-router-dom';
import * as appApi from 'utils/appApi';
import Main from 'components/Main/Main';
import Stats from 'components/Main/Stats/Stats';
import { getStravaToken, stravaTokenCheck } from 'utils/stravaAuthApi';
import {getCurrentAthlete, getActivities, getAthlete} from 'utils/stravaApi'; 
import {Profile} from 'types/Profile';
import StravaAccessPage from 'components/Auth/StravaAuth/StravaAccessPage';
import ProtectedRoute from 'components/ProtectedRoute/ProtectedRoute';
import Garage from 'components/Main/Garage/Garage';
import { Activity } from 'types/Activity';
import Page404 from 'components/Page404/Page404';
import Maintenance from 'components/Maintenance/Maintenance';
import { AthleteStats, RidesTotals } from 'types/AthleteStats';
import RegPage from 'components/Auth/RegPage/RegPage';
import LoginPage from 'components/Auth/LoginPage/LoginPage';
import { Bike } from 'types/Bike';
import AppLayout from 'components/AppLayout/AppLayout';
import { ActivitiesLoadingState } from 'contexts/ActivitiesLoadingState';
import StravaAccessResult from 'components/Auth/StravaAuth/StravaAccessResult';
import useAuth from 'hooks/useAuth';
import useSnackbar from 'hooks/useSnackbar';
import useBikes from 'hooks/useBikes';
import { checkIfTrainer, currentYear, getYearsAtStrava } from 'utils/constants';
import { log } from 'console';



export default function App() {

  const [currentUser, setCurrentUser] = useState<Profile>({} as Profile);
  const [allActivities, setAllActivities] = useState<Activity[]>([]);
  const [storedActivities, setStoredActivities] = useState<Activity[] | null>(null);
  const [hasAllActivitiesLoaded, setHasAllActivitiesLoaded] = useState<boolean>(false)
  const [userBikes, setUserBikes] = useState<Bike[]>([]);

  const auth = useAuth();
  const isLoggedIn = auth.isLoggedIn;
  const isStravaConnected = auth.isConnectedToStrava;
  const setIsLoggedIn = auth.setIsLoggedIn;

  const savedBikes = useBikes();
  const snackbar = useSnackbar();  
  
  const yearsAtStrava = getYearsAtStrava(currentYear, currentUser.created_at).reverse();

  
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
      .catch((err) => {
        setIsLoggedIn(false);
        localStorage.setItem('logged', '');
        snackbar.handleSnackbarError(err);
      });             
    }
  };


  async function checkStravaToken(token: string) {
    if(token) {
      await stravaTokenCheck()
        .then((res: {accessToken: string}) => {
          if(res.accessToken !== token) {
            localStorage.setItem('stravaToken', res.accessToken);
          };
        })
        .catch((err) => console.log(err));
    }  
  }; 

  
  // function storeAllUserBikesToDB(currentUser: Profile) {
  //   if(currentUser.bikes.length && hasAllActivitiesLoaded === true) {
  //     const userBikesFromStrava: Bike[] = currentUser.bikes.map((bike: Bike) => {  
  //       const isTrainer = checkIfTrainer(bike.id, allActivities);
  //       return {...bike, trainer: isTrainer};
  //     });      
  //     appApi.addAllBikes(userBikesFromStrava);    
  //   };
  // };


  function addTrainerPropToBikes(bikes: Bike[], activities: Activity[]) {
    
    return bikes?.map((bike) => {  
      const isTrainer = checkIfTrainer(bike.id, activities);
      return {...bike, trainer: isTrainer};
    });    
  
  };  


  function updateBikeDistance(bikes: Bike[]) {    
    appApi.updateBikeOdo(bikes)
      .then(() => console.log('Пробег байков успешно обновлён'))
      .catch(() => snackbar.handleSnackbarError('Не удалось обновить пробег байков'))
  };


  function handleBikes(user: Profile, bikes: Bike[]) {
    if(!bikes.length) {
      //const bikesWithTrainerProp = addTrainerPropToBikes(user.bikes, activities);   
      appApi.addAllBikes(user.bikes);
      setUserBikes(user.bikes)
      return;
    };
    updateBikeDistance(user.bikes)
    setUserBikes(bikes)    
  };  

 
  // function getUserRideStats(user: Profile) {
  //   getAthlete(user.id)
  //     .then((res: AthleteStats) => {
  //       setallRidesTotalData(res.all_ride_totals);
  //       setAllYTDRidesTotalDist(res.ytd_ride_totals);
  //     })
  //     .catch((err) => console.log(err));
  // };


  async function getAllActivitiesFromStrava(user: Profile) {    
    //setHasAllActivitiesLoaded(false);
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
    //setHasAllActivitiesLoaded(true);
    return activities;
  };


  function getAllStoredActivities() {  
    let rides: Activity[] = [];  
    appApi.getAllActivities()
      .then((res: Activity[]) => {
        setStoredActivities(res)
        rides = res;
      })
      .catch(() => console.log('Тренировки не найдены в базе')); 
      return rides;     
  };


   console.log(allActivities);

 async function handleActivities(user: Profile) {
  setHasAllActivitiesLoaded(false);
    await Promise.all([getAllActivitiesFromStrava(user), appApi.getAllActivities()])
      .then(([activitiesFromStrava, activitiesFromDB]) => {
        if(!activitiesFromDB.length) {
          appApi.addAllActivities(activitiesFromStrava);
        } else if (activitiesFromStrava.length !== activitiesFromDB.length) {
          appApi.updateAllActivities(activitiesFromStrava);
        }
      })
      .catch((err) => console.log(err))
      setHasAllActivitiesLoaded(true);
  };
  
  async function getCurrentUserData() { 
    getCurrentAthlete()
      .then((user: Profile) => {
        setCurrentUser(user);
        return user;       
      })      
      .then((currentUser) => {             
        handleActivities(currentUser);
        handleBikes(currentUser, savedBikes); 
      })      
      .catch((err) => snackbar.handleSnackbarError(err));    
  };

  
  // function getBikeTotalDistance(bikeId: string): number {
  //   let dist = 0;
  //   allActivities.forEach((act: Activity) => {
  //     if(act.gear_id === bikeId) {
  //       dist += act.distance;
  //     }
  //   });
  //   return dist;
  // };

  
console.log(savedBikes);


function onAppLoad() {
  getStravaToken()
    .then((strToken: string) => {        
      return checkStravaToken(strToken);
    })
    .then(() => getCurrentUserData())
    .catch((err) => snackbar.handleSnackbarError(err));
};
  

  useEffect(() => {
    checkAppToken();   
  }, []); 
  

  useEffect(() => {    
    onAppLoad();    
  }, [isLoggedIn]);
  
  
  console.log(currentUser);   
  
  
    return (      
      <CurrentUserContext.Provider value={currentUser}> 
      <ActivitiesLoadingState.Provider value={hasAllActivitiesLoaded}>            
        <Routes>
          <Route path='/' element={<AppLayout setUser={setCurrentUser} />}>
            
            <Route path='/registration' element={!isLoggedIn ? <RegPage /> : <Navigate to='/' replace={true} />} />
            <Route path='/login' element={!isLoggedIn ? <LoginPage /> : <Navigate to='/' replace={true} />} />        
            
            <Route path='/access' element={!isStravaConnected ? <StravaAccessPage /> : <Navigate to='/' replace={true} />} />
            <Route path='/access-result' element={<StravaAccessResult />} />
      
            <Route path='/' element={<ProtectedRoute />}>
              <Route index element={<Main />}  />                
              <Route path='/stats' 
                element={<Stats
                  yearsAtStrava={yearsAtStrava}
                  allActivities={allActivities} 
                />}
              />          
              <Route path='/garage' 
                element={<Garage             
                  userBikes={savedBikes} 
                  yearsAtStrava={yearsAtStrava} 
                  activities={allActivities}
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
