import { Bike } from '../models/Bike';
import {BASE_URL} from './constants';



const handleResponse = (res:any) => {
  if (res.ok) {
    return res.json();
  }  
  return Promise.reject(`Ошибка ${res.status}`);

}


  export const register = (login: string, password: string) => {
    return fetch(`${BASE_URL}/signup`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({login, password})
    })
    .then((res) => res.json())
    .catch(err => console.log(err))
  };


  export const login = (login: string, password: string) => {
    return fetch(`${BASE_URL}/signin`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({login, password})
    })
    .then((res) => res.json())
    .catch(err => console.log(err))
  };


  export const getCurrentUser = () => {
    return fetch(`${BASE_URL}/user`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem('jwt')}`,
      }
    })
    .then((res) => handleResponse(res));
  };


  


  export const addAllBikes = (bikes: any) => {
    return fetch(`${BASE_URL}/bikes`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem('jwt')}`,
      },
      body: JSON.stringify({bikes})
    })
    .then((res) => handleResponse(res));
  };


  export const addBike = (bike: Bike | Bike[]) => {
    return fetch(`${BASE_URL}/addbike`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem('jwt')}`,
      },
      body: JSON.stringify({bike})
    })
    .then((res) => handleResponse(res));
  };


  export const updateBikeInfo = (bikeId: any, updatedInfo: any) => {
    return fetch(`${BASE_URL}/bikeinfo`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem('jwt')}`,
      },
      body: JSON.stringify({bikeId, updatedInfo})
    })
    .then((res) => handleResponse(res));
  };


  export const updateBikeOdo = (bikes: any) => {
    return fetch(`${BASE_URL}/bikeodo`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem('jwt')}`,
      },
      body: JSON.stringify({bikes})
    })
    .then((res) => handleResponse(res));
  };


  export const getAllBikes = () => {
    return fetch(`${BASE_URL}/bikes`, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem('jwt')}`,
      }
    })
    .then((res) => handleResponse(res));
  };