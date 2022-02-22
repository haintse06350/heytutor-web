import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStyles } from "./Header.style";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Badge from "@mui/material/Badge";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";

const Header = () => {
  const classes = useStyles();

  //   begin listen event
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuId = "primary-search-account-menu";
  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    console.log("click menu open");
    setAnchorEl(event.currentTarget);
    setIsMenuOpen(true);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
    setIsMenuOpen(false);
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

  return (
    <div className={classes.headerWrap}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" noWrap component="div" sx={{ display: { xs: "none", sm: "block" } }}>
            HEYTUTOR
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <IconButton size="large" aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={4} color="error">
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton size="large" aria-label="show 17 new notifications" color="inherit">
              <Badge badgeContent={17} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <div onClick={handleProfileMenuOpen}>
              <IconButton size="large" edge="end" color="inherit" aria-label="account of current user">
                <AccountCircle />
              </IconButton>
            </div>
          </Box>
        </Toolbar>
      </AppBar>
      {isMenuOpen && renderMenu}
    </div>
  );
};

export default Header;
