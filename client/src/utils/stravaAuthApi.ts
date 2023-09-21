import axios from 'axios';
import {BASE_URL} from 'utils/constants';


// const handleResponse = (res:any, errMsg:string) => {
//   if (res.ok) {
//     return res.json();
//   };  
//   return Promise.reject(errMsg);
// }



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
  .catch((err) => console.log(`${err} 'Ошибка получения Strava токена'`))
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
  .catch(() => console.log('Ошибка получения токена обновления'))
};


export const getStravaToken = () => {
  return axios.get(`${BASE_URL}/strtoken`, {    
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem('jwt')}`,
    },    
  })
  .then((res) => res.data)
  .catch(err => console.log(err));
};


export function stravaTokenCheck() {
  return axios.get(`${BASE_URL}/tokencheck`, {    
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem('jwt')}`
    },
  })
  .then((res) => res.data)
  .catch(() => console.log('Ошибка проверки Страва-токена'))
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
  .catch(() => console.log('Необходимо разрешить приложению доступ к аккаунту Strava'));
};


export function checkStravaPermissions() {  
  return axios.get(`${BASE_URL}/strava-permissions`, {    
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem('jwt')}`
    },
  })
  .then((res) => {
    if(res.status >= 300) {
      throw new Error(res.statusText);
    };      
    
    return res.data;   
  })
  .catch((err) => console.log(err.message));
};


// export function refreshToken() {
//   return fetch(`${BASE_URL}/strtokenrefresh`, {
//     method: 'GET',
//     headers: {
//       "Content-Type": "application/json",
//       "Authorization": `Bearer ${localStorage.getItem('jwt')}`
//     }
//   })
//   .then((res) => res.json())
//   .then((token: any) => {
//     console.log(token);
//     if (token) {
//       localStorage.setItem('stravaToken', token.accessToken);
//     }
//   })
//   .catch(() => console.log('Ошибка получения токена обновления'))
// };


// export const getStravaToken = () => {
//   return fetch(`${BASE_URL}/strtoken`, {    
//     headers: {
//       "Content-Type": "application/json",
//       "Authorization": `Bearer ${localStorage.getItem('jwt')}`,
//     },    
//   })
//   .then((res) => res.json())
//   .catch(err => console.log(err));
// };


// export function stravaTokenCheck() {
//   return fetch(`${BASE_URL}/tokencheck`, {    
//     headers: {
//       "Content-Type": "application/json",
//       "Authorization": `Bearer ${localStorage.getItem('jwt')}`
//     },
//   })
//   .then((res) => res.json())
//   .catch(() => console.log('Ошибка'))
// };


// export function addStravaPermissions(scope: string[] | undefined) {
//   return fetch(`${BASE_URL}/strava-permissions`, {
//     method: 'POST',
//     headers: {
//       "Content-Type": "application/json",
//       "Authorization": `Bearer ${localStorage.getItem('jwt')}`
//     },
//     body: JSON.stringify({scope}),
//   })
//   .then(res => handleResponse(res, 'Необходимо разрешить приложению доступ к аккаунту Strava'))  
//   .catch((err) => console.log(err));
// };


// export function checkStravaPermissions() {  
//   return fetch(`${BASE_URL}/strava-permissions`, {    
//     headers: {
//       "Content-Type": "application/json",
//       "Authorization": `Bearer ${localStorage.getItem('jwt')}`
//     },
//   })
//   .then(res => res.json())
//   .then((res) => {
//     if(res && !res.message) {
//     return res;
//     } else {
//       throw new Error(res.message);
//     }
//   })
//   .catch((err) => console.log(err.message));
// };
