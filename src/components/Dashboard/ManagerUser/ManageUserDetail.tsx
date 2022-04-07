import React from "react";
import { Tabs, Tab, Box, Typography, Grid, Card, Chip, Button } from "@mui/material";
// import { useNavigate } from "react-router-dom";

// import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import EmailIcon from "@mui/icons-material/Email";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EventNoteIcon from "@mui/icons-material/EventNote";
import BreadcrumbsTab from "../../Common/Breadcrumbs/Breadcrumbs";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}>
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
const ManageUserDetail = (props: any) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <BreadcrumbsTab
        history={[{ title: "Quản lí người dùng", href: "/dashboard/manage-user" }]}
        current={{ title: "Chi tiết" }}
      />

      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Box sx={{ display: "flex", p: 1 }}>
          <AccountCircleIcon sx={{ mr: 1 }} />
          <Typography variant="h6">Cao Duc Anh</Typography>
          <EmailIcon sx={{ ml: 4, mr: 1 }} />
          <Typography variant="h6">anhcd@fpt.edu.vn</Typography>
        </Box>
      </Box>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Báo cáo xấu chưa giải quyết" {...a11yProps(0)} />
          <Tab label="Báo cáo xấu đã giải quyết" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <Box>
          <Grid container>
            <Grid item xs={12} md={4} lg={4}>
              <Card sx={{ p: 2 }}>
                <Typography variant="h6">Người báo cáo xấu</Typography>
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
                <Box sx={{ display: "flex" }}>
                  <EventNoteIcon sx={{ mr: 1 }} />
                  <Typography variant="h6">Title sự kiện tham gia</Typography>
                </Box>
                <Box sx={{ display: "flex" }}>
                  <AccessTimeIcon sx={{ mr: 1 }} />
                  <Typography variant="subtitle1">28/4/2022</Typography>
                </Box>
                <Typography variant="subtitle1">Lí do báo cáo xấu :</Typography>
                <Chip label="Lừa đảo" />

                <Typography variant="subtitle1">Nội dung báo cáo xấu : </Typography>
                <Typography>
                  mục đích: + Thể hiện được trình độ, thái độ của supporter. giúp người dùng có cái nhìn tổng quan về
                  supporter để dễ dàng lựa chọn người giúp đỡ. + Phản ánh đánh giá của người dùng cho từng supporter. +
                  Supporter: Tăng khả năng lựa chọn nếu được đánh giá số điểm tốt. Ghi nhận hỗ trợ càng nhiều bài đăng
                  đã đóng thì profile càng đẹp
                </Typography>

                <Button>Kiểm tra tính đúng đắn</Button>
              </Card>
            </Grid>
          </Grid>
        </Box>
      </TabPanel>
      <TabPanel value={value} index={1}>
        List item được hiển thị kiểu như bên màn người dùng list post
      </TabPanel>
    </Box>
  );
};
export default ManageUserDetail;
