import { stravaApiUrl } from './constants';



export interface ActivitiesRequest {
  fromDate: number
  tillDate: number
  page?: number
  perPage?: number
}


export const getCurrentAthlete = async () => {
  const stravaToken = localStorage.getItem('stravaToken')

  return fetch(`${stravaApiUrl}/athlete`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${stravaToken}`,
    }
  })
  .then((res) => res.json())
  .catch((err) => console.log('не удалось получить данные атлета'))
};


export const getAthlete = (id: number) => {
  const stravaToken = localStorage.getItem('stravaToken')

  return fetch(`${stravaApiUrl}/athletes/${id}/stats`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${stravaToken}`,
    }
  })
  .then((res) => res.json())
  .catch((err) => console.log(err.message))
};


export const getActivities = ({fromDate, tillDate, page = 1, perPage = 200}: ActivitiesRequest) => {
  const stravaToken = localStorage.getItem('stravaToken')
  return fetch(`${stravaApiUrl}/athlete/activities?before=${tillDate}&after=${fromDate}&page=${page}&per_page=${perPage}`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${stravaToken}`,
    }
  })
  .then((res) => res.json())
  .then((res) => {
    if(res.errors) {
      throw new Error('Что-то пошло не так...')
    }
    return res;
  })
  .catch((err) => console.log(`${err} Ошибка получения списка тренировок`))
};