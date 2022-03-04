import * as React from "react";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { DialogContent, DialogContentText } from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import { useStyles } from "./AddRoleUser.style";

export default function AddRoleUser() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className= {classes.title}>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open dialog
      </Button>
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle>Mời người dùng làm quản trị viên</DialogTitle>
        <DialogContent>
          <DialogContentText>Nếu người dùng chấp nhận lời mời, anh ấy sẽ có thể gỡ bài viết và bình luận, tạo event, quản lý bài viết cũng như làm nhiều việc khác.</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="text">Hủy</Button>
          <Button variant="contained">Xác nhận</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
