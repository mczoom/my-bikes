import axios from 'axios';
import { Activity } from 'types/Activity';
import { stravaApiUrl } from 'utils/constants';



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
  .catch((err) => console.log(`${err.message}: Не удалось получить данные пользователя`))
};



export const getAthlete = (id: number) => {
  const stravaToken = localStorage.getItem('stravaToken')

  return axios.get(`${stravaApiUrl}/athletes/${id}/stats`, {    
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${stravaToken}`,
    }
  })
  .then((res) => res.data)
  .catch((err) => console.log(`${err.message}: Не удалось получить данные пользователя`))
};



export const getActivities = ({fromDate, tillDate, page = 1, perPage = 200}: ActivitiesRequest) => {
  const stravaToken = localStorage.getItem('stravaToken');

  return axios.get(`${stravaApiUrl}/athlete/activities?before=${tillDate}&after=${fromDate}&page=${page}&per_page=${perPage}`, {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${stravaToken}`,
    }
  })  
  .then((res) => res.data)
  .catch((err) => console.log(`${err.message} Ошибка получения списка тренировок`))
};