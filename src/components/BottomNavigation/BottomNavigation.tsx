import React from "react";
import { useStyles } from "./BottomNavigation.style";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import HomeIcon from "@mui/icons-material/Home";
import CelebrationIcon from "@mui/icons-material/Celebration";
import AddIcon from "@mui/icons-material/Add";
import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
export const BtNavigation = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState("home");
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  return (
    <div className={classes.bottomNavigation}>
      <BottomNavigation sx={{ width: 500 }} value={value} onChange={handleChange}>
        <BottomNavigationAction label="Home" value="home" icon={<HomeIcon />} />
        <BottomNavigationAction label="Event" value="event" icon={<CelebrationIcon />} />
        <BottomNavigationAction label="Post" value="post" icon={<AddIcon />} />
        <BottomNavigationAction label="Notification" value="notification" icon={<NotificationsNoneRoundedIcon />} />
        <BottomNavigationAction label="Profile" value="profile" icon={<PermIdentityIcon />} />
      </BottomNavigation>
    </div>
  );
};

export default BottomNavigation;
