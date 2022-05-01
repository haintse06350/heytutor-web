import React, { useContext } from "react";
import { Dialog, DialogTitle, Grid, Button, Typography, DialogActions } from "@mui/material";
import { Event } from "../../models/event";
import { useNavigate } from "react-router-dom";
import { NotificationCtx } from "../../context/notification/state";

const JoinEvent = (props: any) => {
  const { onClose, open, data } = props;
  const { setNotificationSuccess, setNotificationError } = useContext(NotificationCtx);

  const navigate = useNavigate();
  const handleClickClose = () => {
    onClose(onClose);
  };

  const onJoinEvent = async (eventId: number) => {
    const res = await Event.joinEvent(eventId);
    if (res.status === 200) {
      setNotificationSuccess("Tham gia sự kiện thành công");
      navigate(`/event-detail?eventid=${eventId}`);
    } else {
      setNotificationError("Tham gia sự kiện thất bại");
    }
  };

  return (
    <Dialog open={open} maxWidth="md" fullWidth>
      <Grid sx={{ p: 2 }}>
        <DialogTitle>Bạn có chắc mình tham gia đúng sự kiện</DialogTitle>
        <Typography variant="subtitle1">Tiêu đề : </Typography>
        <Typography> {data?.title}</Typography>
        <Typography variant="subtitle1">Mô tả sự kiện : </Typography>
        <Typography> {data?.description}</Typography>
      </Grid>

      <DialogActions>
        <Button onClick={handleClickClose} sx={{ color: "#94a4c4" }}>
          Hủy bỏ
        </Button>
        <Button variant="contained" onClick={() => onJoinEvent(data?.id)}>
          Đồng ý
        </Button>
      </DialogActions>
    </Dialog>
  );
};
export default JoinEvent;
