import React, { useState, useContext } from "react";
import { Button, CircularProgress, TextField, Typography } from "@mui/material";
import { useStyles } from "./Login.style";
import { UserCtx } from "../../context/user/state";
import { User } from "../../models/users";
import GoogleIcon from "@mui/icons-material/Google";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const classes = useStyles();
  const { login }: any = useContext(UserCtx);
  const [isLoading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    try {
      const user = await User.login({ email, password });
      localStorage.setItem("heytutor-user", user.token);
      login(user);
      navigate("/");
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

  return (
    <div className={classes.root}>
      <form className={classes.form} onSubmit={onSubmit}>
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
          type="submit"
          className={classes.btnSubmit}
          variant="outlined"
          color="primary"
          fullWidth
          disabled={isLoading}
          startIcon={isLoading && <CircularProgress className={classes.loading} size={15} color="inherit" />}>
          Login
        </Button>
        <Button
          className={classes.btnGoogle}
          startIcon={<GoogleIcon />}
          fullWidth
          color="primary"
          variant="contained"
          href={`${process.env.REACT_APP_API}/auth/google/`}>
          Login with Google
        </Button>
      </form>
    </div>
  );
};

export default Login;
