import React, { useState } from "react";
import {
  Grid,
  // Typography,
  Box,
  Button,
  TextField,
  MenuItem,
  InputAdornment,
  Popover,
} from "@mui/material";
// import SearchIcon from "@mui/icons-material/Search";
import { useStyles } from "./ManagePost.style";

// icon
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

import SearchIcon from "@mui/icons-material/Search";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DatePicker from "@mui/lab/DatePicker";
import DateRangePicker from "../../ListData/DateTimePicker/DateRangePicker";
import { DateRange } from "@mui/lab/DateRangePicker";

const ManagePost = () => {
  const classes = useStyles();
  const [value, setValue] = useState("1");
  const [valueFilterStartDate, setValueFilterStartDate] = useState<Date | null>(null);
  const [valueFilterEndDate, setValueFilterEndDate] = useState<Date | null>(null);
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [visible, setVisible] = useState("");
  const [sortBy, setSortBy]: any = useState("");
  const [dateData, setDateData] = useState<DateRange<Date>>([null, null]);

  const [
    data = {
      selected: [],
      open: false,
      sortByOpts: [
        { value: "asc", label: "Tăng dần" },
        { value: "desc", label: "Giảm dần" },
      ],
      sortOpts: [
        { value: "isNotResolve", label: "Báo cáo xấu chưa giải quyết" },
        { value: "reviewRegisterPoint", label: "Xếp hạng yêu cầu hỗ trợ" },
        { value: "reviewRequesterPoint", label: "Xếp hạng hỗ trợ" },
        { value: "generalEvent", label: "Chung sự kiện" },
      ],
      timeOpts: [
        { value: "currentWeek", label: "Tuần này" },
        { value: "currentMonth", label: "Tháng này" },
        { value: "selectTime", label: "Chọn ngày" },
      ],
    },
  ]: // setData,
  any = useState();

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const onCloseDatePicker = () => {
    setOpenDatePicker(false);
    // setFinishPickDate(true);
  };

  const renderTabPanel = () => {
    return (
      <Box>
        <Grid container spacing={2} sx={{ mt: 2, width: "100%" }}>
          <Grid item xs={12} lg={4} md={4}>
            <Box component="form" noValidate autoComplete="off">
              <TextField
                fullWidth
                id="outlined-select-currency"
                select
                label="Thời gian"
                defaultValue="currentWeek"
                // value={filters.time}
                // onChange={(e: any) => onChangeFilter(e, "time")}
              >
                {data.timeOpts.map((option: any) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
          </Grid>
          <Grid item xs={12} lg={4} md={4}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Ngày bắt đầu"
                inputFormat="dd/MM/yyyy"
                value={valueFilterStartDate}
                onChange={(newValue) => {
                  setValueFilterStartDate(newValue);
                }}
                renderInput={(params) => <TextField {...params} sx={{ background: "#fff", width: "100%" }} />}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={12} lg={4} md={4}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Ngày kết thúc"
                inputFormat="dd/MM/yyyy"
                value={valueFilterEndDate}
                onChange={(newValue) => {
                  setValueFilterEndDate(newValue);
                }}
                renderInput={(params) => <TextField {...params} sx={{ background: "#fff", width: "100%" }} />}
              />
            </LocalizationProvider>
          </Grid>

          <Grid item xs={6} md={4} sx={{ minWidth: "20%" }}>
            <Box component="form" noValidate autoComplete="off">
              <TextField
                autoFocus
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
                id="outlined-basic"
                placeholder="Tìm kiếm..."
                variant="outlined"
              />
            </Box>
          </Grid>
          <Grid item xs={6} md={4} sx={{ minWidth: "20%" }}>
            <Box component="form" noValidate autoComplete="off">
              <TextField
                fullWidth
                id="outlined-select-currency"
                select
                label="Hiển thị theo"
                defaultValue="isNotResolve"
                value={visible}
                onChange={(e: any) => setVisible(e.target.value)}>
                {data.sortOpts.map((option: any) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
          </Grid>
          <Grid item xs={4} md={4} sx={{ minWidth: "20%" }}>
            <Box component="form" noValidate autoComplete="off">
              <TextField
                fullWidth
                id="outlined-select-currency"
                select
                label="Sắp xếp"
                defaultValue="desc"
                value={sortBy}
                onChange={(e: any) => setSortBy(e.target.value)}>
                {data.sortByOpts.map((option: any) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
            <Popover
              open={openDatePicker}
              onClose={onCloseDatePicker}
              anchorOrigin={{ vertical: "center", horizontal: "center" }}
              transformOrigin={{ vertical: "center", horizontal: "center" }}>
              <DateRangePicker setValue={setDateData} value={dateData} />
            </Popover>
          </Grid>
        </Grid>
      </Box>
    );
  };

  return (
    <>
      {/* header */}
      <Grid container item sx={{ mb: 2 }} className={classes.btnCreatePost}>
        <Button startIcon={<AddCircleOutlineIcon />} variant="contained">
          Tạo bài viết
        </Button>
      </Grid>
      {/* icon header */}
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Đăng kí ghim" value="1" />
            <Tab label="Bị báo cáo" value="2" />
            <Tab label="Đã hạn chế" value="3" />
            <Tab label="Chưa có đăng kí" value="4" />
          </TabList>
        </Box>
        {/* thông tin CTV */}
        {/* Sự kiện đang quản lí */}
        <TabPanel value="1">{renderTabPanel()}</TabPanel>
        <TabPanel value="2">Item Two</TabPanel>
        <TabPanel value="3">Item Three</TabPanel>
      </TabContext>
    </>
  );
};

export default ManagePost;
