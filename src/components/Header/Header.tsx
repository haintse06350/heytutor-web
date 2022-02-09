import React, { useEffect } from "react";
import { useStyles } from "./Header.style";
import { FaBell, FaSistrix } from "react-icons/fa";
import { Filter } from "./Filter/Filter";

export const Header = () => {
  const classes = useStyles();

  useEffect(() => {});

  return (
    <>
      <div className={classes.header}>
        <div className={classes.logo}>Hey-tutor</div>
        <div className={classes.eventHome}>Sự kiện</div>
        <input type="text" placeholder="Tìm kiếm" className={classes.findInput} />
        <FaSistrix className={classes.iconSearch} />
        <div className={classes.profile}>
          <div className={classes.notificationProfile}>
            <FaBell />
          </div>
          <div className={classes.usernameProfile}>
            <img className={classes.avatarProfile}></img>
            Username
          </div>
        </div>
        <div className={classes.filterDisplay}></div>
      </div>
      <Filter />
    </>
  );
};

export default Header;
