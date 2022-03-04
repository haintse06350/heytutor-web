import React from "react";
import { ACTIONS } from "./actions";

export const createPost = async (dispatch: React.Dispatch<any>) => {
  try {
    dispatch({ type: ACTIONS.CREATE });
  } catch (e) {
    console.error(e);
  }
};

export const discardCreatingPost = async (dispatch: React.Dispatch<any>) => {
  try {
    dispatch({ type: ACTIONS.CLOSE });
  } catch (e) {
    console.error(e);
  }
};
