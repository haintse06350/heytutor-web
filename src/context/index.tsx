import React from "react";
import NotificationProvider from "../context/notification/state";
import UserProvider from "../context/user/state";
import PostProvider from "../context/post/state";
import MsgProvider from "./message/message";

export const GlobalContextProvider = ({ children }: any) => {
  return (
    <NotificationProvider>
      <UserProvider>
        <MsgProvider>
          <PostProvider>{children}</PostProvider>
        </MsgProvider>
      </UserProvider>
    </NotificationProvider>
  );
};
