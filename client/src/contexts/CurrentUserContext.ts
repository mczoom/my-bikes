import { createContext } from 'react';
import { Profile } from 'types/Profile';

export const CurrentUserContext = createContext<Profile>({} as Profile);
