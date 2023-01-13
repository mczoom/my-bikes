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


export const getActivities = (from: number, till: number, page = 1, perPage = 200) => {
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