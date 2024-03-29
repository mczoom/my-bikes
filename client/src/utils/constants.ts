import { customAlphabet } from 'nanoid';
import { Activity } from 'types/Activity';

export const BASE_URL = 'http://localhost:3001';

export const clientId = 98790;
export const stravaAuthUrl = 'https://www.strava.com/oauth/token';
export const stravaApiUrl = 'https://www.strava.com/api/v3';

export const idAlphabet = '0123456789ABCDEFGHXYZabcdefghxyz';
export const idSize = 7;
export const partId = customAlphabet(idAlphabet, idSize);

export const mandatoryStravaPermissions = ['read', 'activity:read_all', 'profile:read_all', 'read_all'];

export const appStartYear = 2023;
export const currentYear: number = new Date().getFullYear();
export const yearOfRegistrationAtStrava = (creationDate: string) => new Date(creationDate).getFullYear();

export const getYearsAtStrava = (currentYear: number, creationDate: string): number[] => {
  let years: number[] = [];
  for (let y = yearOfRegistrationAtStrava(creationDate); y <= currentYear; y++) {
    years.push(y);
  }
  return years;
};

export const snackbarTime = 7000;

export const fromYear = (y: number): number => {
  return Date.parse(y.toString()) / 1000;
};

export const tillYear = (y: number): number => {
  return Date.parse((y + 1).toString()) / 1000 - 1;
};

export const convertDistanceToKM = (y: number) => {
  return Math.round(y / 1000);
};

export const convertSecToHrs = (y: number) => {
  return Math.round(y / 3600);
};

export function filterRidesByBike(bikeId: string, rides: Activity[]) {
  return rides.filter((activity) => {
    return activity.gear_id === bikeId;
  });
}

export const loginInputRules = {
  required: 'Введите логин',
  minLength: {
    value: 3,
    message: 'Должно быть не менее 3 символов'
  }
};

export const passwordInputRules = {
  required: 'Введите пароль',
  minLength: {
    value: 6,
    message: 'Должно быть не менее 6 символов'
  }
};
