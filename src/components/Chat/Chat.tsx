import React from "react";
import { ChatEngine } from "react-chat-engine";
// import ChatCard from "./ChatCard";
import "./Chat.css";

export const Chat = () => {
  return (
    <ChatEngine
      height="calc(100vh - 62px)"
      userName="haint"
      userSecret="123123"
      projectID="de969c63-1866-429e-bfa7-b632652dbede"
      offset={+7}

      // renderChatCard={(chat: any, index: any) => {
      //   return <ChatCard chat={chat} index={index} />;
      // }}
    />
  );
};

export default Chat;
