import {clientId, clientSecret} from './secretConstants';
import {stravaAuthUrl} from './constants';
import { ExchangeToken } from '../models/ExchangeToken';
import { RefreshToken } from '../models/RefreshToken';

export function exchangeToken() {
  const params: any = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop:string) => searchParams.get(prop),
  }); // Get the value of "some_key" in eg "https://example.com/?some_key=some_value"
  const accessToken: string = params.code;

  return fetch(`${stravaAuthUrl}?client_id=${clientId}&client_secret=${clientSecret}&code=${accessToken}&grant_type=authorization_code`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    }
  })
  .then((res) => res.json())
  .then((res: ExchangeToken) => {
    console.log(res);
    if (res.access_token) {
      localStorage.setItem('token', JSON.stringify(res));
      localStorage.setItem('accessToStrava', 'true');
    }
  })
  .catch(() => console.log('Ошибка авторизации'))
};



export function renewToken(refreshToken: string | undefined) {
  return fetch(`${stravaAuthUrl}?client_id=${clientId}&client_secret=${clientSecret}&refresh_token=${refreshToken}&grant_type=refresh_token`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    }
  })
  .then((res) => res.json())
  .then((res: RefreshToken) => {
    console.log(res);
    if (res.access_token) {
      localStorage.setItem('token', JSON.stringify(res));
    }
  })
  .catch(() => console.log('Ошибка обновления токена'))
};
