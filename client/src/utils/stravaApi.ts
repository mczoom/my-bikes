import axios from 'axios';
import { stravaApiUrl } from 'utils/constants';
import { getLocalStorageValue } from './service';

const stravaToken = () => getLocalStorageValue('stravaToken');

export interface ActivitiesRequest {
  fromDate: number
  tillDate: number
  page?: number
  perPage?: number
};


const handleStravaErrResponse = (err: any) => {
  console.log(err);
  return Promise.reject({axiosCode: err.code, message: err.response.data.message, status: err.message})
};


export const getCurrentAthlete = () => {
  return axios.get(`${stravaApiUrl}/athlete`, {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${stravaToken()}`,
    }
  })
  .then((res) => res.data)
  .catch((err) => handleStravaErrResponse(err))
};



export const getAthlete = (id: number) => {
  return axios.get(`${stravaApiUrl}/athletes/${id}/stats`, {    
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${stravaToken()}`,
    }
  })
  .then((res) => res.data)
  .catch((err) => handleStravaErrResponse(err))
};



export const getActivities = ({fromDate, tillDate, page = 1, perPage = 200}: ActivitiesRequest) => {
  return axios.get(`${stravaApiUrl}/athlete/activities?before=${tillDate}&after=${fromDate}&page=${page}&per_page=${perPage}`, {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${stravaToken()}`,
    }
  })  
  .then((res) => res.data)
  .catch((err) => handleStravaErrResponse(err))
};