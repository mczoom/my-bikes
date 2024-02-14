import axios from 'axios';
import { BASE_URL } from 'utils/constants';
import { getLocalStorageParsedValue, setLocalStorage } from './service';

const handleErrorResponse = (error: any) => {
  console.log(error);
  return Promise.reject({
    axiosCode: error.code,
    message: error.response.data.message,
    status: error.response.data.status
  });
};

export function exchangeToken() {
  const params: any = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop: string) => searchParams.get(prop)
  });
  const accessToken: string = params.code; // Get the value of "some_key" in eg "https://example.com/?some_key=some_value"

  return axios
    .post(
      `${BASE_URL}/strtokenexchange`,
      { token: accessToken },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getLocalStorageParsedValue('jwt')}`
        }
      }
    )
    .then((res) => res.data)
    .catch((err) => handleErrorResponse(err));
}

export function refreshToken() {
  return axios
    .get(`${BASE_URL}/strtokenrefresh`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getLocalStorageParsedValue('jwt')}`
      }
    })
    .then((res: any) => {
      const tokenData = res.data.token;
      if (tokenData) {
        setLocalStorage('stravaToken', tokenData.accessToken);
      }
    })
    .catch((err) => handleErrorResponse(err));
}

export const getStravaToken = (t: string) => {
  return axios
    .get(`${BASE_URL}/strtoken`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${t}`
      }
    })
    .then((res) => res.data)
    .catch((err) => handleErrorResponse(err));
};

export function stravaTokenCheck() {
  return axios
    .get(`${BASE_URL}/tokencheck`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getLocalStorageParsedValue('jwt')}`
      }
    })
    .then((res) => res.data)
    .catch((err) => handleErrorResponse(err));
}

export function addStravaPermissions(scope: string[] | undefined) {
  return axios
    .post(
      `${BASE_URL}/strava-permissions`,
      { scope },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${getLocalStorageParsedValue('jwt')}`
        }
      }
    )
    .then((res) => res.data)
    .catch((err) => handleErrorResponse(err));
}

export function checkStravaPermissions() {
  return axios
    .get(`${BASE_URL}/strava-permissions`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${getLocalStorageParsedValue('jwt')}`
      }
    })
    .then((res) => res.data)
    .catch((err) => handleErrorResponse(err));
}
