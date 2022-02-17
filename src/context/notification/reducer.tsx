import { ACTIONS } from "./actions";

// eslint-disable-next-line import/no-anonymous-default-export
export default (state: any, action: any) => {
  const { message, isShowNotification, classify } = action;

  switch (action.type) {
    case ACTIONS.SET_NOTIF: {
      return {
        ...state,
        isShowNotification: true,
        message,
        classify,
      };
    }
    case ACTIONS.SET_SHOW_NOTIF: {
      return {
        ...state,
        isShowNotification,
      };
    }
    default:
      return state;
  }
};
