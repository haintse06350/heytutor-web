import React, { useState, useEffect } from "react";
import { Tabs, Tab, Box, Typography, Grid, Card, Chip, Button } from "@mui/material";
// import { useNavigate } from "react-router-dom";

// import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import EmailIcon from "@mui/icons-material/Email";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import EventNoteIcon from "@mui/icons-material/EventNote";
import BreadcrumbsTab from "../../Common/Breadcrumbs/Breadcrumbs";
import { Manager } from "../../../models/manager";

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
  const [value, setValue] = useState(0);
  const [dataDetail, setDataDetail]: any = useState(null);
  const [dataReports, setDataReports]: any = useState(null);
  const urlParams = new URLSearchParams(window.location.search);
  const userId = urlParams.get("userId");
  const eventId = urlParams.get("eventId");

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const getUserReportById = async (userId: any, eventId: any) => {
    const res = await Manager.getUserReportById({ userId: parseInt(userId), eventId: parseInt(eventId) });
    setDataDetail(res);
    setDataReports(res?.listReportNotResolved);
  };

  console.log("datadetail", dataDetail, "data reports", dataReports);
  useEffect(() => {
    if (eventId && userId) {
      getUserReportById(userId, eventId);
    }
  }, [eventId, userId]);
  return (
    <Box sx={{ width: "100%" }}>
      <BreadcrumbsTab
        history={[{ title: "Quản lí người dùng", href: "/dashboard/manage-user" }]}
        current={{ title: "Chi tiết" }}
      />

      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Box sx={{ display: "flex", p: 1 }}>
          <AccountCircleIcon sx={{ mr: 1 }} />
          <Typography variant="h6">{dataDetail?.listReportNotResolved.userInfo?.name}</Typography>
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
            {dataReports?.map((item: any, index: number) => (
              <Grid key={index} item xs={12} md={6} lg={6}>
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
                      <Typography> &nbsp; {item?.reportDetail?.reportedName}</Typography>
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
                    <Typography variant="h6">{item?.eventTitle?.title}</Typography>
                  </Box>

                  <Typography variant="subtitle1">Lí do báo cáo xấu :</Typography>
                  <Box sx={{ display: "flex" }}>
                    <Chip label="Giả mạo" />
                    <Chip label="Lừa đảo" />
                  </Box>

                  <Typography variant="subtitle1">Nội dung báo cáo xấu : </Typography>
                  <Typography>{item?.reportDetail?.reason}</Typography>

                  <Button>Kiểm tra tính đúng đắn</Button>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6} lg={6}>
            <Card sx={{ p: 2 }}>
              <Typography variant="subtitle1">Người báo cáo xấu : Cao Duc Anh</Typography>
              <Typography variant="subtitle1">Hòm thư : anhcdhe130977@fpt.edu.vn</Typography>
              <Typography variant="subtitle1">Người quản lí : </Typography>
              <Typography variant="subtitle1">Đã thực hiện xử lí : </Typography>
              <Typography variant="subtitle1">Thời gian xử lí : </Typography>
            </Card>
          </Grid>
        </Grid>
      </TabPanel>
    </Box>
  );
};
export default ManageUserDetail;
