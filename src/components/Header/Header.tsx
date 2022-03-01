import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStyles } from "./Header.style";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import CelebrationIcon from "@mui/icons-material/Celebration";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Tooltip from "@mui/material/Tooltip";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import {
  Grid,
  TextField,
  InputAdornment,
  Typography,
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Badge,
  MenuItem,
  Menu,
} from "@mui/material";
import Search from "../HomePage/Search/Search";
import PostDetail from "../HomePage/PostDetail";
import SearchIcon from "@mui/icons-material/Search";
import Post from "../Post2/Post";

const Header = () => {
  const classes = useStyles();

  //   begin listen event
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuId = "primary-search-account-menu";

  const [openSearch, setOpenSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [openDialog, setOpenDialog] = useState(false);
  const [openCreatePost, setOpenCreatePost] = useState(false);
  // const [selectedPost, setSelectedPost]: any = useState(null);
  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    console.log("click menu open");
    setAnchorEl(event.currentTarget);
    setIsMenuOpen(true);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
    setIsMenuOpen(false);
  };
  const onCloseDialog = () => {
    setOpenDialog(false);
  };
  // end listen event

  //   begin listen redirect page
  const navigate = useNavigate();
  const handleMenuProfile = () => {
    setAnchorEl(null);
    setIsMenuOpen(false);
    navigate("/profile");
  };
  const handleMenuLogout = () => {
    setAnchorEl(null);
    setIsMenuOpen(false);
  };
  //   end listen redirect page

  //begin render menu avatar
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      className={classes.headerMenu}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}>
      <MenuItem value="profile" onClick={handleMenuProfile}>
        Trang cá nhân
      </MenuItem>
      <MenuItem value="logout" onClick={handleMenuLogout}>
        Thoát ra
      </MenuItem>
    </Menu>
  );
  //end render menu avatar
  const onClickSearch = () => {
    setOpenSearch(true);
  };
  const onCloseSearch = () => {
    setSearchQuery("");
    setOpenSearch(false);
  };
  const handleClickHome = () => {
    navigate("/home");
  };
  const handleRequiredCreatePost = () => {
    setOpenCreatePost(true);
  };
  const handleRequiredCreatePostClose = () => {
    setOpenCreatePost(false);
  };
  return (
    <div className={classes.headerWrap}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            className={classes.headerTitle}
            onClick={handleClickHome}
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: "none", sm: "block" } }}>
            HEYTUTOR
          </Typography>
          {openSearch && <Search searchQuery={searchQuery} open={openSearch} onClose={onCloseSearch} />}
          {openDialog && <PostDetail onCloseDialog={onCloseDialog} openDialog={openDialog} />}
          <Grid item className={classes.searchDialog}>
            <TextField
              fullWidth
              disabled
              variant="outlined"
              onClick={onClickSearch}
              className={classes.search}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="end">
                    <SearchIcon color="primary" />
                  </InputAdornment>
                ),
                classes: { notchedOutline: classes.noBorder },
              }}
              placeholder={"Tìm kiếm trên Heytutor"}
            />
          </Grid>
          <Box sx={{ flexGrow: 1 }} />

          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <Tooltip title={"Tạo bài viêt"} onClick={handleRequiredCreatePost}>
              <IconButton size="large" color="inherit">
                <BorderColorIcon />
              </IconButton>
            </Tooltip>
            {openCreatePost && <Post openDialog={openCreatePost} closeDialog={handleRequiredCreatePostClose}></Post>}
            <Tooltip title={"Sự kiện"}>
              <IconButton size="large" color="inherit">
                <CelebrationIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title={"Tin nhắn"}>
              <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                <Badge badgeContent={4} color="error">
                  <MailIcon />
                </Badge>
              </IconButton>
            </Tooltip>
            <Tooltip title={"Thông báo"}>
              <IconButton size="large" aria-label="show 17 new notifications" color="inherit">
                <Badge badgeContent={17} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
            </Tooltip>
            <div onClick={handleProfileMenuOpen}>
              <Tooltip title={"Trang cá nhân"}>
                <IconButton size="large" edge="end" color="inherit" aria-label="account of current user">
                  <AccountCircle />
                </IconButton>
              </Tooltip>
            </div>
          </Box>
        </Toolbar>
      </AppBar>
      {isMenuOpen && renderMenu}
    </div>
  );
};

export default Header;
