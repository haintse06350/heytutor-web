import React, { useReducer } from "react";
import { GuidelinePage } from "../../components/GuidelinePage/GuidelinePage";
import { INITIAL_STATE } from "./constants";
import { login, logout, loginAdmin, onOpenGuideline, onCloseGuideline } from "./dispatchers";
import Reducer from "./reducer";
import IUserCtx from "./types";

export const UserCtx = React.createContext<IUserCtx>(INITIAL_STATE);

export default function UserProvider({ children }: any) {
  const [state, dispatch] = useReducer(Reducer, INITIAL_STATE);

  const setters = {
    onOpenGuideline: () => onOpenGuideline(dispatch),
    onCloseGuideline: () => onCloseGuideline(dispatch),
    login: (user: any) => login(dispatch, user),
    loginAdmin: (user: any) => loginAdmin(dispatch, user),
    logout: () => logout(dispatch),
  };

  return (
    <UserCtx.Provider value={{ ...state, ...setters }}>
      {children}
      {state.openGuideline && <GuidelinePage />}
    </UserCtx.Provider>
  );
}
