import React, { useEffect, useContext, useState } from "react";
import { useStyles } from "./BottomNavigation.style";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import HomeIcon from "@mui/icons-material/Home";
import CelebrationIcon from "@mui/icons-material/Celebration";
import AddIcon from "@mui/icons-material/Add";
import NotificationsNoneRoundedIcon from "@mui/icons-material/NotificationsNoneRounded";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import { useNavigate } from "react-router-dom";
import { PostCtx } from "../../context/post/state";
import { Grid } from "@mui/material";

const BottomNav = () => {
  const classes = useStyles();
  const [value, setValue] = useState("home");
  const { createPost } = useContext(PostCtx);
  const navigate = useNavigate();
  const pathname = window.location.pathname;

  const onChange = (event: React.SyntheticEvent, newValue: string) => {
    if (newValue === "post") {
      createPost();
    } else {
      setValue(newValue);
      navigate(`/${newValue}`);
    }
  };

  useEffect(() => {
    setValue(pathname.split("/")[1]);
  }, [pathname]);

  return (
    <>
      <Grid sx={{ display: { xs: "flex", sm: "none" } }} id="bottom-nav" className={classes.bottomNavigation}>
        <BottomNavigation sx={{ width: 500 }} value={value} onChange={onChange}>
          <BottomNavigationAction label="Trang chủ" value="home" icon={<HomeIcon />} />
          <BottomNavigationAction label="Sự kiện" value="event" icon={<CelebrationIcon />} />
          <BottomNavigationAction label="Tạo bài viết" value="post" icon={<AddIcon />} />
          <BottomNavigationAction label="Thông báo" value="notification" icon={<NotificationsNoneRoundedIcon />} />
          <BottomNavigationAction label="Trang cá nhân" value="profile" icon={<PermIdentityIcon />} />
        </BottomNavigation>
      </Grid>
    </>
  );
};

export default BottomNav;
