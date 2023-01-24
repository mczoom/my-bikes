import { ExchangeToken } from "../models/ExchangeToken";
import { RefreshToken } from "../models/RefreshToken";


export const stravaAuthUrl: string = 'https://www.strava.com/oauth/token';
export const stravaApiUrl: string = 'https://www.strava.com/api/v3';

export const currentYear: number = new Date().getFullYear();

export const fromYear = (y: number): number => {
  return Date.parse(y.toString()) / 1000;
}

export const tillYear = (y:number): number => {
  return Date.parse((y + 1).toString()) / 1000 - 1;
}

export const tokenData = (): ExchangeToken | RefreshToken => {
  let token;
  if(localStorage.getItem('token')) {
    token = JSON.parse(localStorage.getItem('token') || "");
  }
  return token;
}