import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  Typography,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Grid,
  Button,
} from "@mui/material";
const JoinEvent = (props: any) => {
  const { onClose, open } = props;
  const [rollUser, setRollUser] = useState("1");
  const handleChange = (event: SelectChangeEvent) => {
    setRollUser(event.target.value as string);
  };
  const handleClickClose = () => {
    onClose(onClose);
  };
  return (
    <Dialog open={open} onClose={handleClickClose}>
      <Grid sx={{ p: 2 }}>
        <DialogTitle>Đăng ký tham gia sự kiện</DialogTitle>
        <Typography variant="h5"></Typography>
        <InputLabel id="select-roll">Vai trò tham gia</InputLabel>
        <Select labelId="select-roll" id="demo-simple-select" value={rollUser} label="rollUser" onChange={handleChange}>
          <MenuItem value={1}>Tham gia hỗ trợ</MenuItem>
          <MenuItem value={2}>Tham gia cần hỗ trợ</MenuItem>
        </Select>
      </Grid>
      <Button onClick={handleClickClose} variant="contained" sx={{ m: 2 }}>
        Đăng kí
      </Button>
    </Dialog>
  );
};

export default JoinEvent;
