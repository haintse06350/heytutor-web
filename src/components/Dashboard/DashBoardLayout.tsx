import React, { useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { UserCtx } from "../../context/user/state";
import { styled, useTheme } from "@mui/material/styles";
import {
  Box,
  Drawer,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemText,
  ListItemIcon,
  Avatar,
} from "@mui/material";
import { useStyles } from "./Dashboard.style";

import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import EventIcon from "@mui/icons-material/Event";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import PeopleIcon from "@mui/icons-material/People";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import HomeIcon from "@mui/icons-material/Home";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { stringAvatar } from "../UserProfile/helper";

const drawerWidth = 240;
const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const DashBoardLayout = ({ children }: any) => {
  const theme = useTheme();
  const classes = useStyles();
  const navigate = useNavigate();
  const { user } = useContext(UserCtx);
  const [open, setOpen] = useState(false);
  const [openTab, setOpenTab] = useState(false);
  const onOpenDrawer = () => {
    setOpen(true);
  };

  const onCloseDrawer = () => {
    setOpen(false);
  };
  const handleClick = (e: any) => {
    setOpenTab(!openTab);
    console.log(e.currentTarget.value);
  };

  const handleChangePage = (childPage: any) => {
    navigate(`/dashboard/${childPage}`);
  };

  const currentPage = window.location.pathname;
  console.log(currentPage);

  const renderPageTitle = () => {
    switch (currentPage) {
      case "/dashboard":
        return "Trang chủ";
      case "/dashboard/manage-user":
        return "Quản lí người dùng";
      case "/dashboard/manage-ctv":
        return "Quản lí cộng tác viên";
      case "/dashboard/manage-post":
        return "Quản lí bài đăng";
      case "/dashboard/admin/manage-event":
        return "Quản lí sự kiện";
      default:
        return "";
    }
  };

  const renderTabCurrent = () => {
    if (currentPage.includes("/manage-user")) {
      return "manage-user";
    } else if (currentPage.includes("/manage-ctv")) {
      return "manage-ctv";
    } else if (currentPage.includes("/manage-event")) {
      return "manage-event";
    } else if (currentPage.includes("/manage-post")) {
      return "manage-post";
    } else if (currentPage.includes("/home-manager")) {
      return "home-manager";
    } else if (currentPage.includes("/home-ctv")) {
      return "home-ctv";
    } else {
      return "";
    }
  };

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={onOpenDrawer}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}>
            <MenuIcon />
          </IconButton>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
            <Typography variant="h6" noWrap component="div">
              {renderPageTitle()}
            </Typography>
            <Avatar {...stringAvatar("Đức Anh")}></Avatar>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}>
        <DrawerHeader>
          <IconButton onClick={onCloseDrawer}>
            {theme.direction === "ltr" ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <ListItem button>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Trang chủ quản lí" />
            {openTab ? <ExpandLess /> : <ExpandMoreIcon />}
          </ListItem>
          <Collapse in={openTab} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem
                button
                sx={{ pl: 4 }}
                onClick={() => handleChangePage("home-ctv")}
                className={renderTabCurrent() === "home-ctv" ? classes.active : ""}>
                <ListItemIcon>
                  <PeopleAltIcon />
                </ListItemIcon>
                <ListItemText primary="Cộng tác viên" />
              </ListItem>
              <ListItem
                button
                sx={{ pl: 4 }}
                onClick={() => handleChangePage("home-manager")}
                className={renderTabCurrent() === "home-manager" ? classes.active : ""}>
                <ListItemIcon>
                  <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary="Admin" />
              </ListItem>
            </List>
          </Collapse>
          <ListItem
            button
            onClick={() => handleChangePage("manage-post")}
            className={renderTabCurrent() === "manage-post" ? classes.active : ""}>
            <ListItemIcon>
              <InboxIcon />
            </ListItemIcon>
            <ListItemText primary="Quản lí bài đăng" />
          </ListItem>
          <ListItem
            button
            onClick={() => handleChangePage("admin/manage-event")}
            className={renderTabCurrent() === "manage-event" ? classes.active : ""}>
            <ListItemIcon>
              <EventIcon />
            </ListItemIcon>
            <ListItemText primary="Quản lí sự kiện" />
          </ListItem>
          <ListItem button onClick={(e) => handleClick(e)}>
            <ListItemIcon>
              <ManageAccountsIcon />
            </ListItemIcon>
            <ListItemText primary="Quản lí người dùng" />
            {openTab ? <ExpandLess /> : <ExpandMoreIcon />}
          </ListItem>
          <Collapse in={openTab} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              <ListItem
                button
                sx={{ pl: 4 }}
                onClick={() => handleChangePage("manage-ctv")}
                className={renderTabCurrent() === "manage-ctv" ? classes.active : ""}>
                <ListItemIcon>
                  <PeopleAltIcon />
                </ListItemIcon>
                <ListItemText primary="Cộng tác viên" />
              </ListItem>
              <ListItem
                button
                sx={{ pl: 4 }}
                onClick={() => handleChangePage("manage-user")}
                className={renderTabCurrent() === "manage-user" ? classes.active : ""}>
                <ListItemIcon>
                  <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary="Người dùng hệ thống" />
              </ListItem>
            </List>
          </Collapse>
        </List>
        <Divider />
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        {children}
      </Main>
    </Box>
  );
};
export default DashBoardLayout;
