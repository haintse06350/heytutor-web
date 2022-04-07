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
import ImageEvent from "./ImageEvent/ImageEvent";
import { useStyles } from "./HomePage.style";
import { Notification } from "../../models/notification";
import { useNavigate } from "react-router-dom";
//utils
// import { fShortenNumber } from "../../utils/formatNumber";

const HomePage = () => {
  const [data, setData]: any = React.useState(null);
  const [unreadNoti, setUnreadNoti] = React.useState([]);
  const navigate = useNavigate();

  const classes = useStyles();
  const getUserStats = async () => {
    const data = await Home.getUserStats();
    setData(data);
  };

  const onClickPostDetail = (postId: number) => {
    navigate(`/post-detail?postId=${postId}&from=home-page`);
  };

  useEffect(() => {
    Notification.listNotification().then((res) => {
      setUnreadNoti(res.filter((item: any) => item.status === "unread"));
    });
    getUserStats();
  }, []);

  return (
    <>
      <Box sx={{ mt: 1 }} className={classes.wrapHomePage}>
        <Page>
          <Box sx={{ pb: 5 }}>
            <Typography variant="h4">Xin chào, chào mừng bạn đã quay trở lại</Typography>
          </Box>
          <Grid container spacing={3}>
            <Grid container item spacing={2} xs={12} md={3.7} lg={3.7} sx={{ height: "fit-content" }}>
              <Grid item xs={12} sm={12}>
                <MyPost data={data?.myRequestStats} />
              </Grid>
              <Grid item xs={12} sm={12}>
                <RegisteredPost data={data?.myRegisterStats} />
              </Grid>
              <Grid item xs={12} sm={12}>
                <ImageEvent />
              </Grid>
            </Grid>
            <Grid item xs={12} md={7.5}>
              {unreadNoti.length > 0 &&
                unreadNoti.slice(0, 3).map((item: any, index: number) => (
                  <Box className={classes.quickNoti} key={index} onClick={() => onClickPostDetail(item.postId)}>
                    <Typography variant="subtitle1" fontWeight={400}>
                      <span style={{ fontWeight: "bold" }}>{item.fromUsername} </span>
                      đã chọn bạn làm người hỗ trợ cho vấn đề &nbsp;
                      <span style={{ textDecoration: "underline" }}>&nbsp;#{item.postId}</span>
                      &nbsp;&nbsp;{`xem ngay >>>`}
                    </Typography>
                  </Box>
                ))}
              <OnGoingEvent />
            </Grid>
          </Grid>
        </Page>
        <Box className={classes.wrapWarningUser}>
          <Typography variant="h5" color="#5048E5">
            HEY-TUTOR
          </Typography>
          <Box>
            <Typography>Nghiêm cấm mọi hành vi học hộ, thi hộ!!</Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default HomePage;
