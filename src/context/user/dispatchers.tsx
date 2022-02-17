import React from "react";
import { ACTIONS } from "./actions";

export const login = async (dispatch: React.Dispatch<any>, user: any) => {
  try {
    dispatch({ type: ACTIONS.LOGIN, user: user.user });
    return user;
  } catch (e) {
    console.error("Fail to log in", e);
  }
};

export const logout = async (dispatch: React.Dispatch<any>) => {
  try {
    // await Auth.signOut();
    dispatch({ type: ACTIONS.LOGOUT });
  } catch (e) {
    console.error("Fail to log out", e);
  }
};
