import React from "react";
import { Box, Typography, Divider, Avatar, InputBase, Button } from "@mui/material";
import { useStyles } from "./MessageBox.style";
import RemoveRoundedIcon from "@mui/icons-material/RemoveRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { MsgCtx } from "../../context/message/message";
import { Message } from "../../models/message";
import InsertLinkIcon from "@mui/icons-material/InsertLink";
import SendIcon from "@mui/icons-material/Send";
import { stringAvatar } from "../UserProfile/helper";
import { map } from "lodash";
import { UserCtx } from "../../context/user/state";
import moment from "moment";
import "moment/locale/vi";
import clsx from "classnames";

export const MessageBox = (props: any) => {
  const { postId, userId, userName } = props;
  const { openMsgBox, onOpenMsgBox, onCloseMsgBox, onMinimizeMsgBox, isMinimize } = React.useContext(MsgCtx);
  const [messages, setMessages]: any = React.useState(null);
  const { user } = React.useContext(UserCtx);
  const [msg, setMsg] = React.useState("");

  const classes = useStyles();
  moment.locale("vi");

  const onChangeInput = (event: any) => {
    setMsg(event.target.value);
  };

  const sendMessage = async () => {
    const input = {
      senderId: user?.id,
      senderName: user?.name,
      receiverId: userId,
      receiverName: userName,
      postId,
      message: msg,
    };
    setMsg("");
    setMessages([...messages, input]);
    await Message.sendMessage(input);
  };

  const minimizeWindow = () => {
    return (
      <Box className={classes.minimizeBox} sx={{ boxShadow: 20 }} onClick={() => onOpenMsgBox()}>
        <div className={classes.header}>
          <div className={classes.postTitleAndUserName}>
            <Typography variant="h6">{userName}</Typography>
          </div>
        </div>
      </Box>
    );
  };

  const getPostConversation = async (postId: string, userId: number) => {
    const conversation = await Message.getPostConversation(postId, userId);
    if (conversation) {
      const listMessages = await Message.listMessages({ limit: 100, offset: 0, conversationId: conversation.id });
      setMessages(listMessages.rows);
    } else {
      setMessages([]);
    }
  };

  React.useEffect(() => {
    if (postId && userId) {
      getPostConversation(postId, userId);
    }
  }, [postId, userId]);

  return (
    <>
      {openMsgBox && !isMinimize ? (
        <Box className={classes.root} sx={{ boxShadow: 20 }}>
          <div className={classes.header}>
            <div className={classes.postTitleAndUserName}>
              <Typography variant="h6">{userName}</Typography>
              <div className={classes.actions}>
                <div className={classes.minimize} onClick={() => onMinimizeMsgBox()}>
                  <RemoveRoundedIcon />
                </div>
                <div className={classes.close} onClick={() => onCloseMsgBox()}>
                  <CloseRoundedIcon />
                </div>
              </div>
            </div>
          </div>
          <Box id="messageBox" className={classes.messageContent}>
            {map(messages, (message: any) => (
              <Box
                className={classes.messageRow}
                display="flex"
                alignItems="center"
                justifyContent={message.senderId === user?.id ? "flex-end" : "flex-start"}>
                {message.senderId !== user?.id && (
                  <Avatar {...stringAvatar(message.senderName)} className={classes.senderAvatar} />
                )}
                <Box
                  className={clsx(classes.message, message.senderId === user?.id && classes.myMsg)}
                  display="flex"
                  flexDirection="column"
                  sx={{ ml: 1 }}>
                  <Typography variant="body2" sx={{ fontWeight: 500 }}>
                    {message.message}
                  </Typography>
                  <Typography sx={{ fontSize: 10, fontStyle: "italic" }} variant="caption">
                    {moment(message.createdAt).fromNow()}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
          <Divider sx={{ mt: 1 }} variant="fullWidth" />
          <Box className={classes.messageInput}>
            <InsertLinkIcon color="secondary" />
            <InputBase
              className={classes.inputBase}
              placeholder="Tin nhắn văn bản"
              value={msg}
              onChange={onChangeInput}
            />
            <Button disabled={msg === ""} sx={{ p: 0 }}>
              <SendIcon color={msg ? "primary" : "secondary"} onClick={sendMessage} />
            </Button>
          </Box>
        </Box>
      ) : isMinimize ? (
        minimizeWindow()
      ) : (
        <></>
      )}
    </>
  );
};
