import React from "react";
import { Dialog, DialogTitle, DialogContent, Typography, Button, Box, Grid } from "@mui/material";
const ManagePostReportDetail = (props: any) => {
  const { open, onClose, data } = props;
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Quản lí sự kiện</DialogTitle>
      <DialogContent>
        <Grid container>
          <Grid item xs={4} md={4} lg={4}>
            <Typography variant="subtitle1">Thông tin cơ bản</Typography>
            <Typography>Số bài đăng kí ghim: {data?.name}</Typography>
            <Typography>Gmail: {data?.email}</Typography>
            <Typography>Thêm bởi: {data?.updatedBy}</Typography>
            <Typography>Trạng thái: {data?.isActive === 1 ? "Hoạt động" : "Đã khóa"} </Typography>
          </Grid>
          <Grid item xs={8} md={8} lg={8}>
            <Typography variant="subtitle1">Quản lí cộng tác viên</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={5} lg={5}></Grid>
            </Grid>
          </Grid>
        </Grid>
        <Box sx={{ float: "right" }}>
          <Button sx={{ color: "#94a4c4" }} onClick={onClose}>
            Trở lại
          </Button>
          <Button>Khóa tài khoản</Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default ManagePostReportDetail;
