import React, { useContext, useRef, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
// material
import { alpha } from "@mui/material/styles";
import { Button, Box, Divider, MenuItem, Typography, Avatar, IconButton } from "@mui/material";
// components
import MenuPopover from "./MenuPopover";
//context
import { UserCtx } from "../../context/user/state";
//utils
// import { stringAvatar } from "../UserProfile/helper";
//icons
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import UserGuideIcon from "../../assets/user-guide.png";

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const { user, onOpenGuideline } = useContext(UserCtx);
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);

  const onOpenPopover = () => {
    setOpen(true);
  };

  const onClosePopOver = () => {
    setOpen(false);
  };

  const onOpenUserGuide = () => {
    onOpenGuideline();
    onClosePopOver();
  };

  const UserGuide = () => {
    return <img width={24} height={22} style={{ marginRight: 16 }} src={UserGuideIcon} alt="" />;
  };

  return (
    <>
      <IconButton
        ref={anchorRef}
        onClick={onOpenPopover}
        sx={{
          padding: 0,
          width: 44,
          height: 44,
          ...(open && {
            "&:before": {
              zIndex: 1,
              content: "''",
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              position: "absolute",
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72),
            },
          }),
        }}>
        <Avatar style={{ border: "2px solid #00ab55" }} src={user?.avatar} alt="photoURL" />
      </IconButton>

      <MenuPopover open={open} onClose={onClosePopOver} anchorEl={anchorRef.current} sx={{ width: 250 }}>
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle1" noWrap>
            {user?.name || "Nguyễn Trung Hải"}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
            {user?.email || "haintse06350@fpt.edu.vn"}
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        <MenuItem
          key={"profile"}
          to={"/profile"}
          component={RouterLink}
          onClick={onClosePopOver}
          sx={{ typography: "body2", py: 1, px: 2.5 }}>
          <PersonOutlinedIcon
            sx={{
              mr: 2,
              width: 24,
              height: 24,
            }}
          />
          Trang cá nhân
        </MenuItem>

        <MenuItem onClick={onOpenUserGuide} sx={{ typography: "body2", py: 1, px: 2.5 }}>
          <UserGuide />
          Hướng dẫn
        </MenuItem>

        <MenuItem
          key={"setting"}
          to={"/setting"}
          component={RouterLink}
          onClick={onClosePopOver}
          sx={{ typography: "body2", py: 1, px: 2.5 }}>
          <SettingsOutlinedIcon
            sx={{
              mr: 2,
              width: 24,
              height: 24,
            }}
          />
          Cài đặt
        </MenuItem>

        <Box sx={{ p: 2, pt: 1.5 }}>
          <Button
            onClick={() => {
              localStorage.removeItem("heytutor-user");
              window.location.reload();
            }}
            fullWidth
            color="inherit"
            variant="outlined">
            Đăng xuất
          </Button>
        </Box>
      </MenuPopover>
    </>
  );
}
