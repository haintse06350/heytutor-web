import React from "react";

// material
import { alpha, styled } from "@mui/material/styles";
import { AppBar, Toolbar, Box, Stack, Typography } from "@mui/material";

//components
import Searchbar from "./Searchbar";
import NotificationsPopover from "../../Header/NotificationsPopover";
import AccountPopover from "../../Header/AccountPopover";
import MessagePopover from "../../Header/MessagePopover";
import { useNavigate } from "react-router-dom";

const DRAWER_WIDTH = 80;
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
  const handleClickHome = () => {
    navigate("/home");
  };
  return (
    <RootStyle>
      <ToolbarStyle>
        <Typography
          onClick={handleClickHome}
          variant="h3"
          noWrap
          component="div"
          sx={{ color: "#5048E5", display: { xs: "none", sm: "block" }, cursor: "pointer", marginRight: "70px" }}>
          HEYTUTOR
        </Typography>
        <Searchbar />
        <Box sx={{ flexGrow: 1 }} />
        <Stack direction="row" alignItems="center" spacing={{ xs: 0.5, sm: 1.5 }}>
          <MessagePopover />
          <NotificationsPopover />
          <AccountPopover />
        </Stack>
      </ToolbarStyle>
    </RootStyle>
  );
};

export default NavigationBar;
