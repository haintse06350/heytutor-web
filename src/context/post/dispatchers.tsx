import React from "react";
import { ACTIONS } from "./actions";

export const createPost = (dispatch: React.Dispatch<any>) => {
  try {
    console.log("onClick create post ");
    dispatch({ type: ACTIONS.CREATE });
  } catch (e) {
    console.error(e);
  }
};

export const discardCreatingPost = (dispatch: React.Dispatch<any>) => {
  try {
    dispatch({ type: ACTIONS.CLOSE });
  } catch (e) {
    console.error(e);
  }
};
