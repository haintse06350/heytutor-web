import React from "react";
// MUI
import { Box, Card, Grid, Typography, Button, Chip } from "@mui/material";
import { useStyles } from "./HomeManager.style";
import imgCup from "../../../assets/home_event_images/trophy.png";
// icon
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";

const HomeManager = () => {
  const renderGeneralStatistic = [
    { title: "Bài đăng", data: "1200", dataStatus: 2.7 },
    { title: "Đăng kí giải quyết vấn đề", data: "200", dataStatus: -2.7 },
    { title: "Sự kiện", data: "10", dataStatus: 2.7 },
  ];

  const classes = useStyles();
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4} lg={4}>
          <Card sx={{ p: 2, position: "relative" }}>
            <Typography variant="subtitle1">Chúc mừng Cao Duc Anh!</Typography>

            <Typography variant="subtitle2">Người hỗ trợ có điểm đánh giá cao nhất tháng</Typography>
            <Typography>4.9 / 100 đánh giá</Typography>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Button variant="contained" sx={{ mt: 0.5 }}>
                Bảng xếp hạng đánh giá
              </Button>
              <Box>
                <img src={imgCup} alt="cup" className={classes.imageCup} />
              </Box>
            </Box>
          </Card>
        </Grid>
        <Grid item xs={12} md={8} lg={8}>
          <Card sx={{ p: 2 }}>
            <Typography>
              <b>Thông số phân tích cơ bản(theo tháng)</b>
            </Typography>
            <Grid container sx={{ display: "flex" }}>
              {renderGeneralStatistic.map((item, index) => (
                <Grid item xs={4} md={4} lg={4} key={index}>
                  <Typography variant="subtitle2">{item.title}</Typography>
                  <Box sx={{ display: "flex" }}>
                    {item.dataStatus > 0 ? <TrendingUpIcon color="success" /> : <TrendingDownIcon color="error" />}
                    <Typography sx={{ ml: 1 }}>{item.dataStatus} % </Typography>
                  </Box>
                  <Typography variant="h4">Tổng: {item.data} </Typography>
                </Grid>
              ))}
            </Grid>
          </Card>
        </Grid>

        <Grid item xs={6} md={3} lg={3}>
          <Card sx={{ p: 2, height: "100%" }}>
            <Typography>
              <b>Vấn đề cần giải quyết</b>
            </Typography>
            <Typography variant="h4">1200 vấn đề</Typography>
            <Typography sx={{ color: "green" }} variant="body1">
              +12%
            </Typography>
            <Chip label="Tháng trước" />
          </Card>
        </Grid>
        <Grid item xs={6} md={3} lg={3}>
          <Card sx={{ p: 2, height: "100%" }}>
            <Typography>
              <b>Người đăng kí giải quyết vấn đề</b>
            </Typography>
            <Typography variant="h4">80 người</Typography>
            <Typography color="error" variant="body1">
              -10%
            </Typography>
            <Chip label="Tháng trước" />
          </Card>
        </Grid>

        <Grid item xs={12} md={6} lg={6}>
          <Card sx={{ p: 2 }}>
            <Typography>
              <b>Tổng quan về cộng tác viên</b>
            </Typography>
            <Grid container>
              <Grid item xs={6} md={6}>
                {/* <Doughnut data={data} /> */}
              </Grid>
              <Grid item xs={6} md={6}>
                <Typography>Cộng tác viện: 10</Typography>
                <Typography>Sự kiện: 40</Typography>
                <Typography>Người tham gia: 140</Typography>
                <Typography>Vấn đề được giải quyết: 40</Typography>
              </Grid>
            </Grid>
          </Card>
        </Grid>
        {/* activity timeline */}
        <Grid item xs={12} md={6} lg={6}>
          <Card sx={{ p: 2 }}>
            <Typography>
              <b>Thông báo hoạt động</b>
            </Typography>
            <Box className={classes.timeLine} sx={{ float: "left", width: "200%", ml: "-100%" }}>
              <Timeline position="right">
                <TimelineItem>
                  <TimelineSeparator>
                    <TimelineDot />
                    <TimelineConnector />
                  </TimelineSeparator>
                  <TimelineContent>
                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                      <Typography>8 Thông báo mới về báo cáo xấu</Typography>
                      <Typography sx={{ color: "rgba(58, 53, 65, 0.68)" }}>8 giờ trước</Typography>
                    </Box>
                    <Box></Box>
                  </TimelineContent>
                </TimelineItem>
                <TimelineItem>
                  <TimelineSeparator>
                    <TimelineDot />
                    <TimelineConnector />
                  </TimelineSeparator>
                  <TimelineContent>
                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                      <Typography>2 Sự kiện mới được phê duyệt</Typography>
                      <Typography sx={{ color: "rgba(58, 53, 65, 0.68)" }}>10 giờ trước</Typography>
                    </Box>
                    <Box>
                      <Typography sx={{ color: "rgba(58, 53, 65, 0.68)" }}>
                        Quản trị viên xét duyệt: Cao Duc Anh
                      </Typography>
                    </Box>
                  </TimelineContent>
                </TimelineItem>
              </Timeline>
            </Box>
          </Card>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <Card sx={{ p: 2 }}></Card>
        </Grid>
      </Grid>
    </>
  );
};

export default HomeManager;
