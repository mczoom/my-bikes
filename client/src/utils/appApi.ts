import axios from 'axios';
import { Activity } from 'types/Activity';
import { Bike } from 'types/Bike';
import {BASE_URL} from 'utils/constants';
import { getLocalStorageParsedValue } from './service';


const token = () => getLocalStorageParsedValue('jwt')

const handleErrorResponse = (error: any) => {
  console.log(error)
  return Promise.reject({axiosCode: error.code, message: error.response.data?.message, status: error.response.data?.status})
}



export const register = (login: string, password: string) => {
  return axios.post(`${BASE_URL}/signup`, 
    { login, password },
    { headers: {
        "Content-Type": "application/json"
      },      
    })
    .then((res) => res.data)    
    .catch((err) => handleErrorResponse(err))     
};



export const login = (login: string, password: string) => {
  return axios.post(`${BASE_URL}/signin`,
    { login, password },
    { headers: {
        "Content-Type": "application/json"
      },      
    })
    .then((res) => res.data)    
    .catch((err) => handleErrorResponse(err))
};


export const getCurrentUser = () => {
  return axios.get(`${BASE_URL}/user`, 
    { headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token()}`,
      }
    })
    .then((res) => res.data)    
    .catch((err) => handleErrorResponse(err))
};


export const addAllActivities = (activities: Activity[]) => {
  return axios.post(`${BASE_URL}/activities`, 
    { activities },
    { headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token()}`,
      },      
    })
  .then((res) => res.data)    
  .catch((err) => handleErrorResponse(err))
};


export const getAllActivities = () => {
  return axios.get(`${BASE_URL}/activities`, {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token()}`,
    }
  })
  .then((res) => res.data)    
  .catch((err) => handleErrorResponse(err))
};


export const updateAllActivities = (activities: Activity[]) => {
  return axios.patch(`${BASE_URL}/updateactivities`, 
    { activities },
    { headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token()}`,
      },
    })
    .then((res) => res.data)    
    .catch((err) => handleErrorResponse(err))
};


export const addAllBikes = (bikes: Bike[] | undefined) => {
  return axios.post(`${BASE_URL}/bikes`, 
    { bikes },
    { headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token()}`,
      },      
    })
  .then((res) => res.data)    
  .catch((err) => handleErrorResponse(err))
};


export const addBike = (newBike: Bike | Bike[]) => {
  return axios.post(`${BASE_URL}/addbike`, 
    { bike: newBike },
    { headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token()}`,
      },
    })
    .then((res) => res.data)    
    .catch((err) => handleErrorResponse(err))
};


// export const addBike = (bike: Bike | Bike[]) => {
//   return fetch(`${BASE_URL}/addbike`, {
//     method: 'POST',
        
//     headers: {
//       "Content-Type": "application/json",
//       "Authorization": `Bearer ${localStorage.getItem('jwt')}`,
//     },
//     body: JSON.stringify({bike}),
//   })
//   .then((res) => res.json())    
//   .catch((err) => handleErrorResponse(err))
// };


export const updateBikeInfo = (bikeId: any, updatedInfo: any) => {
  return axios.patch(`${BASE_URL}/bikeinfo`, 
    { bikeId, updatedInfo },
    { headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token()}`,
      },
    })
    .then((res) => res.data)    
    .catch((err) => handleErrorResponse(err))
};


export const updateBikeOdo = (bikes: Bike[]) => {
  return axios.patch(`${BASE_URL}/bikeodo`, 
    { bikes },
    { headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token()}`,
      },
    })
    .then((res) => res.data)    
    .catch((err) => handleErrorResponse(err))
};


export const addTrainer = (bikeId: string, updatedInfo: any) => {
  return axios.patch(`${BASE_URL}/trainer`, 
    { bikeId, updatedInfo },
    { headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token()}`,
      },
    })
    .then((res) => res.data)    
    .catch((err) => handleErrorResponse(err))
};


export const getAllBikes = () => {
  return axios.get(`${BASE_URL}/bikes`, {
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token()}`,
    }
  })
  .then((res) => res.data)    
  .catch((err) => handleErrorResponse(err))
};