//import { checkStravaPermissions } from "utils/stravaAuthApi";


export function setLocalStorage(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
};


export function getLocalStorageParsedValue(key: string) {
  const value = localStorage.getItem(key);
  return value ? JSON.parse(value) : null;
};


export function getLocalStorageValue(key: string) {
  const value = localStorage.getItem(key);
  return value ? value : null;
};


// export function checkPermissions() {
//   checkStravaPermissions()
//     .then((permits: boolean) => {        
//       if(!permits) {
//         throw new Error('Приложение не привязано к аккаунту в Strava')
//       }
//       return permits
//     })
//     .catch((err) => console.log(err));
// }