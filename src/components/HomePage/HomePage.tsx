/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
// components
import Page from "../../layout/Page";
import NavigationBar from "../Common/NavigationBar/NavigationBar";

// material
import { Container, Box, Typography, Grid } from "@mui/material";
import OnGoingEvent from "./OnGoingEvent";
import RegisteredPost from "./RegisteredPost";
import EventJoined from "./EventJoined";
import MyPost from "./MyPost";
import RecentPost from "./RecentPost";

//utils
// import { fShortenNumber } from "../../utils/formatNumber";

const HomePage = () => {
  // const classes = useStyles();

  return (
    <>
      <NavigationBar />
      <Box sx={{ mt: 10 }}>
        <Page>
          <Container maxWidth="lg">
            <Box sx={{ pb: 5 }}>
              <Typography variant="h4">Hi, Welcome back</Typography>
            </Box>
            <Grid container spacing={3}>
              <Grid container spacing={2} item xs={12} md={9}>
                <Grid item xs={12} sm={4} sx={{ maxHeight: 260 }}>
                  <MyPost />
                </Grid>
                <Grid item xs={12} sm={4} sx={{ maxHeight: 260 }}>
                  <RegisteredPost />
                </Grid>
                <Grid item xs={12} sm={4} sx={{ maxHeight: 260 }}>
                  <EventJoined />
                </Grid>
                <Grid item xs={12}>
                  <OnGoingEvent />
                </Grid>
              </Grid>
              <Grid item xs={12} md={3}>
                <Grid item xs={12} sx={{ mb: { xs: 10 } }}>
                  <RecentPost />
                </Grid>
              </Grid>
            </Grid>
          </Container>
        </Page>
      </Box>
    </>
  );
};

export default HomePage;
