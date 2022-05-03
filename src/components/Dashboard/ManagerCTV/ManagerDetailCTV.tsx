import React, { useState, useEffect } from "react";
import { Card, Grid, Typography, Box, Divider, LinearProgress, LinearProgressProps } from "@mui/material";
//icon
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
// help
// import moment from "moment";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import BreadcrumbsTab from "../../Common/Breadcrumbs/Breadcrumbs";
// import Visibility from "@mui/icons-material/Visibility";
// import { useNavigate } from "react-router-dom";
import { Manager } from "../../../models/manager";
import moment from "moment";

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
  // const navigate = useNavigate();
  const [collaboratorDetail, setCollaboratorDetail]: any = useState(null);
  const urlParams = new URLSearchParams(window.location.search);
  const userId = urlParams.get("id");

  const getListCollaboratorDetailById = async () => {
    const res = await Manager.getCollaboratorById(userId);
    setCollaboratorDetail(res);
  };
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  console.log(collaboratorDetail);
  useEffect(() => {
    getListCollaboratorDetailById();
  }, []);
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
                      <Typography> &nbsp; {collaboratorDetail?.name}</Typography>
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
                      <Typography>&nbsp; {collaboratorDetail?.adminAddedName}</Typography>
                    </Grid>
                  </Grid>
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
                      <Typography>&nbsp;{collaboratorDetail?.name || "Chưa cập nhật"} </Typography>
                    </Grid>
                    <Grid item xs={6} md={3} lg={3} sx={{ display: "flex", justifyContent: "space-between" }}>
                      <Typography variant="subtitle1">Địa chỉ </Typography>
                      <Typography variant="subtitle1">:</Typography>
                    </Grid>
                    <Grid item xs={6} md={9} lg={9}>
                      <Typography>&nbsp;{collaboratorDetail?.address || "Chưa cập nhật"} </Typography>
                    </Grid>
                    <Grid item xs={6} md={3} lg={3} sx={{ display: "flex", justifyContent: "space-between" }}>
                      <Typography variant="subtitle1">Số điện thoại</Typography>
                      <Typography variant="subtitle1">:</Typography>
                    </Grid>
                    <Grid item xs={6} md={9} lg={9}>
                      <Typography>&nbsp;{collaboratorDetail?.phone || "Chưa cập nhật"} </Typography>
                    </Grid>
                    <Grid item xs={6} md={3} lg={3} sx={{ display: "flex", justifyContent: "space-between" }}>
                      <Typography variant="subtitle1">Hòm thư</Typography>
                      <Typography variant="subtitle1">:</Typography>
                    </Grid>
                    <Grid item xs={6} md={9} lg={9}>
                      <Typography>&nbsp;{collaboratorDetail?.email || "Chưa cập nhật"} </Typography>
                    </Grid>
                    <Grid item xs={6} md={3} lg={3} sx={{ display: "flex", justifyContent: "space-between" }}>
                      <Typography variant="subtitle1">Facebook</Typography>
                      <Typography variant="subtitle1">:</Typography>
                    </Grid>
                    <Grid item xs={6} md={9} lg={9}>
                      <Typography>&nbsp;{collaboratorDetail?.facebook || "Chưa cập nhật"}</Typography>
                    </Grid>
                  </Grid>
                </Card>
                <Card sx={{ p: 2, mb: 2 }}>
                  <Typography>Lịch sử hoạt động</Typography>
                  <Divider />

                  <Grid container sx={{ p: 2 }}>
                    <Grid item xs={6} md={4} lg={4}>
                      <Typography variant="subtitle1">
                        {moment(collaboratorDetail?.createdAt).format("DD/MM/YYYY")} - Hiện tại
                      </Typography>
                      <Typography variant="body2">Cộng tác viên</Typography>
                    </Grid>
                    <Grid item xs={6} md={8} lg={8}>
                      <Typography>&nbsp;{collaboratorDetail?.adminAddedName} đã thêm làm cộng tác viên</Typography>
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
