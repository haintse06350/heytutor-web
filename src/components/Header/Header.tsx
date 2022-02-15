import React, { useEffect } from "react";
import { useStyles } from "./Header.style";
import { Filter } from "./Filter/Filter";

import SearchIcon from "@mui/icons-material/Search";
import CircleNotificationsIcon from "@mui/icons-material/CircleNotifications";
import Avatar from "@mui/material/Avatar";

export const Header = () => {
  const classes = useStyles();

  useEffect(() => {});

  return (
    <div className={classes.root}>
      <div className={classes.header}>
        <div className={classes.logo}>Hey-tutor</div>
        <div className={classes.eventHome}>Sự kiện</div>
        <input type="text" placeholder="Tìm kiếm" className={classes.findInput} />
        <SearchIcon className={classes.iconSearch} />
        <div className={classes.profile}>
          <CircleNotificationsIcon fontSize="large" className={classes.iconNotification} />

          <div className={classes.usernameProfile}>
            <Avatar className={classes.avatarProfile}>N</Avatar>
            Username
          </div>
        </div>
        <div className={classes.filterDisplay}></div>
      </div>
      <Filter />
    </div>
  );
};

export default Header;
