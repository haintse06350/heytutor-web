import React from "react";
import {
  Button,
  // CircularProgress,
  TextField,
  Typography,
  Box,
} from "@mui/material";

import { useStyles } from "./LoginAdmin.style";
const LoginAdmin = () => {
  const classes = useStyles();

  //   const [isLoading, setLoading] = useState(false);
  //   const [email, setEmail] = useState("");
  //   const [password, setPassword] = useState("");

  //   const onSubmit = async (event: React.FormEvent) => {
  //     event.preventDefault();
  //     setLoading(true);
  //     try {
  //       const user = await User.login({ email, password });
  //       localStorage.setItem("heytutor-user", user.token);

  //     } catch (e) {
  //       console.log(e);
  //     }
  //     setLoading(false);
  //   };
  //   const onChangeEmail = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
  //     setEmail(e.target.value);
  //   };

  //   const onChangePassword = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
  //     setPassword(e.target.value);
  //   };
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
          // onChange={onChangeEmail}
          // disabled={isLoading}
          fullWidth
        />
        <TextField
          className={classes.inputPassword}
          id="password"
          label="Password"
          // onChange={onChangePassword}
          // disabled={isLoading}
          type="password"
          fullWidth
        />
        <Button
          type="submit"
          className={classes.btnSubmit}
          variant="outlined"
          color="primary"
          fullWidth
          // disabled={isLoading}
          // startIcon={isLoading && <CircularProgress className={classes.loading} size={15} color="inherit" />}
        >
          Login
        </Button>
      </Box>
    </Box>
  );
};

export default LoginAdmin;
