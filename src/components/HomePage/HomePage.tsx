/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect } from "react";
// components
import Page from "../../layout/Page";

// material
import { Box, Typography, Grid } from "@mui/material";
import OnGoingEvent from "./OnGoingEvent";
import RegisteredPost from "./RegisteredPost";
// import EventJoined from "./Event/EventJoined";
import MyPost from "./MyPost";
// import RecentPost from "./RecentPost";
import { Home } from "../../models/home";

//utils
// import { fShortenNumber } from "../../utils/formatNumber";

const HomePage = () => {
  const [data, setData]: any = React.useState(null);

  // const classes = useStyles();
  const getUserStats = async () => {
    const data = await Home.getUserStats();
    setData(data);
  };
  useEffect(() => {
    getUserStats();
  }, []);

  return (
    <>
      <Box sx={{ mt: 10 }}>
        <Page>
          <Box sx={{ pb: 5 }}>
            <Typography variant="h4">Xin chào, chào mừng bạn đã quay trở lại</Typography>
          </Box>
          <Grid container spacing={3}>
            <Grid container spacing={2} item xs={4} md={4}>
              <Grid item xs={12} sm={12}>
                <MyPost data={data?.myRequestStats} />
              </Grid>
              <Grid item xs={12} sm={12}>
                <RegisteredPost data={data?.myRegisterStats} />
              </Grid>
            </Grid>
            <Grid item xs={8}>
              <OnGoingEvent />
            </Grid>
            {/* <Grid item xs={12} md={12}>
              <Grid item xs={12} sx={{ mb: { xs: 10 } }}>
                <RecentPost />
              </Grid>
            </Grid> */}
          </Grid>
        </Page>
      </Box>
    </>
  );
};

export default HomePage;
