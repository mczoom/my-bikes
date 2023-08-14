import React, { useEffect } from 'react'
import { addStravaPermissions, exchangeToken } from '../../utils/stravaAuthApi'
import { useNavigate } from 'react-router-dom';
import { mandatoryStravaPermissions } from '../../utils/constants';
import useAuth from '../../hooks/useAuth';
import { getCurrentAthlete } from '../../utils/stravaApi';

interface StravaAccessResultProps {
  getCurrentUserData: () => void
  addAllBikes: (user: any) => void
  onError: (errMsg: string) => void
}


interface stravaToken {
  strToken: string  
}


export default function StravaAccessResult ({getCurrentUserData, addAllBikes, onError}: StravaAccessResultProps) {

  const navigate = useNavigate();
  const auth = useAuth();
  
  const stravaPermissions = getStravaPermissionsScope();

  function getStravaPermissionsScope(): string[] | undefined {
    const params: any = new Proxy(new URLSearchParams(window.location.search), {
      get: (searchParams, prop:string) => searchParams.get(prop),
    });
    const scope: string = params.scope;    
    const scopeArr = scope?.split(',');

    if(!scope || scopeArr.length !== mandatoryStravaPermissions.length) {       
      return;
    } else {      
      return scopeArr;       
    };  
  };  
  

  async function setStrTokenToLocalStorageAfterRegistration() {    
    exchangeToken()
      .then((token: stravaToken) => {          
        localStorage.setItem('stravaToken', token.strToken);
      })      
      .catch((err) => console.log(err));      
  };


  function setStravaTokenAndPermissionsAfterRegistration(permissions: string[] | undefined) {    
    addStravaPermissions(permissions)
      .then(async () => {
        await setStrTokenToLocalStorageAfterRegistration();
        auth.checkPermissions();
        navigate('/');
      })
      .catch((err) => {
        onError(err)
        console.log(err);
        navigate('/access');
      });    
  }

  
  // function manageStravaTokenAndPermissionsAfterRegistration(permits: string[] | undefined) {
  //   if (permits) {
  //     setStravaTokenAndPermissionsAfterRegistration(permits);      
  //   } else {
  //     navigate('/access');
  //     console.log('Необходимо разрешить приложению доступ к аккаунту Strava');   
  //     onError('Необходимо разрешить приложению доступ к аккаунту Strava');     
  //   }
  // };

  // async function setDataAfterRegistration() {
  //   await addStravaPermissions(stravaPermissions)
  //     .then(() => {
  //       manageStravaTokenAndPermissionsAfterRegistration(stravaPermissions);        
  //     })
  //     .catch((err) => {
  //       onError(err)
  //       console.log(err);
  //       navigate('/access');
  //     });    
    
  //   //navigate('/');
    
  // }
  

  useEffect(() => {    
    setStravaTokenAndPermissionsAfterRegistration(stravaPermissions);
  }, []);
  
  

  return (
    <div>About</div>
  )
}


