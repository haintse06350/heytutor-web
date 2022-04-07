import React, { useState } from "react";
import {
  Card,
  Grid,
  Typography,
  Box,
  // Toolbar,
  Divider,
  LinearProgress,
  LinearProgressProps,
} from "@mui/material";
//icon
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
// help
// import moment from "moment";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import BreadcrumbsTab from "../../Common/Breadcrumbs/Breadcrumbs";

function LinearProgressWithLabel(props: LinearProgressProps & { value: number }) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress variant="determinate" {...props} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="text.secondary">{`${Math.round(props.value)}%`}</Typography>
      </Box>
    </Box>
  );
}

const DialogDetailCTV = (props: any) => {
  const [value, setValue] = useState("1");

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100" }}>
      <BreadcrumbsTab
        history={[{ title: "Quản lí cộng tác viên ", href: "/dashboard/manage-ctv" }]}
        current={{ title: "Chi tiết" }}
      />

      <Grid sx={{ p: 2 }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Thông tin cộng tác viên" value="1" />
            </TabList>
          </Box>
          {/* thông tin CTV */}
          <TabPanel value="1">
            <Grid container spacing={2}>
              <Grid item xs={12} md={4} lg={4}>
                <Card sx={{ p: 2 }}>
                  <Grid container>
                    <Grid item xs={1}>
                      <AccountCircleIcon />
                    </Grid>
                    <Grid item xs={3} sx={{ display: "flex", justifyContent: "space-between" }}>
                      <Typography variant="subtitle1">Tên </Typography>
                      <Typography variant="subtitle1">:</Typography>
                    </Grid>
                    <Grid item xs={8}>
                      <Typography> &nbsp; Cao Duc Anh</Typography>
                    </Grid>
                  </Grid>
                  <Grid container>
                    <Grid item xs={1}>
                      <EmailIcon />
                    </Grid>
                    <Grid item xs={3} sx={{ display: "flex", justifyContent: "space-between" }}>
                      <Typography variant="subtitle1">Hòm thư </Typography>
                      <Typography variant="subtitle1">:</Typography>
                    </Grid>
                    <Grid item xs={8}>
                      <Typography>&nbsp; anhcd4@gmail.com</Typography>
                    </Grid>
                  </Grid>
                  <Grid container>
                    <Grid item xs={1}>
                      <PhoneIphoneIcon />
                    </Grid>
                    <Grid item xs={3} sx={{ display: "flex", justifyContent: "space-between" }}>
                      <Typography variant="subtitle1">Phone </Typography>
                      <Typography variant="subtitle1">:</Typography>
                    </Grid>
                    <Grid item xs={8}>
                      <Typography>&nbsp; 0999999999</Typography>
                    </Grid>
                  </Grid>
                  <Grid container>
                    <Grid item xs={1}>
                      <ManageAccountsIcon />
                    </Grid>
                    <Grid item xs={3} sx={{ display: "flex", justifyContent: "space-between" }}>
                      <Typography variant="subtitle1">Quản lí bởi</Typography>
                      <Typography variant="subtitle1">:</Typography>
                    </Grid>
                    <Grid item xs={8}>
                      <Typography>&nbsp; hailt@fpt.edu.vn</Typography>
                    </Grid>
                  </Grid>
                  <Box>
                    <Box sx={{ display: "flex" }}>
                      <Typography variant="subtitle1">Sự kiện đang quản lí : </Typography>
                      <Typography>&nbsp;&nbsp;2</Typography>
                    </Box>
                    <Box sx={{ display: "flex" }}>
                      <Typography variant="subtitle1">Sự kiện đang đăng kí : </Typography>
                      <Typography>&nbsp;&nbsp;2</Typography>
                    </Box>
                    <Box sx={{ display: "flex" }}>
                      <Typography variant="subtitle1">Sự kiện đã kết thúc : </Typography>
                      <Typography>&nbsp;&nbsp;2</Typography>
                    </Box>
                    <Box sx={{ display: "flex" }}>
                      <Typography variant="subtitle1">Vấn đề đã được giúp đỡ xong : </Typography>
                      <Typography>&nbsp;&nbsp;200</Typography>
                    </Box>
                  </Box>
                </Card>
              </Grid>
              <Grid item xs={12} md={8} lg={8}>
                <Card sx={{ p: 2, mb: 2 }}>
                  <Typography>Thông tin chi tiết</Typography>
                  <Divider />

                  <Grid container sx={{ p: 2 }}>
                    <Grid item xs={6} md={3} lg={3} sx={{ display: "flex", justifyContent: "space-between" }}>
                      <Typography variant="subtitle1">Tên đầy đủ </Typography>
                      <Typography variant="subtitle1">:</Typography>
                    </Grid>
                    <Grid item xs={6} md={9} lg={9}>
                      <Typography>&nbsp;Cao Đức Anh </Typography>
                    </Grid>
                    <Grid item xs={6} md={3} lg={3} sx={{ display: "flex", justifyContent: "space-between" }}>
                      <Typography variant="subtitle1">Địa chỉ </Typography>
                      <Typography variant="subtitle1">:</Typography>
                    </Grid>
                    <Grid item xs={6} md={9} lg={9}>
                      <Typography>&nbsp;29, Đội nhân, Ba đình, Hà nội </Typography>
                    </Grid>
                    <Grid item xs={6} md={3} lg={3} sx={{ display: "flex", justifyContent: "space-between" }}>
                      <Typography variant="subtitle1">Phone</Typography>
                      <Typography variant="subtitle1">:</Typography>
                    </Grid>
                    <Grid item xs={6} md={9} lg={9}>
                      <Typography>&nbsp;09999999999 , 0988888888 </Typography>
                    </Grid>
                    <Grid item xs={6} md={3} lg={3} sx={{ display: "flex", justifyContent: "space-between" }}>
                      <Typography variant="subtitle1">Email</Typography>
                      <Typography variant="subtitle1">:</Typography>
                    </Grid>
                    <Grid item xs={6} md={9} lg={9}>
                      <Typography>&nbsp;anhcd@gmail.com </Typography>
                    </Grid>
                    <Grid item xs={6} md={3} lg={3} sx={{ display: "flex", justifyContent: "space-between" }}>
                      <Typography variant="subtitle1">Website</Typography>
                      <Typography variant="subtitle1">:</Typography>
                    </Grid>
                    <Grid item xs={6} md={9} lg={9}>
                      <Typography>&nbsp;facebook.com/anhcd4</Typography>
                    </Grid>
                  </Grid>
                </Card>
                <Card sx={{ p: 2, mb: 2 }}>
                  <Typography>Lịch sử hoạt động</Typography>
                  <Divider />

                  <Grid container sx={{ p: 2 }}>
                    <Grid item xs={6} md={4} lg={4}>
                      <Typography variant="subtitle1">2021-Hiện tại</Typography>
                      <Typography variant="body2">Cộng tác viên</Typography>
                    </Grid>
                    <Grid item xs={6} md={8} lg={8}>
                      <Typography>&nbsp;Nguyễn Trung Hải đã thêm làm cộng tác viên</Typography>
                    </Grid>
                  </Grid>
                </Card>
                <Card sx={{ p: 2, mb: 2 }}>
                  <Typography>Trình độ học vấn</Typography>
                  <Divider />

                  <Grid container sx={{ p: 2 }}>
                    <Grid item xs={6} md={4} lg={4}>
                      <Typography variant="subtitle1">2018-2022</Typography>
                      <Typography variant="body2">FPT University</Typography>
                    </Grid>
                    <Grid item xs={6} md={8} lg={8}>
                      <Typography>Tốt nghiệp đại học FPT</Typography>
                      <Typography variant="body2">Chuyên ngành kỹ thuật phần mềm</Typography>
                    </Grid>
                    <Grid item xs={6} md={4} lg={4} sx={{ mt: 2 }}>
                      <Typography variant="subtitle1">2015-2018</Typography>
                      <Typography variant="body2">Nguyen Xuan On THPT</Typography>
                    </Grid>
                    <Grid item xs={6} md={8} lg={8} sx={{ mt: 2 }}>
                      <Typography>Tốt nghiệp Trung học phổ thông</Typography>
                      <Typography variant="body2">Tốt nghiệp trung học phổ thông Nguyễn Xuân Ôn</Typography>
                    </Grid>
                  </Grid>
                </Card>
                <Card sx={{ p: 2, mb: 2 }}>
                  <Typography>Kỹ năng</Typography>
                  <Divider />

                  <Grid container sx={{ p: 2 }}>
                    <Grid item xs={12} md={6} lg={6}>
                      <Typography variant="subtitle1">Wordpress</Typography>
                      <Box sx={{ width: "100%" }}>
                        <LinearProgressWithLabel value={80} />
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={6} lg={6}>
                      <Typography variant="subtitle1">English</Typography>
                      <Box sx={{ width: "100%" }}>
                        <LinearProgressWithLabel value={70} />
                      </Box>
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
            </Grid>
          </TabPanel>
        </TabContext>
      </Grid>
    </Box>
  );
};
export default DialogDetailCTV;
