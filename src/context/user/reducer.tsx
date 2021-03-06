import { ACTIONS } from "./actions";

// eslint-disable-next-line import/no-anonymous-default-export
export default (state: any, action: any) => {
  const { user } = action;

  switch (action.type) {
    case ACTIONS.LOGIN:
      return {
        ...state,
        user,
      };
    case ACTIONS.ADMIN_LOGIN:
      return {
        ...state,
        user,
      };
    case ACTIONS.LOGOUT:
      return {
        ...state,
        user: null,
      };
    case ACTIONS.OPEN_GUIDELINE:
      return {
        ...state,
        openGuideline: true,
      };
    case ACTIONS.CLOSE_GUIDELINE:
      return {
        ...state,
        openGuideline: false,
      };
    default:
      return state;
  }
};
