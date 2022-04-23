import React, { useState, useContext, useEffect } from "react";
import {
  Button,
  // CircularProgress,
  TextField,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useStyles } from "./LoginAdmin.style";
import { User } from "../../models/users";
import { UserCtx } from "../../context/user/state";
const LoginAdmin = () => {
  const classes = useStyles();

  const [isLoading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loginAdmin, user } = useContext(UserCtx);
  const navigate = useNavigate();
  const admin = user;

  const onLogin = async () => {
    setLoading(true);
    try {
      const user = await User.loginAdmin({ email, password });
      localStorage.setItem("heytutor-user", user.token);
      loginAdmin(user);
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

      if (admin.role === "ctv1" || admin.role === "ctv2" || admin.role === "ctv3") {
        navigate("/dashboard/admin/manage-event");
      }
    }
  }, [admin]);

  return (
    <Box sx={{ display: "flex", justifyContent: "center", alignContent: "center" }}>
      <Box sx={{ width: "300px" }}>
        <Typography className={classes.title} variant="h1">
          Login To Your Account
        </Typography>
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
      </Box>
    </Box>
  );
};

export default LoginAdmin;
