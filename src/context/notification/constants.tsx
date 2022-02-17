import IAlertCtx from "./types";

export const INITIAL_STATE: IAlertCtx = {
  isShowNotification: false,
  classify: "",
  message: "",
  setShowNotif: () => {
    return new Promise<void>(function (resolve, reject) {
      reject();
    });
  },
  setNotificationError: () => {
    return new Promise<void>(function (resolve, reject) {
      reject();
    });
  },
  setNotificationSuccess: () => {
    return new Promise<void>(function (resolve, reject) {
      reject();
    });
  },
  setNotificationInfo: () => {
    return new Promise<void>(function (resolve, reject) {
      reject();
    });
  },
};
