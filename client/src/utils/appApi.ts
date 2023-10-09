import axios from 'axios';
import { Bike } from 'types/Bike';
import {BASE_URL} from 'utils/constants';



// function handleResponse(res:any) {
//   if (res.ok) {
//     return res.data;
//   }  
//   return Promise.reject(`Ошибка ${res.status}`);

// }

const handleErrorResponse = (error: any) => {
  console.log(error)
  return Promise.reject({axiosCode: error.code, message: error.response.data.message, status: error.response.data.status})
}


// export const register = (login: string, password: string) => {
//   return fetch(`${BASE_URL}/signup`, {
//     method: 'POST',
//     headers: {
//       "Content-Type": "application/json"
//     },
//     body: JSON.stringify({login, password})
//   })
//   .then((res) => res.json())
//   .then((res) => console.log(res))
//   .catch(err => console.log(err))
  
    
// };


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
          "Authorization": `Bearer ${localStorage.getItem('jwt')}`,
        }
      })
      .then((res) => res.data)    
      .catch((err) => handleErrorResponse(err))
  };


  export const addAllBikes = (bikes: Bike[]) => {
    return axios.post(`${BASE_URL}/bikes`, 
      { bikes },
      { headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem('jwt')}`,
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
          "Authorization": `Bearer ${localStorage.getItem('jwt')}`,
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
          "Authorization": `Bearer ${localStorage.getItem('jwt')}`,
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
          "Authorization": `Bearer ${localStorage.getItem('jwt')}`,
        },
      })
      .then((res) => res.data)    
      .catch((err) => handleErrorResponse(err))
  };


  export const getAllBikes = () => {
    return axios.get(`${BASE_URL}/bikes`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem('jwt')}`,
      }
    })
    .then((res) => res.data)    
    .catch((err) => handleErrorResponse(err))
  };