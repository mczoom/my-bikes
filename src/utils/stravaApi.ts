import { Token } from '../models/Token';

const tokenData: Token = JSON.parse(localStorage.getItem('token') || "");

export const getAthlete = () => {
  return fetch(`https://www.strava.com/api/v3/athlete`, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${tokenData.access_token}`,
    }
  })
  .then((res) => res.json())
  .then((res) => console.log(res.bikes))
  .catch((err) => console.log(err))
};