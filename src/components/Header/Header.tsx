import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStyles } from "./Header.style";
import MailIcon from "@mui/icons-material/Mail";
import CelebrationIcon from "@mui/icons-material/Celebration";
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
  Tooltip,
  Button,
} from "@mui/material";
import Search from "../HomePage/Search/Search";
import PostDetail from "../HomePage/PostDetail";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import Post from "../Post2/Post";
import AccountPopover from "./AccountPopover/AccountPopover";
import NotificationsPopover from "./NotificationsPopover/NotificationsPopover";

const Header = () => {
  const classes = useStyles();
  const [openSearch, setOpenSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [openDialog, setOpenDialog] = useState(false);
  const [openCreatePost, setOpenCreatePost] = useState(false);
  const navigate = useNavigate();

  const onCloseDialog = () => {
    setOpenDialog(false);
  };

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
            sx={{ color: "#5048E5", display: { xs: "none", sm: "block" } }}>
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

          <Box sx={{ display: { xs: "flex", md: "flex", alignItems: "center" } }}>
            <Button
              sx={{ maxHeight: 36, width: 150 }}
              onClick={handleRequiredCreatePost}
              variant="contained"
              startIcon={<AddIcon sx={{ color: "#FFFFFF" }} />}>
              Tạo bài viết
            </Button>
            {openCreatePost && <Post openDialog={openCreatePost} closeDialog={handleRequiredCreatePostClose}></Post>}
            <Tooltip title={"Sự kiện"}>
              <IconButton size="large" color="inherit">
                <CelebrationIcon color="primary" />
              </IconButton>
            </Tooltip>
            <Tooltip title={"Tin nhắn"}>
              <IconButton size="large" aria-label="show 4 new mails" color="inherit">
                <Badge badgeContent={4} color="error">
                  <MailIcon color="primary" />
                </Badge>
              </IconButton>
            </Tooltip>
            <Tooltip title={"Thông báo"}>
              <NotificationsPopover />
            </Tooltip>
            <AccountPopover />
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
