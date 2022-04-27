import React, { useState, useEffect } from "react";
import {
  Grid,
  Box,
  // Toolbar,
  IconButton,
  Tooltip,
  // Button,
  TextField,
  InputAdornment,
  MenuItem,
  Popover,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Chip,
  Select,
  SelectChangeEvent,
} from "@mui/material";
//icon

import BorderColorIcon from "@mui/icons-material/BorderColor";
import { useStyles } from "./ManageEvent.style";
import SearchIcon from "@mui/icons-material/Search";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

import DateRangePicker from "../../../ListData/DateTimePicker/DateRangePicker";
import { DateRange } from "@mui/lab/DateRangePicker";

import { useNavigate } from "react-router-dom";
import { DatePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import moment from "moment";
import { Manager } from "../../../../models/manager";
import { Event } from "../../../../models/event";

const ManageEvent = () => {
  const classes = useStyles();
  const [openDatePicker, setOpenDatePicker] = useState(false);
  // const [filters, setFilters]: any = useState({ status: "joined" });
  const [status, setStatus]: any = useState("all");
  const [events, setEvents]: any = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const [dateData, setDateData] = useState<DateRange<Date>>([null, null]);
  const [visible, setVisible] = useState("deadlineTime");
  const [valueFilterStartDate, setValueFilterStartDate] = useState<Date | null>(moment().subtract(7, "days").toDate());
  const [valueFilterEndDate, setValueFilterEndDate] = useState<Date | null>(moment().startOf("day").toDate());
  const [searchBy, setSearchBy] = React.useState("titleOfEvent");
  const [dataEventOfCollaborator, setDataEventOfCollaborator] = useState(null);
  const [rows, setRows]: any = useState(null);

  const onCloseDatePicker = () => {
    setOpenDatePicker(false);
    // setFinishPickDate(true);
  };

  const [
    data = {
      selected: [],
      open: false,
      eventStatus: [
        { value: "all", label: "Tất cả" },
        { value: "isActive", label: "Đang diễn ra" },
        { value: "isPending", label: "Đang chờ duyệt" },
      ],
      sortOpts: [
        { value: "deadlineTime", label: "Thời gian của sự kiện" },
        { value: "nbOfJoined", label: "Số người tham gia" },
        { value: "nbOfReported", label: "Số báo cáo xấu" },
      ],
      timeOpts: [
        { value: "currentWeek", label: "Tuần này" },
        { value: "currentMonth", label: "Tháng này" },
      ],
    },
  ]: // setData,
  any = useState();

  const onChangeFilter = (event: any, type: string) => {
    if (type === "time") {
      if (event.target.value === "currentWeek") {
        setValueFilterStartDate(moment().subtract(7, "days").toDate());
        setValueFilterEndDate(moment().startOf("day").toDate());
      } else if (event.target.value === "currentMonth") {
        setValueFilterStartDate(moment().subtract(1, "months").toDate());
        setValueFilterEndDate(moment().startOf("day").toDate());
      }
    }
  };
  const onChangeSearchBy = (e: SelectChangeEvent) => {
    setSearchBy(e.target.value);
  };
  const handleVisible = (event: any) => {
    setVisible(event.target.value);
  };

  const handleCreateEvent = () => {
    navigate(`/dashboard/admin/create-event`);
  };

  const getDataEvent = async () => {
    const data = await Manager.getListEventOfCollaborator();
    setDataEventOfCollaborator(data);
    setRows(data);
  };
  console.log(rows, "rows");
  console.log(dataEventOfCollaborator);

  useEffect(() => {
    getDataEvent();
  }, []);

  useEffect(() => {
    Event.getListEventByAdmin().then((res) => {
      setEvents(res);
    });
  }, []);

  useEffect(() => {
    if (searchQuery) {
      console.log("searchQuery", searchQuery);
    }
  }, [searchQuery]);

  return (
    <div className={classes.wrapManageEvent}>
      <Box display="flex" alignItems="center" justifyContent="flex-end" sx={{ mb: 2 }}>
        <Button startIcon={<AddCircleOutlineIcon />} variant="contained" onClick={handleCreateEvent}>
          Tạo sự kiện
        </Button>
      </Box>
      {/* thông tin CTV */}

      {/* Sự kiện đang quản lí */}
      <Box sx={{ display: "flex" }}>
        <Grid container item xs={12} spacing={1} sx={{ mb: 2, width: "100%" }}>
          <Grid item xs={12} lg={4} md={4}>
            <Box component="form" noValidate autoComplete="off">
              <TextField
                fullWidth
                classes={{ root: classes.textField }}
                id="outlined-select-currency"
                select
                label="Thời gian"
                defaultValue="currentWeek"
                // value={filters.time}
                onChange={(e: any) => onChangeFilter(e, "time")}>
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
                onChange={(e: any) => setSearchQuery(e.target.value)}
                classes={{ root: classes.textField }}
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <Select
                      className={classes.select}
                      value={searchBy}
                      defaultValue="titleOfEvent"
                      onChange={onChangeSearchBy}
                      inputProps={{
                        name: "departmentValue",
                        id: "departmentValue",
                      }}>
                      <MenuItem value="titleOfEvent">Tiêu đề</MenuItem>
                      <MenuItem value="nameOfCTV">Quản lí sự kiện</MenuItem>
                    </Select>
                  ),
                }}
                id="outlined-basic"
                placeholder="Tìm kiếm ..."
                variant="outlined"
              />
            </Box>
          </Grid>
          <Grid item xs={6} md={4} sx={{ minWidth: "20%" }}>
            <Box component="form" noValidate autoComplete="off">
              <TextField
                fullWidth
                classes={{ root: classes.textField }}
                id="outlined-select-currency"
                select
                label="Hiển thị theo"
                defaultValue="isNotResolve"
                value={visible}
                onChange={(event) => handleVisible(event)}>
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
                classes={{ root: classes.textField }}
                id="outlined-select-currency"
                select
                label="Trạng thái"
                defaultValue="all"
                value={status}
                onChange={(e: any) => setStatus(e.target.value)}>
                {data?.eventStatus.map((option: any) => (
                  <MenuItem key={option.value} value={option.value} defaultValue="all">
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

      {/* title / time-deadline / nbOfJoined / nbOfReported / manager */}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Tiêu đề</TableCell>
              <TableCell>Thời gian hết hạn</TableCell>
              <TableCell>Số người tham gia</TableCell>
              <TableCell>Số báo cáo xấu</TableCell>
              <TableCell>Trạng thái</TableCell>
              <TableCell>Quản lí</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {events?.map((row: any) => (
              <TableRow key={row} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell>{row.title}</TableCell>
                <TableCell align="center">{row.endAt}</TableCell>
                <TableCell align="center">{Math.floor(Math.random() * 100)}</TableCell>
                <TableCell align="center">{row.isApproved ? Math.floor(Math.random() * 10) : 0}</TableCell>
                <TableCell>
                  {row.isApproved ? (
                    <Chip label="Đang diễn ra" color="primary" />
                  ) : (
                    <Chip label="Đang đợi duyệt" color="info" />
                  )}
                </TableCell>
                <TableCell>
                  <Tooltip title="Quản lí trạng thái">
                    <IconButton aria-label="Xem chi tiết">
                      <BorderColorIcon color="error" />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ManageEvent;
