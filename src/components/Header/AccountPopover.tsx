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
import { stringAvatar } from "../UserProfile/helper";
//icons
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const { user } = useContext(UserCtx);
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <IconButton
        ref={anchorRef}
        onClick={handleOpen}
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
        <Avatar {...stringAvatar(user?.name)} alt="photoURL" />
      </IconButton>

      <MenuPopover open={open} onClose={handleClose} anchorEl={anchorRef.current} sx={{ width: 220 }}>
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle1" noWrap>
            {user?.name}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }} noWrap>
            {user?.email}
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        <MenuItem
          key={"profile"}
          to={"/profile"}
          component={RouterLink}
          onClick={handleClose}
          sx={{ typography: "body2", py: 1, px: 2.5 }}>
          <PersonIcon
            sx={{
              mr: 2,
              width: 24,
              height: 24,
            }}
          />
          Profile
        </MenuItem>

        <MenuItem
          key={"setting"}
          to={"/setting"}
          component={RouterLink}
          onClick={handleClose}
          sx={{ typography: "body2", py: 1, px: 2.5 }}>
          <SettingsIcon
            sx={{
              mr: 2,
              width: 24,
              height: 24,
            }}
          />
          Setting
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
            Logout
          </Button>
        </Box>
      </MenuPopover>
    </>
  );
}
