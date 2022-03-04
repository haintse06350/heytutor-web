import { ACTIONS } from "./actions";

// eslint-disable-next-line import/no-anonymous-default-export
export default (state: any, action: any) => {
  switch (action.type) {
    case ACTIONS.CREATE:
      return {
        ...state,
        isCreatingPost: true,
      };

    case ACTIONS.CLOSE:
      return {
        ...state,
        isCreatingPost: false,
      };

    default:
      return state;
  }
};
