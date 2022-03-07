import React, { useReducer } from "react";
import InAppNotification from "../../components/InAppNotification/InAppNotification";
import { INITIAL_STATE } from "./constants";
import { setShowNotif, setNotificationError, setNotificationSuccess, setNotificationInfo } from "./dispatchers";
import Reducer from "./reducer";
import INotificationCtx from "./types";

export const NotificationCtx = React.createContext<INotificationCtx>(INITIAL_STATE);

export default function NotificationProvider({ children }: any) {
  const [state, dispatch] = useReducer(Reducer, INITIAL_STATE);

  const setters = {
    setShowNotif: (isShowNotification: boolean) => setShowNotif(dispatch, isShowNotification),
    setNotificationError: (message: string) => setNotificationError(dispatch, message),
    setNotificationSuccess: (message: string) => setNotificationSuccess(dispatch, message),
    setNotificationInfo: (message: string) => setNotificationInfo(dispatch, message),
  };

  return (
    <NotificationCtx.Provider value={{ ...state, ...setters }}>
      <>
        {state.isShowNotification && <InAppNotification />}
        {children}
      </>
    </NotificationCtx.Provider>
  );
}
