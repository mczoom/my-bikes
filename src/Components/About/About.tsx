import React, {useEffect} from 'react'
import { exchangeToken, renewToken } from '../../utils/stravaAuthApi';
import { Token } from '../../models/Token';

export default function About() {

  const tokenData = (): Token => {

    let token = {};
    if(localStorage.getItem('token')) {
      token = JSON.parse(localStorage.getItem('token') || "");
    }
    return token;
  }

  const dateNow: number = Date.now() / 1000;
  // const tokenData: Token = JSON.parse(localStorage.getItem('token') || "");
  console.log(localStorage.getItem('token'));
  const expDate: any = tokenData().expires_at;
  const isTokenExpired: number = (expDate - dateNow);
  const refreshToken: string | undefined = tokenData().refresh_token;


  useEffect(() => {

    if(!localStorage.getItem('token')) {
      exchangeToken();
    } else if (isTokenExpired <= 0) {
      renewToken(refreshToken);
    }

  }, [])

  return (
    <div>About</div>
  )
}
