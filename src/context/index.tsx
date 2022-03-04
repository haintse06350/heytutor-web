import React from "react";
import NotificationProvider from "../context/notification/state";
import UserProvider from "../context/user/state";
import PostProvider from "../context/post/state";

export const GlobalContextProvider = ({ children }: any) => {
  return (
    <NotificationProvider>
      <UserProvider>
        <PostProvider>{children}</PostProvider>
      </UserProvider>
    </NotificationProvider>
  );
};
