import {BASE_URL} from './constants';
// import {clientId, clientSecret} from './secretConstants';
// import {stravaAuthUrl} from './constants';
import { ExchangeToken } from '../models/ExchangeToken';
import { RefreshToken } from '../models/RefreshToken';


interface stravaToken {
  strToken: string  
}

// export function exchangeToken() {
//   const params: any = new Proxy(new URLSearchParams(window.location.search), {
//     get: (searchParams, prop:string) => searchParams.get(prop),
//   }); // Get the value of "some_key" in eg "https://example.com/?some_key=some_value"
//   const accessToken: string = params.code;

//   return fetch(`${stravaAuthUrl}?client_id=${clientId}&client_secret=${clientSecret}&code=${accessToken}&grant_type=authorization_code`, {
//     method: 'POST',
//     headers: {
//       "Content-Type": "application/json"
//     },
//   })
//   .then((res) => res.json())
//   .then((res: ExchangeToken) => {
//     console.log(res);
//     if (res.access_token) {
//       localStorage.setItem('stravaToken', JSON.stringify(res));
//       localStorage.setItem('accessToStrava', 'true');
//     }
//   })
//   .catch(() => console.log('Ошибка авторизации'))
// };



// export function renewToken(refreshToken: string | undefined) {
//   return fetch(`${stravaAuthUrl}?client_id=${clientId}&client_secret=${clientSecret}&refresh_token=${refreshToken}&grant_type=refresh_token`, {
//     method: 'POST',
//     headers: {
//       "Content-Type": "application/json"
//     }
//   })
//   .then((res) => res.json())
//   .then((res: RefreshToken) => {
//     console.log(res);
//     if (res.access_token) {
//       localStorage.setItem('stravaToken', JSON.stringify(res));
//     }
//   })
//   .catch(() => console.log('Ошибка обновления токена'))
// };


const handleResponse = (res:any) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}





export function exchangeToken() {
  const params: any = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop:string) => searchParams.get(prop),
  });
  const accessToken: string = params.code;  // Get the value of "some_key" in eg "https://example.com/?some_key=some_value"

  return fetch(`${BASE_URL}/strtokenexchange`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem('jwt')}`
    },
    body: JSON.stringify({token: accessToken}),
  })
  .then(res => res.json())
  .then((token: stravaToken) => {    
    localStorage.setItem('stravaToken', token.strToken);
  })
  .catch((err) => console.log(`${err} 'Ошибка получения Strava токена'`))
};



export function refreshToken() {
  return fetch(`${BASE_URL}/strtokenrefresh`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem('jwt')}`
    }
  })
  .then((res) => res.json())
  .then((token: any) => {
    console.log(token);
    if (token) {
      localStorage.setItem('stravaToken', token.accessToken);
    }
  })
  .catch(() => console.log('Ошибка получения токена обновления'))
};


export const getStravaToken = () => {
  return fetch(`${BASE_URL}/strtoken`, {    
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem('jwt')}`,
    },    
  })
  .then((res) => res.json())
  .catch(err => console.log(err));
};


export function stravaTokenCheck() {
  return fetch(`${BASE_URL}/tokencheck`, {    
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem('jwt')}`
    },
  })
  .then((res) => res.json())
  .catch(() => console.log('Ошибка'))
};
