import React from "react";

import { Box, Card, Grid, Typography } from "@mui/material";
import Timeline from "@mui/lab/Timeline";
import TimelineItem from "@mui/lab/TimelineItem";
import TimelineSeparator from "@mui/lab/TimelineSeparator";
import TimelineConnector from "@mui/lab/TimelineConnector";
import TimelineContent from "@mui/lab/TimelineContent";
import TimelineDot from "@mui/lab/TimelineDot";
const HomeManageCTV = () => {
  return (
    <Box>
      <Grid container spacing={2}>
        {/* header */}

        {/* thong tin event can xu li */}
        <Grid item xs={12} md={4} lg={4}>
          <Card sx={{ p: 2 }}>
            <Typography variant="subtitle1">Người dùng bị báo cáo xấu</Typography>
            <Typography variant="subtitle2">Báo cáo mới: 5/12</Typography>
            <Box sx={{ display: "flex", overFlow: "scroll" }}>
              <Card sx={{ width: "fit-content", mr: 1, display: "flex", p: 1 }}>
                <Typography variant="subtitle2">#hashTagEvent</Typography>
                <Typography variant="subtitle2" sx={{ color: "red", ml: 0.5 }}>
                  2
                </Typography>
              </Card>
              <Card sx={{ width: "fit-content", mr: 1, display: "flex", p: 1 }}>
                <Typography variant="subtitle2">#hashTagEvent</Typography>
                <Typography variant="subtitle2" sx={{ color: "red", ml: 0.5 }}>
                  2
                </Typography>
              </Card>
              <Card sx={{ width: "fit-content", mr: 1, display: "flex", p: 1 }}>
                <Typography variant="subtitle2">#PRJ</Typography>
                <Typography variant="subtitle2" sx={{ color: "red", ml: 0.5 }}>
                  1
                </Typography>
              </Card>
            </Box>
          </Card>
        </Grid>
        <Grid item xs={12} md={4} lg={4}>
          <Card sx={{ p: 2 }}>
            <Typography variant="subtitle1">Bài đăng bị báo cáo xấu</Typography>
            <Typography variant="subtitle2">Báo cáo mới: 5/12</Typography>

            <Box sx={{ display: "flex", overFlow: "scroll" }}>
              <Card sx={{ width: "fit-content", mr: 1, display: "flex", p: 1 }}>
                <Typography variant="subtitle2">#hashTagEvent</Typography>
                <Typography variant="subtitle2" sx={{ color: "red", ml: 0.5 }}>
                  2
                </Typography>
              </Card>
              <Card sx={{ width: "fit-content", mr: 1, display: "flex", p: 1 }}>
                <Typography variant="subtitle2">#hashTagEvent</Typography>
                <Typography variant="subtitle2" sx={{ color: "red", ml: 0.5 }}>
                  2
                </Typography>
              </Card>
              <Card sx={{ width: "fit-content", mr: 1, display: "flex", p: 1 }}>
                <Typography variant="subtitle2">#PRJ</Typography>
                <Typography variant="subtitle2" sx={{ color: "red", ml: 0.5 }}>
                  1
                </Typography>
              </Card>
            </Box>
          </Card>
        </Grid>
        <Grid item xs={12} md={4} lg={4}>
          <Card sx={{ p: 2, height: "100%" }}>
            <Typography variant="subtitle1">Sự kiện được giao quản lí</Typography>
            <Typography variant="subtitle2">Sự kiện được giao mới: 1</Typography>
            <Typography variant="subtitle2">Sự kiện đang quản lí: 3</Typography>
          </Card>
        </Grid>
        {/* content */}
        <Grid item xs={12} md={6} lg={6}>
          <Card sx={{ p: 2 }}>
            <Typography>
              <b>Thông báo hoạt động</b>
            </Typography>
            <Box sx={{ float: "left", width: "200%", ml: "-100%" }}>
              <Timeline position="right">
                <TimelineItem>
                  <TimelineSeparator>
                    <TimelineDot />
                    <TimelineConnector />
                  </TimelineSeparator>
                  <TimelineContent>
                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                      <Typography>1 Sự kiện có bình luận mới</Typography>
                      <Typography sx={{ color: "rgba(58, 53, 65, 0.68)" }}>8 giờ trước</Typography>
                    </Box>
                    <Box>
                      <Typography sx={{ color: "rgba(58, 53, 65, 0.68)", fontSize: 14 }}>
                        Bình luận từ admin: Cao Duc Anh trong sự kiện
                      </Typography>
                      <Typography
                        sx={{
                          color: "rgba(58, 53, 65, 0.68)",
                          fontSize: 14,
                          textDecoration: "underline",
                          cursor: "pointer",
                        }}>
                        Vượt qua kì thi FE cùng những kinh nghiệm quý báu
                      </Typography>
                    </Box>
                  </TimelineContent>
                </TimelineItem>
                <TimelineItem>
                  <TimelineSeparator>
                    <TimelineDot />
                    <TimelineConnector />
                  </TimelineSeparator>
                  <TimelineContent>
                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                      <Typography>1 Sự kiện mới được phê duyệt</Typography>
                      <Typography sx={{ color: "rgba(58, 53, 65, 0.68)" }}>10 giờ trước</Typography>
                    </Box>
                    <Box>
                      <Typography sx={{ color: "rgba(58, 53, 65, 0.68)" }}>
                        Quản trị viên xét duyệt: Cao Duc Anh
                      </Typography>
                    </Box>
                  </TimelineContent>
                </TimelineItem>
                <TimelineItem>
                  <TimelineSeparator>
                    <TimelineDot />
                    <TimelineConnector />
                  </TimelineSeparator>
                  <TimelineContent>
                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                      <Typography>1 Sự kiện mới được thêm quản lí</Typography>
                      <Typography sx={{ color: "rgba(58, 53, 65, 0.68)" }}>11 giờ trước</Typography>
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
    </Box>
  );
};

export default HomeManageCTV;
