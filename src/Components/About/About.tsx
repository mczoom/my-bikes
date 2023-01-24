import React, {useEffect} from 'react'
import { exchangeToken, renewToken } from '../../utils/stravaAuthApi';
import { ExchangeToken } from '../../models/ExchangeToken';

export default function About() {

  const tokenData = (): ExchangeToken => {

    let token: ExchangeToken = {} as ExchangeToken;
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


  return (
    <div>About</div>
  )
}
