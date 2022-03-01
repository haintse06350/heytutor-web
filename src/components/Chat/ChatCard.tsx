import React from "react";

export const ChatCard = (props: any) => {
  const { chat, index } = props;
  console.log(chat + " / " + index);
  return <div>Chat Card</div>;
};

export default ChatCard;
