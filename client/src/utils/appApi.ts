import { Bike } from '../models/Bike';
import {BASE_URL} from './constants';



const handleResponse = (res:any) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}


export const register = (login: string, password: string) => {
    return fetch(`${BASE_URL}/signup`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({login, password})
    })
    .then((res) => handleResponse(res));
  };


  export const login = (login: string, password: string) => {
    return fetch(`${BASE_URL}/signin`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({login, password})
    })
    .then((res) => handleResponse(res));
  };


  export const getStrTokenExpTime = (id: number) => {
    return fetch(`${BASE_URL}/strtoken`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem('jwt')}`,
      },
      body: JSON.stringify({id})
    })
    .then((res) => handleResponse(res));
  }


  export const addAllBikes = (converted_distance: any, id: any, name: any, retired: any) => {
    return fetch(`${BASE_URL}/bikes`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem('jwt')}`,
      },
      body: JSON.stringify({converted_distance, id, name, retired})
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