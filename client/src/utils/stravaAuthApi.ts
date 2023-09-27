import axios from 'axios';
import {BASE_URL} from 'utils/constants';



export function exchangeToken() {
  const params: any = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop:string) => searchParams.get(prop),
  });
  const accessToken: string = params.code;  // Get the value of "some_key" in eg "https://example.com/?some_key=some_value"
  

  return axios.post(`${BASE_URL}/strtokenexchange`, {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem('jwt')}`
    },
    body: JSON.stringify({token: accessToken}),
  })
  .then(res => res.data)
  .catch((err) => console.log(`${err.message}: Ошибка получения Strava токена`))
};



export function refreshToken() {
  return axios.get(`${BASE_URL}/strtokenrefresh`, {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem('jwt')}`
    }
  })  
  .then((res: any) => {
    const tokenData = res.data.token
    if (tokenData) {
      localStorage.setItem('stravaToken', tokenData.accessToken);
    }
  })
  .catch((err) => console.log(`${err.message}: Ошибка получения токена обновления`))
};


export const getStravaToken = () => {
  return axios.get(`${BASE_URL}/strtoken`, {    
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem('jwt')}`,
    },    
  })
  .then((res) => res.data)
  .catch((err) => console.log(`${err.message}: Ошибка получения Strava токена`));
};


export function stravaTokenCheck() {
  return axios.get(`${BASE_URL}/tokencheck`, {    
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem('jwt')}`
    },
  })
  .then((res) => res.data)
  .catch((err) => console.log(`${err.message}: Strava токен не найден`))
};


export function addStravaPermissions(scope: string[] | undefined) {
  return axios.post(`${BASE_URL}/strava-permissions`, {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem('jwt')}`
    },
    body: JSON.stringify({scope}),
  })
  .then(res => res.data)  
  .catch((err) => console.log(`${err.message}: 'Необходимо разрешить приложению доступ к аккаунту Strava`));
};


export function checkStravaPermissions() {  
  return axios.get(`${BASE_URL}/strava-permissions`, {    
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem('jwt')}`
    },
  })
  .then((res) => res.data)
  .catch((err) => console.log(err.message));
};
