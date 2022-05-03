import React, { useContext } from "react";

// material
import { alpha, styled } from "@mui/material/styles";
import { AppBar, Toolbar, Box, Stack, Button, IconButton } from "@mui/material";
import Logo from "../../../assets/logo.PNG";
//components
import NotificationsPopover from "../../Header/NotificationsPopover";
import AccountPopover from "../../Header/AccountPopover";

import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import { PostCtx } from "../../../context/post/state";
import SearchIcon from "@mui/icons-material/Search";

const DRAWER_WIDTH = 0;
const APPBAR_MOBILE = 64;
const APPBAR_DESKTOP = 64;

const RootStyle = styled(AppBar)(({ theme }) => ({
  boxShadow: "none",
  backdropFilter: "blur(6px)",
  WebkitBackdropFilter: "blur(6px)", // Fix on Mobile
  backgroundColor: alpha(theme.palette.background.default, 0.72),
  [theme.breakpoints.up("lg")]: {
    width: `calc(100% - ${DRAWER_WIDTH + 1}px)`,
  },
}));

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  minHeight: APPBAR_MOBILE,
  [theme.breakpoints.up("lg")]: {
    minHeight: APPBAR_DESKTOP,
    padding: theme.spacing(0, 5),
  },
}));

const NavigationBar = () => {
  const navigate = useNavigate();
  const { createPost } = useContext(PostCtx);

  const handleClickHome = () => {
    navigate("/home");
  };

  return (
    <RootStyle>
      <ToolbarStyle>
        <img style={{ width: 140, position: "absolute", left: -10 }} onClick={handleClickHome} src={Logo} alt="" />
        <Box sx={{ flexGrow: 1 }} />
        <Stack direction="row" alignItems="center" spacing={{ xs: 0.5, sm: 1 }}>
          <Button
            sx={{
              maxHeight: 30,
              width: 120,
              fontSize: "12px",
              fontWeight: "bold",
              color: "#fff",
              px: 0.75,
              py: 0.5,
              mr: 2,
              textTransform: " none",
            }}
            onClick={() => {
              createPost();
            }}
            variant="contained"
            startIcon={<AddIcon sx={{ color: "#FFFFFF", width: 14 }} />}>
            Đăng vấn đề
          </Button>
          <IconButton href="/search">
            <SearchIcon color="primary" />
          </IconButton>

          <NotificationsPopover />

          <AccountPopover />
        </Stack>
      </ToolbarStyle>
    </RootStyle>
  );
};

export default NavigationBar;
