import React from "react";
import { Box, Typography, Divider, TextField } from "@mui/material";
import { useStyles } from "./MessageBox.style";
import RemoveRoundedIcon from "@mui/icons-material/RemoveRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { MsgCtx } from "../../context/message/message";

export const MessageBox = (props: any) => {
  const { postId, postTitle, userId, userName } = props;
  const { openMsgBox, onOpenMsgBox, onCloseMsgBox, onMinimizeMsgBox, isMinimize } = React.useContext(MsgCtx);
  console.log(postId, postTitle, userId);

  const classes = useStyles();

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
          <Divider variant="middle" />
          <div className={classes.body}></div>
          <div className={classes.messageBox}>
            <div className={classes.messageInput}>
              <TextField id="outlined-size-small" size="small" sx={{ width: "70%" }} />
            </div>
          </div>
        </Box>
      ) : isMinimize ? (
        minimizeWindow()
      ) : (
        <></>
      )}
    </>
  );
};
