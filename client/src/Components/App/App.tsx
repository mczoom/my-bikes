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
import StravaAccessResult from '../About/StravaAccessResult';



function App() {

  

  const accessToStrava: string | null = localStorage.getItem('accessToStrava');

  const [isStravaConnected, setIsStravaConnected] = useState(() => JSON.stringify(localStorage.getItem('isStravaConnected')));
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<Profile>({} as Profile);
  const [allActivities, setAllActivities] = useState<Activity[]>([]);
  const [hasAllActivitiesLoaded, setHasAllActivitiesLoaded] = useState<boolean>(false)
  const [userBikes, setUserBikes] = useState<Bike[]>([]);
  const [allRidesTotals, setAllRidesTotals] = useState<AthleteStats>({} as AthleteStats);
  const [allYTDRidesTotals, setAllYTDRidesTotals] = useState<AthleteStats>({} as AthleteStats);
  const [errMessage, setErrMessage] = useState<string[]>([]);
  
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const yearOfRegistrationAtStrava: number = new Date(currentUser.created_at).getFullYear();

  const isLogged = localStorage.getItem('logged');

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


  function checkIsAppConnectedToStrava() {
    checkStravaPermissions();
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
        setErrMessage([...errMessage, 'Неправильный токен приложения, необходимо авторизоваться']);
      });             
    }
  };


  async function checkStravaToken() {
    const token = localStorage.getItem('stravaToken');
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


  // function checkTrainer(bikeId: string): boolean | undefined {
  //   const bike = allActivities.find((activity) => {
  //     return activity.gear_id === bikeId;
  //   });
  //     return bike?.trainer;
  // };


  function checkIfTrainer(bikeId: string): boolean {
    const trainings = allActivities.filter((activity: Activity) => {
      return activity.gear_id === bikeId
    });

    const isTrainer = trainings.every((ride) => {
      return ride.trainer === true;
    })
        
    return isTrainer;
  };

  
  function addAllUserBikes() {
    if(currentUser.id && currentUser.bikes.length !== 0) {
      const userBikes: Bike[] = currentUser.bikes.map((bike) => {  
        const isTrainer = checkIfTrainer(bike.id)
        return {...bike, trainer: isTrainer};
      });
      appApi.addAllBikes(userBikes);    
    }
  }


  function updateBikeDistance() {
    if(currentUser.id) {
      const userBikes: Bike[] = currentUser.bikes;
      appApi.updateBikeOdo(userBikes);
    }
  }

  async function setStrTokenToLocalStorage() {
    await getStravaToken()
      .then((res) => {
        console.log(res);
        if(res.message) {
          throw new Error(res.message);
        }  
        localStorage.setItem('stravaToken', res.strToken)
      })
      .catch((err) => {
        setErrMessage([...errMessage, `Ошибка: ${err.message}`])
      });
      
  }

  

  
  function handleRegistration(login: string, password: string) {
    appApi.register(login, password)
      .then((res) => {       
        if(res.message) {
          throw new Error(res.message);
        } else {
          handleLogin(login, password);
          navigate('/access');
        }
      })
      .catch((err) => {
        setErrMessage([...errMessage, `Ошибка при регистрации: ${err.message}`])        
      })
  }


  function handleLogin(login: string, password: string) {
    appApi.login(login, password)
    .then((res) => {
      if (res.token) {     
        localStorage.setItem('jwt', res.token);
        setIsLoggedIn(true);
        localStorage.setItem('logged', 'true');
        //checkIsAppConnectedToStrava();
        setErrMessage([]);      
      } else if (res.message) {
        throw new Error(res.message);
      }
      return;
    })
    .catch((err) => {      
      setErrMessage([...errMessage, `Ошибка при входе: ${err.message}`])        
    })
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
    setHasAllActivitiesLoaded(false);
    await checkStravaToken();
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


  async function getCurrentUserInfo() {
    await checkStravaToken();    
    // await setStrTokenToLocalStorage();    
    getCurrentAthlete()
      .then((user) => {
        if(!user.id) {
         throw new Error(user.message)         
        }
        setCurrentUser(user); 
        return user;       
      })      
      .then((currentUser) => {      
        getAllActivities(currentUser); 
        setUserBikes(currentUser.bikes)       
      })
      .catch((err) => {
        setErrMessage([...errMessage, `Не удалось получить данные пользователя: ${err.message}`])
        console.log(`Не удалось получить данные пользователя: ${err.message}`);        
      });    
  };

  function handleErrorMessage(errMsg: string) {
    setErrMessage([...errMessage, errMsg])
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
  
  
console.log(userBikes);


  function logout() {
    localStorage.clear();
    setIsLoggedIn(false);
    setCurrentUser({} as Profile);
  };

  function handleErrors(errMsg: string) {
    setErrMessage([...errMessage, errMsg])
  }


  useEffect(() => {
    setErrMessage([]);
    checkAppToken();
    checkStravaToken();
    updateBikeDistance();    
  }, []);

  useEffect(() => {
    
    checkIsAppConnectedToStrava();
      
  }, [isStravaConnected]);

  
  useEffect(() => {
    const token = localStorage.getItem('stravaToken');
    if(token) {
      getCurrentUserInfo()
    }  
  }, []);
  console.log(currentUser);


  useEffect(() => {
    if(currentUser.id) {
      getUserRideStats(currentUser);
    }
  }, [currentUser]);


  useEffect(() => {
    if(hasAllActivitiesLoaded) {      
      addAllUserBikes();
    }
  }, [hasAllActivitiesLoaded]);  

  console.log(isLoggedIn);
  console.log(isStravaConnected);
  
 
  
  
    return (
      <CurrentUserContext.Provider value={currentUser}> 
      <ActivitiesLoadingState.Provider value={hasAllActivitiesLoaded}>            
        <Routes>
          <Route path='/' element={<AppLayout isLoggedIn={isLoggedIn} onLogout={logout} errMessage={errMessage}/>}>
            
            <Route path='/registration' element={!isLoggedIn ? <RegPage handleRegistration={handleRegistration} /> : <Navigate to='/' replace={true} />} />
            <Route path='/login' element={!isLoggedIn ? <LoginPage handleLogin={handleLogin} /> : <Navigate to='/' replace={true} />} />        
            
            <Route path='/access' element={<StravaAccessPage />} />
            
            {/* <Route element={<ProtectedRoute hasAccess={!isStravaConnected} />}>
              <Route path='/access' element={<StravaAccessPage />} />
            </Route>  */}

            <Route path='/access-result' element={<StravaAccessResult getCurrentUserInfo={getCurrentUserInfo} onError={handleErrors}/>} />
       
            <Route element={<ProtectedRoute hasAccess={isStravaConnected} />}>
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
