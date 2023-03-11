import React, { useEffect } from 'react'
import { exchangeToken } from '../../utils/stravaAuthApi'


export default function About() {

  useEffect(() => {
    const sToken = localStorage.getItem('stravaToken');
    if(!sToken) {
      exchangeToken();
    }
  }, []);
  
  

  return (
    <div>About</div>
  )
}
