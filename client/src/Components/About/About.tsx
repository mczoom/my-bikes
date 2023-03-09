import React, { useEffect } from 'react'
import { exchangeToken } from '../../utils/stravaAuthApi'


export default function About() {

  useEffect(() => {
    exchangeToken();
  }, []);
  

  return (
    <div>About</div>
  )
}
