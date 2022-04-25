import React from "react";
import { ACTIONS } from "./actions";
import jwt_decode from "jwt-decode";

export const onOpenGuideline = (dispatch: React.Dispatch<any>) => {
  console.log("onclick open guideline");
  dispatch({ type: ACTIONS.OPEN_GUIDELINE });
};

export const onCloseGuideline = (dispatch: React.Dispatch<any>) => {
  dispatch({ type: ACTIONS.CLOSE_GUIDELINE });
};

export const login = async (dispatch: React.Dispatch<any>, user: any) => {
  try {
    const userObj: any = jwt_decode(user);
    dispatch({ type: ACTIONS.LOGIN, user: userObj.user });
    return user;
  } catch (e) {
    console.error("Fail to log in", e);
  }
};

export const loginAdmin = async (dispatch: React.Dispatch<any>, user: any) => {
  try {
    const userObj: any = jwt_decode(user);
    dispatch({ type: ACTIONS.ADMIN_LOGIN, admin: userObj.user });
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
