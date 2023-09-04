import axios from 'axios';
import { stravaApiUrl } from './constants';



export interface ActivitiesRequest {
  fromDate: number
  tillDate: number
  page?: number
  perPage?: number
}


export const getCurrentAthlete = () => {
  const stravaToken = localStorage.getItem('stravaToken')

  return axios.get(`${stravaApiUrl}/athlete`, {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${stravaToken}`,
    }
  })
  .then((res) => res.data)
  .catch(() => console.log('Не удалось получить данные пользователя'))
};


// export const getCurrentAthlete = () => {
//   const stravaToken = localStorage.getItem('stravaToken')

//   return fetch(`${stravaApiUrl}/athlete`, {
//     method: 'GET',
//     headers: {
//       "Content-Type": "application/json",
//       "Authorization": `Bearer ${stravaToken}`,
//     }
//   })
//   .then((res) => res.json())
//   .catch(() => console.log('Не удалось получить данные пользователя'))
// };


export const getAthlete = (id: number) => {
  const stravaToken = localStorage.getItem('stravaToken')

  return axios.get(`${stravaApiUrl}/athletes/${id}/stats`, {    
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${stravaToken}`,
    }
  })
  .then((res) => res.data)
  .catch((err) => console.log(err.message))
};


// export const getAthlete = (id: number) => {
//   const stravaToken = localStorage.getItem('stravaToken')

//   return fetch(`${stravaApiUrl}/athletes/${id}/stats`, {
//     method: 'GET',
//     headers: {
//       "Content-Type": "application/json",
//       "Authorization": `Bearer ${stravaToken}`,
//     }
//   })
//   .then((res) => res.json())
//   .catch((err) => console.log(err.message))
// };


export const getActivities = ({fromDate, tillDate, page = 1, perPage = 200}: ActivitiesRequest) => {
  const stravaToken = localStorage.getItem('stravaToken');

  return axios.get(`${stravaApiUrl}/athlete/activities?before=${tillDate}&after=${fromDate}&page=${page}&per_page=${perPage}`, {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${stravaToken}`,
    }
  })  
  .then((res) => {
    if(res.data.errors) {
      throw new Error('Что-то пошло не так...')
    }
    return res.data;
  })
  .catch((err) => console.log(`${err} Ошибка получения списка тренировок`))
};


// export const getActivities = ({fromDate, tillDate, page = 1, perPage = 200}: ActivitiesRequest) => {
//   const stravaToken = localStorage.getItem('stravaToken')
//   return fetch(`${stravaApiUrl}/athlete/activities?before=${tillDate}&after=${fromDate}&page=${page}&per_page=${perPage}`, {
//     method: 'GET',
//     headers: {
//       "Content-Type": "application/json",
//       "Authorization": `Bearer ${stravaToken}`,
//     }
//   })
//   .then((res) => res.json())
//   .then((res) => {
//     if(res.errors) {
//       throw new Error('Что-то пошло не так...')
//     }
//     return res;
//   })
//   .catch((err) => console.log(`${err} Ошибка получения списка тренировок`))
// };