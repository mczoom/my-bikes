import React, { useEffect } from 'react'
import { exchangeToken } from '../../utils/stravaAuthApi'
import { useNavigate } from 'react-router-dom';

interface AboutProps {
  getCurrentUserInfo: () => void
}


interface stravaToken {
  strToken: string  
}


export default function About({getCurrentUserInfo}: AboutProps) {

  

  const navigate = useNavigate();

  function setStrTokenToLocalStorageAfterRegistration() {
    exchangeToken()
      .then((token: stravaToken) => {          
        localStorage.setItem('stravaToken', token.strToken);
        getCurrentUserInfo();
        navigate('/')     
      })      
      .catch((err) => console.log(err));      
  };

  

  useEffect(() => {
    setStrTokenToLocalStorageAfterRegistration();        
  }, []);
  
  

  return (
    <div>About</div>
  )
}
