import { ExchangeToken } from '../models/ExchangeToken';
import { stravaApiUrl, tokenData } from './constants';


export interface ActivitiesRequest {
  fromDate: number
  tillDate: number
  page?: number
  perPage?: number
}


export const getCurrentAthlete = () => {
  return fetch(`${stravaApiUrl}/athlete`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${tokenData().access_token}`,
    }
  })
  .then((res) => res.json())
  .catch((err) => console.log(err))
};


export const getAthlete = (id: number) => {
  return fetch(`${stravaApiUrl}/athletes/${id}/stats`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${tokenData().access_token}`,
    }
  })
  .then((res) => res.json())
  .catch((err) => console.log(err))
};


export const getActivities = ({fromDate, tillDate, page = 1, perPage = 200}: ActivitiesRequest) => {
  return fetch(`${stravaApiUrl}/athlete/activities?before=${tillDate}&after=${fromDate}&page=${page}&per_page=${perPage}`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${tokenData().access_token}`,
    }
  })
  .then((res) => res.json())
  .catch((err) => console.log(err))
};