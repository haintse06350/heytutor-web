import React from "react";
import { Dialog, DialogTitle, Grid, Button, Typography, DialogActions } from "@mui/material";
const JoinEvent = (props: any) => {
  const { onClose, open, data } = props;

  const handleClickClose = () => {
    onClose(onClose);
  };
  return (
    <Dialog open={open} maxWidth="md" fullWidth>
      <Grid sx={{ p: 2 }}>
        <DialogTitle>Bạn có chắc mình tham gia đúng sự kiện</DialogTitle>

        <Typography>Tiêu đề : {data?.title}</Typography>
      </Grid>

      <DialogActions>
        <Button onClick={handleClickClose} sx={{ color: "#94a4c4" }}>
          Hủy bỏ
        </Button>
        <Button variant="contained" onClick={handleClickClose}>
          Đồng ý
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default JoinEvent;
