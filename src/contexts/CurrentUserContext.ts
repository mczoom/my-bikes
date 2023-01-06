import React from "react";
import { Profile } from "../models/Profile";

export const CurrentUserContext = React.createContext<Profile>({} as Profile);