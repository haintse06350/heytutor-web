import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Button,
  Box,
  Grid,
  RadioGroup,
  FormControl,
  FormControlLabel,
  Radio,
  TextField,
} from "@mui/material";
import { LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DatePicker from "@mui/lab/DatePicker";
import moment from "moment";

const DialogEditManageCTV = (props: any) => {
  const { open, onClose, title } = props;
  const [openPickDate, setOpenPickDate] = useState(false);
  const [valueEndDate, setValueEndDate] = useState<Date | null>(moment().startOf("day").toDate());
  const [valueRadioSelected, setValueRadioSelected] = useState<String>("overTime");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (valueRadioSelected === "inTime") {
      setOpenPickDate(true);
    }
    if (valueRadioSelected === "overTime") {
      setOpenPickDate(false);
    }
    setValueRadioSelected((event.target as HTMLInputElement).value);
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Quản lí sự kiện {title}</DialogTitle>
      <DialogContent>
        <Grid container>
          <Grid item xs={4} md={4} lg={4}>
            <Typography variant="subtitle1">Thông tin cơ bản</Typography>
            <Typography>Tên: Cao Duc Anh</Typography>
            <Typography>Gmail: anhcd1@gmail.com</Typography>
            <Typography>Thêm bởi: anhcdh4</Typography>
            <Typography>Trạng thái: Hoạt động</Typography>
          </Grid>
          <Grid item xs={8} md={8} lg={8}>
            <Typography variant="subtitle1">Quản lí cộng tác viên</Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={5} lg={5}>
                <FormControl>
                  <RadioGroup
                    // defaultValue="overTime"
                    name="radio-button-type-ban"
                    value={valueRadioSelected}
                    onChange={handleChange}>
                    <FormControlLabel value="overTime" control={<Radio />} label="Khóa vô thời hạn" />
                    <FormControlLabel value="inTime" control={<Radio />} label="Khóa có thời hạn" />
                    {!openPickDate && (
                      <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                          label="Ngày kết thúc"
                          inputFormat="dd/MM/yyyy"
                          value={valueEndDate}
                          onChange={(newValue) => {
                            setValueEndDate(newValue);
                          }}
                          renderInput={(params) => <TextField {...params} sx={{ background: "#fff", width: "100%" }} />}
                        />
                      </LocalizationProvider>
                    )}
                  </RadioGroup>
                </FormControl>
              </Grid>
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

export default DialogEditManageCTV;
