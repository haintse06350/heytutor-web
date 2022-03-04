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
import { useStyles } from "./BanUser.style";

export default function BanUser() {
  const classes = useStyles();
  const [limitTime, setTimeLimit] = React.useState("6 hours");
  const [open, setOpen] = React.useState(false);

  const handleTimeLimitChange = (event: any) => {
    setTimeLimit(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const label = { inputProps: { "aria-label": "Switch demo" } };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open dialog
      </Button>
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle>Giới hạn người dùng</DialogTitle>
        <DialogContentText>Chức năng này dùng để giới hạn người dùng khỏi hệ thống.</DialogContentText>
        <Box>
          <div className={classes.title}>
            <h2 className={classes.leftText}>Thời gian giới hạn</h2>
            <div className={classes.switchButton}>
              <Switch {...label} />
            </div>
          </div>
          <FormControl sx={{ mt: 1 }}>
            <InputLabel htmlFor="timeLimitForUser"></InputLabel>
            <Select
              autoFocus
              value={limitTime}
              onChange={handleTimeLimitChange}
              inputProps={{
                name: "timeLimitForUser",
                id: "timeLimitForUser",
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
