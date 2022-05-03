import React from "react";
import { Dialog, DialogTitle, DialogContent, Typography, Button, Box, Grid, Checkbox } from "@mui/material";
import { NotificationCtx } from "../../../context/notification/state";
import { Manager } from "../../../models/manager";

const DialogEditManageCTV = (props: any) => {
  const { open, onClose, data, managerName, getListCollaborator } = props;
  const { setNotificationSuccess, setNotificationError } = React.useContext(NotificationCtx);
  const [checked, setChecked] = React.useState(false);
  const onBanCollaborator = async (collaboratorid: any) => {
    const res = await Manager.createBanCollaborator(collaboratorid);
    if (res.status === 200) {
      setNotificationSuccess("Khóa tài khoản thành công");
      onClose();
      getListCollaborator();
    } else if (res.status === 403) {
      setNotificationError("Khóa tài khoản thất bại");
    }
  };
  const handleChange = () => {
    setChecked(!checked);
  };
  console.log(data);
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Quản lí cộng tác viên</DialogTitle>
      <DialogContent>
        <Grid container>
          <Grid item xs={4} md={4} lg={4}>
            <Typography variant="subtitle1">Thông tin cơ bản</Typography>
            <Typography>Tên: {data?.name}</Typography>
            <Typography>Gmail: {data?.email}</Typography>
            <Typography>Thêm bởi: {managerName}</Typography>
            <Typography>Trạng thái: {data?.isActive === 1 ? "Hoạt động" : "Đã khóa"} </Typography>
          </Grid>
          <Grid item xs={8} md={8} lg={8}>
            <Typography variant="subtitle1">Quản lí cộng tác viên</Typography>

            <Box display="flex">
              <Checkbox checked={checked} onChange={handleChange} inputProps={{ "aria-label": "controlled" }} />
              <Typography color="error">
                Tài khoản này sẽ bị khóa vĩnh viễn cho đến khi mở lại bạn chắc chắn khóa tài khoản này chứ?
              </Typography>
            </Box>
          </Grid>
        </Grid>
        <Box sx={{ float: "right" }}>
          <Button sx={{ color: "#94a4c4" }} onClick={onClose}>
            Trở lại
          </Button>
          <Button disabled={!checked} onClick={() => onBanCollaborator(data?.id)}>
            Khóa tài khoản
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default DialogEditManageCTV;
