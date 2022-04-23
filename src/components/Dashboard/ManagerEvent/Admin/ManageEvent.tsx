import React, { useState, useEffect } from "react";
import {
  Grid,
  Box,
  // Toolbar,
  IconButton,
  Tooltip,
  DialogProps,
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
import VisibilityIcon from "@mui/icons-material/Visibility";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import BlockIcon from "@mui/icons-material/Block";
import CommentIcon from "@mui/icons-material/Comment";
import { useStyles } from "./ManageEvent.style";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";

import TabPanel from "@mui/lab/TabPanel";
import DialogPreviewEventDetail from "./DialogPreviewEventDetail";
import SearchIcon from "@mui/icons-material/Search";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

import DateRangePicker from "../../../ListData/DateTimePicker/DateRangePicker";
import { DateRange } from "@mui/lab/DateRangePicker";

import { useNavigate } from "react-router-dom";
import { DatePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import moment from "moment";
import { Manager } from "../../../../models/manager";

const ManageEvent = () => {
  const classes = useStyles();
  const [value, setValue] = useState("1");
  const [openDatePicker, setOpenDatePicker] = useState(false);
  // const [filters, setFilters]: any = useState({ status: "joined" });
  const [sortBy, setSortBy]: any = useState("desc");
  const [dateData, setDateData] = useState<DateRange<Date>>([null, null]);
  const [visible, setVisible] = useState("deadlineTime");

  const navigate = useNavigate();

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  const [openPreview, setOpenPreview] = useState(false);
  const [scroll, setScroll] = useState<DialogProps["scroll"]>("paper");

  const handleClickOpenPreview = (scrollType: DialogProps["scroll"]) => () => {
    setOpenPreview(true);
    setScroll(scrollType);
  };
  const handleClosePreview = () => {
    setOpenPreview(false);
  };

  const onCloseDatePicker = () => {
    setOpenDatePicker(false);
    // setFinishPickDate(true);
  };

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
  const [valueFilterStartDate, setValueFilterStartDate] = useState<Date | null>(moment().subtract(7, "days").toDate());
  const [valueFilterEndDate, setValueFilterEndDate] = useState<Date | null>(moment().startOf("day").toDate());

  const [
    data = {
      selected: [],
      open: false,
      sortByOpts: [
        { value: "asc", label: "Số lượng tăng dần" },
        { value: "desc", label: "Số lượng giảm dần" },
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
  const [searchBy, setSearchBy] = React.useState("titleOfEvent");
  const onChangeSearchBy = (e: SelectChangeEvent) => {
    setSearchBy(e.target.value);
  };
  const dataFake = [
    {
      id: 1,
      title: "Sự kiện 1",
      time: "25/4/2022",
      status: "Đang diễn ra",
      nbOfJoined: "10",
      nbOfReported: "2",
      manager: "anhcd",
    },
    {
      id: 2,
      title: "Sự kiện 2",
      time: "20/10/2020",
      status: "Đã kết thúc",
      nbOfJoined: "10",
      nbOfReported: "2",
      manager: "anhcd",
    },
  ];
  const handleVisible = (event: any) => {
    setVisible(event.target.value);
    event.target.value === "status" ? setSortBy("isActive") : setSortBy("desc");
  };

  const handleCreateEvent = () => {
    navigate(`/dashboard/admin/manage-event/create-event`);
  };

  const [dataEventOfCollaborator, setDataEventOfCollaborator] = useState(null);
  const getDataEvent = async () => {
    const data = await Manager.getListEventOfCollaborator();
    setDataEventOfCollaborator(data);
  };

  useEffect(() => {
    getDataEvent();
    console.log(dataEventOfCollaborator);
  }, []);

  return (
    <div className={classes.wrapManageEvent}>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }} className={classes.btnCreateEvent}>
        <Button startIcon={<AddCircleOutlineIcon />} variant="contained" sx={{ mb: 2 }} onClick={handleCreateEvent}>
          Tạo sự kiện
        </Button>
      </Box>

      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Sự kiện đang diễn ra" value="1" />
            <Tab label="Sự kiện đăng kí" value="2" />
          </TabList>
        </Box>
        {/* thông tin CTV */}

        {/* Sự kiện đang quản lí */}
        <TabPanel value="1">
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
                    label="Sắp xếp"
                    defaultValue="Thời gian của vấn đề"
                    value={sortBy}
                    onChange={(e: any) => setSortBy(e.target.value)}>
                    {visible !== "status" &&
                      data.sortByOpts.slice(0, 2).map((option: any) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    {visible === "status" &&
                      data?.sortByOpts.slice(2, 4).map((option: any) => (
                        <MenuItem key={option.value} value={option.value} defaultValue="isActive">
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
                  <TableCell>Quản lí sự kiện</TableCell>
                  <TableCell>Trạng thái</TableCell>
                  <TableCell>Quản lí</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {dataFake.map((row: any) => (
                  <TableRow key={row} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                    <TableCell component="th" scope="row">
                      {row.id}
                    </TableCell>
                    <TableCell>
                      {row.title}
                      {row.title}
                      {row.title}
                      {row.title}
                    </TableCell>
                    <TableCell align="center">{row.time}</TableCell>
                    <TableCell align="center">{row.nbOfJoined}</TableCell>
                    <TableCell align="center">{row.nbOfReported}</TableCell>
                    <TableCell>{row.manager}</TableCell>
                    <TableCell>
                      {row.status === "Đang diễn ra" ? (
                        <Chip label="Hoạt động" color="primary" />
                      ) : (
                        <Chip label="Đã kết thúc" color="error" />
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
        </TabPanel>
        {/* Sự kiện đăng kí */}
        <TabPanel value="2">
          <Box sx={{ mb: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <Grid container item xs={12} spacing={1} sx={{ width: "100%" }}>
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
                            defaultValue="nameOfUser"
                            onChange={onChangeSearchBy}
                            inputProps={{
                              name: "departmentValue",
                              id: "departmentValue",
                            }}>
                            <MenuItem value="nameOfUser">Tên người dùng</MenuItem>
                            <MenuItem value="nameOfEvent">Tiêu đề sự kiện</MenuItem>
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
                      label="Sắp xếp"
                      defaultValue="asc"
                      value={sortBy}
                      onChange={(e: any) => setSortBy(e.target.value)}>
                      {visible !== "status" &&
                        data?.sortByOpts.slice(0, 2).map((option: any) => (
                          <MenuItem key={option.value} value={option.value} defaultValue="desc">
                            {option.label}
                          </MenuItem>
                        ))}
                      {visible === "status" &&
                        data?.sortByOpts.slice(2, 4).map((option: any) => (
                          <MenuItem key={option.value} value={option.value} defaultValue="isActive">
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
            <Grid container>
              <Grid item xs={12}>
                <TableContainer component={Paper}>
                  <Table aria-label="ctv table">
                    <TableHead>
                      <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Tiêu đề</TableCell>
                        <TableCell>Thời gian</TableCell>
                        <TableCell>Quản lí bởi</TableCell>
                        <TableCell>Quản lí</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      <TableRow>
                        <TableCell>1</TableCell>
                        <TableCell>Để có một cuối kỳ thật hoàn hảo với SSG102</TableCell>
                        <TableCell>24/3/2022</TableCell>
                        <TableCell>anhcd</TableCell>
                        <TableCell>
                          <IconButton onClick={handleClickOpenPreview("paper")}>
                            <Tooltip title="Xem hiển thị">
                              <VisibilityIcon color="primary" />
                            </Tooltip>
                          </IconButton>
                          <IconButton>
                            <Tooltip title="Phê duyệt">
                              <CheckCircleIcon color="success" />
                            </Tooltip>
                          </IconButton>
                          <IconButton>
                            <Tooltip title="Từ chối">
                              <BlockIcon color="error" />
                            </Tooltip>
                          </IconButton>
                          <IconButton>
                            <Tooltip title="Bình luận">
                              <CommentIcon sx={{ color: "blue" }} />
                            </Tooltip>
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                    <DialogPreviewEventDetail open={openPreview} handleClose={handleClosePreview} scroll={scroll} />
                  </Table>
                </TableContainer>
              </Grid>
            </Grid>
          </Box>
        </TabPanel>
      </TabContext>
    </div>
  );
};

export default ManageEvent;
