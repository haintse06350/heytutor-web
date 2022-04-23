import React from "react";
// MUI
import {
  Box,
  Card,
  Grid,
  Typography,
  Button,
  Chip,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
} from "@mui/material";
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
          <Card sx={{ p: 2, position: "relative", height: "100%" }}>
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
          <Card sx={{ p: 2, height: "100%" }}>
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
              <b>Sự kiện mới</b>
            </Typography>
            <Typography variant="h4">2 sự kiện</Typography>
            <Typography sx={{ color: "green" }} variant="body1">
              +12%
            </Typography>
            <Box>
              <Chip label="Tháng trước" />
              <Button>Xem chi tiết</Button>
            </Box>
          </Card>
        </Grid>
        <Grid item xs={6} md={3} lg={3}>
          <Card sx={{ p: 2, height: "100%" }}>
            <Typography>
              <b>Cộng tác viên</b>
            </Typography>
            <Typography variant="h4">8 người</Typography>
            <Typography color="error" variant="body1">
              &nbsp;
            </Typography>
            <Box>
              <Chip label="Tất cả" />
              <Button>Xem chi tiết</Button>
            </Box>
          </Card>
        </Grid>

        <Grid item xs={12} md={6} lg={6}>
          <Card sx={{ p: 2, height: "100%" }}>
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
                      <Typography>3 Sự kiện mới được yêu cầu phê duyệt</Typography>
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
        {/* activity timeline */}
        <Grid item xs={12} md={12} lg={12}>
          <TableContainer component={Paper}>
            <Table aria-label="ctv table">
              <TableHead>
                <TableRow>
                  <TableCell>Id</TableCell>
                  <TableCell>Tiêu đề</TableCell>
                  <TableCell>Thời gian hết hạn</TableCell>
                  <TableCell>Số người tham gia</TableCell>
                  <TableCell>Số báo cáo xấu</TableCell>
                  <TableCell>Quản lí sự kiện</TableCell>
                  <TableCell>Trạng thái</TableCell>
                  <TableCell>Quản lí</TableCell>
                </TableRow>
              </TableHead>
              <TableBody></TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </>
  );
};

export default HomeManager;
