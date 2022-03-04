import * as React from "react";
import Button from "@mui/material/Button";
import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import { Box } from "@mui/system";
import Switch from "@mui/material/Switch";
import { DialogContentText, MenuItem } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import DialogActions from "@mui/material/DialogActions";
import { useStyles } from "./LimitActivity.style";

export default function LimitDialog() {
  const classes = useStyles();
  const [postNumber, setPostNumber] = React.useState("2");
  const [limitTimePost, setTimeLimitPost] = React.useState("6 hours");
  const [limitTimeComment, setTimeLimitComment] = React.useState("6 hours");
  const [commentNumber, setCommentNumber] = React.useState("2");
  const [open, setOpen] = React.useState(false);

  const handlePostNumberChange = (event: any) => {
    setPostNumber(event.target.value);
  };

  const handleCommentNumberChange = (event: any) => {
    setCommentNumber(event.target.value);
  };

  const handleTimeLimitChangeComment = (event: any) => {
    setTimeLimitPost(event.target.value);
  };

  const handleTimeLimitChangePost = (event: any) => {
    setTimeLimitComment(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const label = { inputProps: { "aria-label": "Switch demo" } };

  return (
    <div >
      <Button variant="outlined" onClick={handleClickOpen}>
        Open dialog
      </Button>
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle>Giới hạn hoạt động của người dùng</DialogTitle>
        <DialogContentText>
          Chức năng này dùng để giới hạn số lượng bài đăng và bình luận của người dùng.
        </DialogContentText>
        <Box>
          <div className={classes.title}>
            <h2 className={classes.leftText}>Giới hạn đăng bài</h2>
            <div className={classes.switchButton}><Switch {...label} /></div>
          </div>
          <div>
            <FormControl sx={{ mt: 1 }}>
              <InputLabel htmlFor="numberOfPost"></InputLabel>
              <Select
                autoFocus
                value={postNumber}
                onChange={handlePostNumberChange}
                inputProps={{
                  name: "numberOfPost",
                  id: "numberOfPost",
                }}>
                <MenuItem value="1">1</MenuItem>
                <MenuItem value="2">2</MenuItem>
                <MenuItem value="3">3</MenuItem>
                <MenuItem value="4">4</MenuItem>
                <MenuItem value="5">5</MenuItem>
                <MenuItem value="6">6</MenuItem>
              </Select>
            </FormControl>
            <p>bài đăng trong 1 ngày</p>
          </div>

          <div>
            <h2>Hết hạn trong</h2>
          </div>
          <FormControl sx={{ mt: 1 }}>
            <InputLabel htmlFor="timeLimitForPost"></InputLabel>
            <Select
              autoFocus
              value={limitTimePost}
              onChange={handleTimeLimitChangePost}
              inputProps={{
                name: "timeLimitForPost",
                id: "timeLimitForPost",
              }}>
              <MenuItem value="6 hours">6 giờ</MenuItem>
              <MenuItem value="8 hours">8 giờ</MenuItem>
              <MenuItem value="10 hours">10 giờ</MenuItem>
              <MenuItem value="12 hours">12 giờ</MenuItem>
              <MenuItem value="14 hours">14 giờ</MenuItem>
              <MenuItem value="16 hours">16 giờ</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Box>
          <div>
            <h2>Giới hạn đăng bình luận</h2>
            <Switch {...label} />
          </div>
          <div>
            <FormControl sx={{ mt: 1 }}>
              <InputLabel htmlFor="numberOfComment"></InputLabel>
              <Select
                autoFocus
                value={commentNumber}
                onChange={handleCommentNumberChange}
                inputProps={{
                  name: "numberOfComment",
                  id: "numberOfComment",
                }}>
                <MenuItem value="1">1</MenuItem>
                <MenuItem value="5">5</MenuItem>
                <MenuItem value="10">10</MenuItem>
                <MenuItem value="15">15</MenuItem>
                <MenuItem value="20">20</MenuItem>
                <MenuItem value="25">25</MenuItem>
              </Select>
            </FormControl>
            <p>bình luận trong 1 giờ</p>
          </div>

          <div>
            <h2>Hết hạn trong</h2>
          </div>
          <FormControl sx={{ mt: 1 }}>
            <InputLabel htmlFor="timeLimitForComment"></InputLabel>
            <Select
              autoFocus
              value={limitTimeComment}
              onChange={handleTimeLimitChangeComment}
              inputProps={{
                name: "timeLimitForComment",
                id: "timeLimitForComment",
              }}>
              <MenuItem value="6 hours">6 giờ</MenuItem>
              <MenuItem value="8 hours">8 giờ</MenuItem>
              <MenuItem value="10 hours">10 giờ</MenuItem>
              <MenuItem value="12 hours">12 giờ</MenuItem>
              <MenuItem value="14 hours">14 giờ</MenuItem>
              <MenuItem value="16 hours">16 giờ</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <DialogActions>
          <Button variant="text">Hủy</Button>
          <Button variant="contained">Lưu</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
