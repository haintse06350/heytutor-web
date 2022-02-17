import React from "react";
import NotificationProvider from "../context/notification/state";
import UserProvider from "../context/user/state";

export const GlobalContextProvider = ({ children }: any) => {
  return (
    <NotificationProvider>
      <UserProvider>{children}</UserProvider>
    </NotificationProvider>
  );
};
