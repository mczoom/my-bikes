import { Token } from '../models/Token';
import { stravaApiUrl } from './constants';



const tokenData = ():Token => {
  const token = localStorage.getItem('token');
  let tokenData;
  if(token) {
  tokenData = JSON.parse(localStorage.getItem('token') || "");
  }
  return tokenData;
}

// const tokenData: Token = JSON.parse(localStorage.getItem('token') || "");


export const getAthlete = () => {
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

export const getActivities = (from = 1641498355, till = 1673034355, page = 1, perPage = 30) => {
  return fetch(`${stravaApiUrl}/athlete/activities?before=${till}&after=${from}&page=${page}&per_page=${perPage}`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${tokenData().access_token}`,
    }
  })
  .then((res) => res.json())
  .catch((err) => console.log(err))
};