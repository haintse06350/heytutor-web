import React, { useReducer } from "react";
import { INITIAL_STATE } from "./constants";
import { login, logout } from "./dispatchers";
import Reducer from "./reducer";
import IUserCtx from "./types";

export const UserCtx = React.createContext<IUserCtx>(INITIAL_STATE);

export default function UserProvider({ children }: any) {
  const [state, dispatch] = useReducer(Reducer, INITIAL_STATE);

  const setters = {
    login: (user: any) => login(dispatch, user),
    logout: () => logout(dispatch),
  };

  return <UserCtx.Provider value={{ ...state, ...setters }}>{children}</UserCtx.Provider>;
}
