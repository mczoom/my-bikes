import { Token } from '../models/Token';
import { stravaApiUrl } from './constants';

const tokenData: Token = JSON.parse(localStorage.getItem('token') || "");
console.log(tokenData);

export const getAthlete = () => {
  return fetch(`${stravaApiUrl}/athlete`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${tokenData.access_token}`,
    }
  })
  .then((res) => res.json())
  .catch((err) => console.log(err))
};

export const getActivities = (from = '', till = '', perPage = '') => {
  return fetch(`${stravaApiUrl}/athlete/activities?before=${till}&after=${from}&page=&per_page=${perPage}`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${tokenData.access_token}`,
    }
  })
  .then((res) => res.json())
  .catch((err) => console.log(err))
};