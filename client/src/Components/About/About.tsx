import React, { useEffect } from 'react'
import { exchangeToken, getStravaToken } from '../../utils/stravaAuthApi'



export default function About() {

  interface stravaToken {
    strToken: string  
  }

  function setStrTokenToLocalStorage() {
    exchangeToken()
      .then((token: stravaToken) => {          
        localStorage.setItem('stravaToken', token.strToken);
      })
      .catch((err) => console.log(err));      
  };

  

  useEffect(() => {
    setStrTokenToLocalStorage();        
  }, []);
  
  

  return (
    <div>About</div>
  )
}
