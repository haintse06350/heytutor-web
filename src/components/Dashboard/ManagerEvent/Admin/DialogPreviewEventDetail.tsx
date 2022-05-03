import React, { useContext } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";
import img1 from "../../../../assets/home_event_images/14.png";
import moment from "moment";
import { UserCtx } from "../../../../context/user/state";
import { Manager } from "../../../../models/manager";
import { NotificationCtx } from "../../../../context/notification/state";

const DialogPreviewEventDetail = (props: any) => {
  const { open, handleClose, data } = props;
  const { user } = useContext(UserCtx);
  const { setNotificationSuccess, setNotificationError } = useContext(NotificationCtx);
  console.log(data, "data", open, "open");

  const onApproveEvent = async (eventId: any) => {
    const res = await Manager.approveEvent(eventId);
    if (res) {
      setNotificationSuccess("Duyệt bài thành công");
      handleClose();
    } else {
      setNotificationError("Duyệt bài thất bại");
    }
  };
  const descriptionElementRef = React.useRef<HTMLElement>(null);
  React.useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);
  return (
    <Dialog open={open} onClose={handleClose} maxWidth="lg">
      <DialogTitle id="scroll-dialog-title">{data?.title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="scroll-dialog-description" ref={descriptionElementRef} tabIndex={-1}>
          <img src={img1} alt="img1" />
          <Typography variant="subtitle1">
            Thời gian từ {moment(data?.startAt).format("MMM Do YYYY")} đến {moment(data?.endAt).format("MMM Do YYYY")}
          </Typography>
          <Typography variant="h5" > {data?.title} </Typography>
          <Typography variant="body1">{data?.description}</Typography>
          <Typography variant="body1">{data?.content}</Typography>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button sx={{ color: "#94a4c4" }} onClick={handleClose}>
          Trở lại
        </Button>
        {user.role.includes("admin") && (
          <>
            <Button onClick={handleClose} color="error">
              Từ chối{" "}
            </Button>
            <Button onClick={() => onApproveEvent(data?.id)} color="primary">
              Phê duyệt
            </Button>
          </>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default DialogPreviewEventDetail;
