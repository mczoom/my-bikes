export function setLocalStorage(key: string, value: any) {
  localStorage.setItem(key, JSON.stringify(value));
}

export function getLocalStorageParsedValue(key: string) {
  const value = localStorage.getItem(key);
  return value ? JSON.parse(value) : null;
}

export function getLocalStorageValue(key: string) {
  const value = localStorage.getItem(key);
  return value ? value : null;
}

export function removeEmptyFields<T extends object>(update: T) {
  let objKeys = Object.keys(update) as Array<keyof T>;
  objKeys.forEach((key) => {
    if (update[key] === '' || update[key] == null || Number.isNaN(update[key])) {
      delete update[key];
    }
  });
  return update;
}
