/* eslint-disable no-undef */
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
import CloseIcon from "@mui/icons-material/Close";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import { FirstTimeLoginPopup } from "../FirstTimeLoginPopup/FirstTimeLoginPopup";
//utils
// import { fShortenNumber } from "../../utils/formatNumber";

const HomePage = () => {
  const [data, setData]: any = React.useState(null);
  const [unreadNoti, setUnreadNoti] = React.useState([]);
  const [openNotice, setOpenNotice] = React.useState(true);
  const navigate = useNavigate();

  const classes = useStyles();

  const getUserStats = async (filters: any) => {
    const data = await Home.getUserStats(filters);
    setData(data);
  };

  const onClickPostDetail = (postId: number) => {
    navigate(`/post-detail?postId=${postId}&from=home-page`);
  };

  useEffect(() => {
    Notification.listNotification().then((res) => {
      setUnreadNoti(res.filter((item: any) => item.status === "unread"));
    });
    getUserStats({ time: "month" });
  }, []);

  const NotiIcon = ({ noti }: any) => {
    if (noti.notificationType === "accept_register") {
      return <HowToRegIcon />;
    }
    return <HowToRegIcon />;
  };

  const deadlineDayInSeconds = 1650961307; //"2022-04-26T08:21:47.000Z"

  React.useEffect(() => {
    //@ts-ignore
    const flipClock: any = new FlipDown(deadlineDayInSeconds);
    flipClock.start();
  }, []);

  return (
    <>
      <FirstTimeLoginPopup />
      <Box sx={{ mt: 1 }} className={classes.wrapHomePage}>
        <Page>
          <Box display="flex" alignItems="flex-end" justifyContent="center" sx={{ mb: 2 }}>
            <div id="flipdown" className="flipdown"></div>
            <Typography sx={{ ml: 2 }} variant="h2">
              kì thi FE Spring 2022
            </Typography>
          </Box>
          <Typography align="center" variant="h6" sx={{ fontWeight: 400, width: "80%", margin: "auto", mb: 2 }}>
            Kì thi cuối kì Spring sắp diễn ra. Tham gia vào các sự kiện để tìm kiếm sự giúp đỡ từ các mentor khác hoặc
            bạn cũng có thể trở thành người giải quyết vấn đề
          </Typography>
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
                    <Box display="flex" alignItems="center">
                      <NotiIcon noti={item} />
                      <Typography sx={{ ml: 1 }} variant="subtitle1" fontWeight={400}>
                        <span style={{ fontWeight: "bold" }}>{item.fromUsername} </span>
                        đã chọn bạn làm người hỗ trợ cho vấn đề &nbsp;
                        <span style={{ textDecoration: "underline" }}>&nbsp;#{item.postId}</span>
                      </Typography>
                    </Box>
                    <ArrowForwardIcon sx={{ width: 16 }} />
                  </Box>
                ))}
              <OnGoingEvent />
            </Grid>
          </Grid>
        </Page>
        {openNotice && (
          <Box className={classes.wrapWarningUser}>
            <Box display="flex" alignItems="center" justifyContent="space-between">
              <CloseIcon sx={{ width: 18, opacity: 0 }} />
              <Typography align="center" variant="h5" color="error">
                Chú ý
              </Typography>
              <CloseIcon sx={{ width: 16, cursor: "pointer" }} onClick={() => setOpenNotice(false)} />
            </Box>
            <Box className={classes.notiBox}>
              <Typography sx={{ p: 1 }}>Không hỗ trợ bất kì hình thức học hộ thi hộ nào !</Typography>
            </Box>
          </Box>
        )}
      </Box>
    </>
  );
};

export default HomePage;
