import * as React from "react";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { Box, DialogContent, DialogContentText, TextField } from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import { useStyles } from "./RemoveComment.style";

export default function RemoveComment() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open dialog
      </Button>
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle>Gỡ bình luận</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Chức năng này dùng để gỡ bình luận của người dùng này khỏi hệ thống.
          </DialogContentText>
          <h3>Ghi chú khác của quản trị viên (không bắt buộc)</h3>
          <Box
            className={classes.title}
            sx={{
              width: 500,
              maxWidth: "100%",
            }}>
            <TextField fullWidth  id="outlined-multiline-static" multiline rows={4} placeholder="Viết ghi chú..." />{" "}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button variant="text">Hủy</Button>
          <Button variant="contained">Xóa/Gỡ, bỏ</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
