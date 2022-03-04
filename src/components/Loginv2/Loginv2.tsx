import React, { useContext } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Box, Button, Container, Grid, TextField, Typography } from "@mui/material";
import { Google as GoogleIcon } from "../../assets/google";
import { useNavigate } from "react-router-dom";
import { UserCtx } from "../../context/user/state";
import { User } from "../../models/users";

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
        login(user);
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
        }}>
        <Container maxWidth="sm">
          <form onSubmit={formik.handleSubmit}>
            <Box sx={{ my: 3 }}>
              <Typography color="textPrimary" variant="h4">
                Sign in
              </Typography>
              <Typography color="textSecondary" gutterBottom variant="body2">
                Sign in on the internal platform
              </Typography>
            </Box>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Button
                  fullWidth
                  color="error"
                  startIcon={<GoogleIcon />}
                  onClick={(e: any) => formik.handleSubmit(e)}
                  size="large"
                  variant="contained">
                  Login with Google
                </Button>
              </Grid>
            </Grid>
            <Box
              sx={{
                pb: 1,
                pt: 3,
              }}>
              <Typography align="center" color="textSecondary" variant="body1">
                or login with email address
              </Typography>
            </Box>
            <TextField
              error={Boolean(formik.touched.email && formik.errors.email)}
              fullWidth
              helperText={formik.touched.email && formik.errors.email}
              label="Email Address"
              margin="normal"
              name="email"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="email"
              value={formik.values.email}
              variant="outlined"
              disabled={formik.isSubmitting}
            />
            <TextField
              error={Boolean(formik.touched.password && formik.errors.password)}
              fullWidth
              helperText={formik.touched.password && formik.errors.password}
              label="Password"
              margin="normal"
              name="password"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="password"
              value={formik.values.password}
              variant="outlined"
              disabled={formik.isSubmitting}
            />
            <Box sx={{ py: 2 }}>
              <Button
                color="primary"
                disabled={formik.isSubmitting}
                fullWidth
                size="large"
                type="submit"
                variant="contained">
                Sign In Now
              </Button>
            </Box>
          </form>
        </Container>
      </Box>
    </>
  );
};

export default Loginv2;
