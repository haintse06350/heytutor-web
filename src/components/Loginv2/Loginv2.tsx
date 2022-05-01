import React, { useContext } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Box, Button, Container, Grid, InputAdornment, TextField, Typography } from "@mui/material";
import { Google as GoogleIcon } from "../../assets/google";
import { useNavigate } from "react-router-dom";
import { UserCtx } from "../../context/user/state";
import { User } from "../../models/users";
import AccountCircle from "@mui/icons-material/AccountCircle";
import LockIcon from "@mui/icons-material/Lock";
import Logo from "../../assets/logo.PNG";
const Loginv2 = () => {
  const navigate = useNavigate();
  const { login }: any = useContext(UserCtx);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Must be a valid email").max(255).required("Email is required"),
      password: Yup.string().max(255).required("Password is required"),
    }),
    onSubmit: async () => {
      try {
        const user = await User.login({ email: formik.values.email, password: formik.values.password });
        localStorage.setItem("heytutor-user", user.token);
        await login(user.token);
        navigate("/");
      } catch (e) {
        console.log(e);
      }
    },
  });

  return (
    <>
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
          <Typography variant="h4" sx={{ position: "absolute", top: "15%", left: "18%" }}>
            Chào mừng bạn đến với hệ thống
          </Typography>
          <img src={Logo} alt="logo" />
        </Box>
        <Container maxWidth="sm" sx={{ background: "#fff", borderRadius: 1 }}>
          <form onSubmit={formik.handleSubmit}>
            <Box sx={{ my: 3 }}>
              <Typography color="textPrimary" variant="h6" sx={{ textAlign: "left" }}>
                Đăng nhập
              </Typography>
            </Box>
            <Grid container spacing={3}>
              <Grid item xs={12} md={12}>
                <Button
                  fullWidth
                  color="error"
                  startIcon={<GoogleIcon />}
                  href={`${process.env.REACT_APP_API}/auth/google/`}
                  size="medium"
                  variant="contained">
                  Đăng nhập với tài khoản FPT
                </Button>
              </Grid>
            </Grid>
            <Box
              sx={{
                pb: 1,
                pt: 3,
              }}>
              <Typography align="center" color="textSecondary" variant="body1">
                hoặc đăng nhập với email
              </Typography>
            </Box>
            <TextField
              error={Boolean(formik.touched.email && formik.errors.email)}
              fullWidth
              helperText={formik.touched.email && formik.errors.email}
              label="Email"
              placeholder="Email"
              margin="normal"
              name="email"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="email"
              value={formik.values.email}
              variant="outlined"
              disabled={formik.isSubmitting}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              error={Boolean(formik.touched.password && formik.errors.password)}
              fullWidth
              helperText={formik.touched.password && formik.errors.password}
              label="Mật khẩu"
              placeholder="Mật khẩu"
              margin="normal"
              name="password"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="password"
              value={formik.values.password}
              variant="outlined"
              disabled={formik.isSubmitting}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon />
                  </InputAdornment>
                ),
              }}
            />
            <Box sx={{ py: 2 }}>
              <Button
                color="primary"
                disabled={formik.isSubmitting}
                fullWidth
                size="medium"
                type="submit"
                variant="contained">
                Đăng nhập
              </Button>
            </Box>
          </form>
        </Container>
      </Box>
    </>
  );
};

export default Loginv2;
