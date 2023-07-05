import React, { useEffect } from 'react'
import { addStravaPermissions, exchangeToken } from '../../utils/stravaAuthApi'
import { useNavigate } from 'react-router-dom';

interface AboutProps {
  getCurrentUserInfo: () => void
}


interface stravaToken {
  strToken: string  
}


export default function StravaAccessResult ({getCurrentUserInfo}: AboutProps) {

  const navigate = useNavigate();
  const mandatoryStravaPermissions = ['read', 'activity:read_all', 'profile:read_all', 'read_all'];
  const stravaPermissions = getStravaPermissionsScope();

  function getStravaPermissionsScope(): string[] | undefined {
    const params: any = new Proxy(new URLSearchParams(window.location.search), {
      get: (searchParams, prop:string) => searchParams.get(prop),
    });
    const scope: string = params.scope;    
    const scopeArr = scope?.split(',');

    if(!scope || scopeArr.length !== mandatoryStravaPermissions.length) {      
      navigate('/access');
      return;
    } else {      
      return scopeArr;       
    };  
  };

  console.log(stravaPermissions);
  
    

  function setStrTokenToLocalStorageAfterRegistration() {    
    exchangeToken()
      .then((token: stravaToken) => {          
        localStorage.setItem('stravaToken', token.strToken);
        getCurrentUserInfo();
        navigate('/');
      })      
      .catch((err) => console.log(err));      
  };

  async function setStravaTokenAndPermissionsAfterRegistration() {
    if (stravaPermissions) {
      await addStravaPermissions(stravaPermissions);
      setStrTokenToLocalStorageAfterRegistration();
    } else {
      return;
    }
  };
  

  useEffect(() => {
    console.log(stravaPermissions);
    
    setStravaTokenAndPermissionsAfterRegistration();        
  }, []);
  
  

  return (
    <div>About</div>
  )
}
