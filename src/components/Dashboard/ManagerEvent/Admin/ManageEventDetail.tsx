import React, { useState } from "react";
import { Box, Card, Grid, Typography, IconButton, Tooltip, DialogProps } from "@mui/material";
// import { useStyles } from "./ManageEvent.style";
import BreadcrumbsTab from "../../../Common/Breadcrumbs/Breadcrumbs";

// icon
// import HowToRegOutlinedIcon from "@mui/icons-material/HowToRegOutlined";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import FlagIcon from "@mui/icons-material/Flag";
// import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import FlagCircleIcon from "@mui/icons-material/FlagCircle";
import FactCheckOutlinedIcon from "@mui/icons-material/FactCheckOutlined";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import PermContactCalendarIcon from "@mui/icons-material/PermContactCalendar";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import { LineStatistical } from "../../HomeDashBoard/LineStatistical";
import DialogPreviewEventDetail from "./DialogPreviewEventDetail";

const ManageEventDetail = () => {
  //   const classes = useStyles();
  const [openPreview, setOpenPreview] = useState(false);
  const [scroll, setScroll] = useState<DialogProps["scroll"]>("paper");

  const handleClickOpenPreview = (scrollType: DialogProps["scroll"]) => () => {
    setOpenPreview(true);
    setScroll(scrollType);
  };
  const handleClosePreview = () => {
    setOpenPreview(false);
  };
  return (
    <Box>
      <BreadcrumbsTab
        history={[{ title: "Quản lí sự kiện ", href: "/dashboard/admin/manage-event" }]}
        current={{ title: "Chi tiết" }}
      />
      <Card sx={{ mt: 2 }}>
        <Grid container sx={{ p: 2 }}>
          {/* thong so co ban */}
          <Grid item xs={12} md={6} lg={6}>
            <Grid container>
              <Grid item xs={1.5}>
                <Typography variant="subtitle1">Tiêu đề : </Typography>
              </Grid>
              <Grid item xs={9.5}>
                <Typography>Thử nghiệm</Typography>
              </Grid>
            </Grid>

            <Grid container>
              <Grid item xs={1}>
                <AccessTimeIcon />
              </Grid>
              <Grid item xs={11}>
                <Typography variant="subtitle1">Từ 12 tháng 3 năm 2022 đến 21 tháng 4 năm 2022 </Typography>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={1}>
                <AssignmentOutlinedIcon />
              </Grid>
              <Grid item xs={5.5} sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="subtitle1">Số lượng vấn đề</Typography>
                <Typography variant="subtitle1">:</Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography> &nbsp; 182</Typography>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={1}>
                <FactCheckOutlinedIcon />
              </Grid>
              <Grid item xs={5.5} sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="subtitle1">Số lượng vấn đề hỗ trợ thành công</Typography>
                <Typography variant="subtitle1">:</Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography> &nbsp; 82</Typography>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={1}>
                <PermContactCalendarIcon />
              </Grid>
              <Grid item xs={5.5} sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="subtitle1">Số lượng người đăng kí hỗ trợ</Typography>
                <Typography variant="subtitle1">:</Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography> &nbsp; 30</Typography>
              </Grid>
            </Grid>

            <Grid container>
              <Grid item xs={1}>
                <FlagIcon />
              </Grid>
              <Grid item xs={5.5} sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="subtitle1">Số bài viết bị báo cáo xấu</Typography>
                <Typography variant="subtitle1">:</Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography> &nbsp; 1</Typography>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={1}>
                <FlagCircleIcon />
              </Grid>
              <Grid item xs={5.5} sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="subtitle1">Số người dùng bị báo cáo xấu</Typography>
                <Typography variant="subtitle1">:</Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography> &nbsp; 0</Typography>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={1}>
                <ManageAccountsIcon />
              </Grid>
              <Grid item xs={5.5} sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="subtitle1">Quản lí</Typography>
                <Typography variant="subtitle1">:</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography> &nbsp; Cao Duc Anh</Typography>
              </Grid>
            </Grid>
            <Box>
              <IconButton onClick={handleClickOpenPreview("paper")}>
                <Tooltip title="Xem chi tiết sự kiện">
                  <VisibilityIcon color="primary" />
                </Tooltip>
              </IconButton>
              <IconButton>
                <Tooltip title="Chuyển quyền quản lí">
                  <ManageAccountsIcon />
                </Tooltip>
              </IconButton>
            </Box>
            <DialogPreviewEventDetail open={openPreview} handleClose={handleClosePreview} scroll={scroll} />
          </Grid>
          {/* hien thi bieu do cas thong tin lquan su kien */}
          <Grid item xs={12} md={6} lg={6}>
            <Box sx={{ height: "auto" }}>
              <LineStatistical />
            </Box>
          </Grid>
        </Grid>
      </Card>
    </Box>
  );
};

export default ManageEventDetail;
