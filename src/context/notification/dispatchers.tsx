import { ACTIONS } from "./actions";

export const setShowNotif = (dispatch: any, isShowNotification: boolean) => {
  dispatch({ type: ACTIONS.SET_SHOW_NOTIF, isShowNotification });
};

export const setNotificationError = (dispatch: any, message: string) => {
  dispatch({ type: ACTIONS.SET_NOTIF, message, classify: "error" });
};

export const setNotificationSuccess = (dispatch: any, message: string) => {
  dispatch({ type: ACTIONS.SET_NOTIF, message, classify: "success" });
};

export const setNotificationInfo = (dispatch: any, message: string) => {
  dispatch({ type: ACTIONS.SET_NOTIF, message, classify: "info" });
};
