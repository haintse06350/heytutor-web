import React from "react";
import NotificationProvider from "../context/notification/state";

export const GlobalContextProvider = ({ children }: any) => {
  return <NotificationProvider>{children}</NotificationProvider>;
};
