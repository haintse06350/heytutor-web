import React, { useState, useContext, useEffect } from "react";
import {
  Button,
  // CircularProgress,
  TextField,
  Typography,
  Box,
  CircularProgress,
  Container,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useStyles } from "./LoginAdmin.style";
import { User } from "../../models/users";
import { UserCtx } from "../../context/user/state";
import Logo from "../../assets/logo.PNG";
const LoginAdmin = () => {
  const classes = useStyles();

  const [isLoading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, user } = useContext(UserCtx);
  const navigate = useNavigate();
  const admin = user;

  const onLogin = async () => {
    setLoading(true);
    try {
      const user = await User.loginAdmin({ email, password });
      localStorage.setItem("heytutor-user", user.token);
      login(user);
      window.location.reload();
    } catch (e) {
      console.log(e);
    }
    setLoading(false);
  };

  const onChangeEmail = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const onChangePassword = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  useEffect(() => {
    if (admin) {
      if (admin.role === "superadmin" || admin.role === "admin") {
        navigate("/dashboard/home-manager");
      }

      if (admin.role.toLowerCase().includes("ctv")) {
        navigate("/dashboard/admin/manage-event");
      }
    }
  }, [admin]);

  return (
    <Box
      component="main"
      sx={{
        alignItems: "center",
        display: "flex",
        flexGrow: 1,
        minHeight: "100%",
        px: 4,
      }}>
      <Box sx={{ position: "relative" }}>
        <Typography variant="h4" sx={{ position: "absolute", top: "15%", right: "12%" }}>
          Chào mừng bạn đến với hệ thống quản lí
        </Typography>
        <img src={Logo} alt="logo" />
      </Box>
      <Container maxWidth="sm" sx={{ background: "#fff", borderRadius: 1 }}>
        <Box sx={{ my: 3 }}>
          <Typography color="textPrimary" variant="h6" sx={{ textAlign: "left" }}>
            Đăng nhập
          </Typography>
        </Box>
        <TextField
          className={classes.inputEmail}
          id="email"
          label="Email"
          onChange={onChangeEmail}
          disabled={isLoading}
          fullWidth
        />
        <TextField
          className={classes.inputPassword}
          id="password"
          label="Password"
          onChange={onChangePassword}
          disabled={isLoading}
          type="password"
          fullWidth
        />
        <Button
          className={classes.btnSubmit}
          variant="outlined"
          color="primary"
          fullWidth
          onClick={onLogin}
          disabled={isLoading}
          startIcon={isLoading && <CircularProgress className={classes.loading} size={15} color="inherit" />}>
          Login
        </Button>
      </Container>
    </Box>
  );
};

export default LoginAdmin;
