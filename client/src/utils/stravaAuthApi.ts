import {BASE_URL} from './constants';


interface stravaToken {
  strToken: string  
}


const handleResponse = (res:any, errMsg:string) => {
  if (res.ok) {
    return res.json();
  };  
  return Promise.reject(errMsg);
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
  // .then((token: stravaToken) => {    
  //   localStorage.setItem('stravaToken', token.strToken);
  // })
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
  .then((res) => {
    if(res.message) {
      throw new Error(res.message);
    }  
    localStorage.setItem('stravaToken', res.strToken);
    return res.strToken;
  })
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


export function addStravaPermissions(scope: string[] | undefined) {
  return fetch(`${BASE_URL}/strava-permissions`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem('jwt')}`
    },
    body: JSON.stringify({scope}),
  })
  .then(res => handleResponse(res, 'Необходимо разрешить приложению доступ к аккаунту Strava'))  
  .catch((err) => console.log(err));
};


export function checkStravaPermissions() {
  return fetch(`${BASE_URL}/strava-permissions`, {    
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem('jwt')}`
    },
  })
  .then(res => res.json())
  .then((res) => {
    if(res === true) {
    localStorage.setItem('isStravaConnected', res);
    return res;
    } else {
      return;
    }
  })
  .catch((err) => console.log(err));
};
