import { stravaApiUrl } from './constants';
//import { getStravaToken } from './stravaAuthApi';


const stravaToken = localStorage.getItem('stravaToken')

// let actualStravaToken: string | undefined;

// async function getActualStrToken() {
  
//   await getStravaToken()
//     .then((res) => {
//       console.log(res);
//       if(res.message) {
//         throw new Error(res.message);
//       }  
//       localStorage.setItem('stravaToken', res.strToken)
//       actualStravaToken = res.strToken;
      
//     })
//     .catch((err: string) => console.log(err));
    
// }



export interface ActivitiesRequest {
  fromDate: number
  tillDate: number
  page?: number
  perPage?: number
}


export const getCurrentAthlete = async () => {
  const strToken = localStorage.getItem('stravaToken')

  return fetch(`${stravaApiUrl}/athlete`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${strToken}`,
    }
  })
  .then((res) => res.json())
  .catch((err) => console.log('не удалось получить данные атлета'))
};


export const getAthlete = (id: number) => {
  const strToken = localStorage.getItem('stravaToken')

  return fetch(`${stravaApiUrl}/athletes/${id}/stats`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${strToken}`,
    }
  })
  .then((res) => res.json())
  .catch((err) => console.log(err.message))
};


export const getActivities = ({fromDate, tillDate, page = 1, perPage = 200}: ActivitiesRequest) => {
  const strToken = localStorage.getItem('stravaToken')
  return fetch(`${stravaApiUrl}/athlete/activities?before=${tillDate}&after=${fromDate}&page=${page}&per_page=${perPage}`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${strToken}`,
    }
  })
  .then((res) => res.json())
  .catch((err) => console.log(err))
};