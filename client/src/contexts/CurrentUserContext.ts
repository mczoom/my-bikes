import React from "react";
import { Profile } from "types/Profile";

export const CurrentUserContext = React.createContext<Profile>({} as Profile);