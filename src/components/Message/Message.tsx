import { Avatar } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useStyles } from "./Message.style";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";

export const Message = () => {
  const classes = useStyles();

  const [input, setInput] = useState("");

  useEffect(() => {
    console.log(input);
  }, [input]);

  const handleClickClose = () => {};

  return (
    <div className={classes.messageWrapContext}>
      {/* bao quanh noi dung chat */}
      <div className={classes.messageHeader}>
        {/* header of list chat */}
        <div className={classes.messageTitle}>Tin nhắn</div>
        <div onClick={handleClickClose}>
          <CloseIcon className={classes.messageClose} />
        </div>
        <div className={classes.messageSearch}>
          <SearchIcon className={classes.iconSearch} />
          <input
            type="text"
            placeholder="Tìm kiếm"
            className={classes.findInput}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
      </div>
      <div className={classes.messageContent}>
        {/* content of list chat */}
        <Avatar sx={{ width: 24, height: 24 }} className={classes.avatarUser} />
        <div className={classes.messageUsername}>Cao Duc Anh</div>
        <FiberManualRecordIcon className={classes.messageStatus} color="success" />
        <MoreHorizIcon className={classes.messageMoreOption} />
      </div>
    </div>
  );
};

export default Message;
