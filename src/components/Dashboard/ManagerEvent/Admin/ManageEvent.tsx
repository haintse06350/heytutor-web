import React, { useState } from "react";
import {
  Card,
  Grid,
  Typography,
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
import img1 from "../../../../assets/home_event_images/14.png";
import SearchIcon from "@mui/icons-material/Search";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

import DateRangePicker from "../../../ListData/DateTimePicker/DateRangePicker";
import { DateRange } from "@mui/lab/DateRangePicker";

import { useNavigate } from "react-router-dom";

const ManageEvent = () => {
  const classes = useStyles();
  const [value, setValue] = useState("1");
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [filters, setFilters]: any = useState({ status: "joined" });
  const [sortBy, setSortBy]: any = useState("deadlineTime");
  const [dateData, setDateData] = useState<DateRange<Date>>([null, null]);
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
    if (type === "status") {
      // setPostStatus(event.target.value);
    }
    if (type === "hashtag") {
      if (event.length === 0) {
        delete filters["hashtag"];
        setFilters({ ...filters });
      } else {
        const newFilter = {
          hashtag: event,
        };
        setFilters({ ...filters, ...newFilter });
      }
    } else if (type === "time") {
      if (event.target.value === "Chọn ngày") {
        delete filters["time"];
        setOpenDatePicker(true);
      } else {
        const newFilter = {
          time: event.target.value,
        };
        setFilters({ ...filters, ...newFilter });
      }
    } else {
      const newFilter = {
        status: event.target.value,
      };
      setFilters({ ...filters, ...newFilter });
    }
  };
  const timeOpts = [
    { value: "Tuần này", label: "Tuần này" },
    { value: "Tháng này", label: "Tháng này" },
    { value: "Chọn ngày", label: "Chọn ngày" },
  ];

  const sortOpts = [
    { value: "deadlineTime", label: "Thời gian của sự kiện" },
    { value: "nbOfJoined", label: "Số người tham gia" },
    { value: "nbOfReported", label: "Số báo cáo xấu" },
  ];

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
  // const navigate = useNavigate();

  // const handleOpenDetail = (item: any) => {
  //   navigate(`/dashboard/admin/manage-event/detail?${item.id}`);
  // };
  const handleCreateEvent = () => {
    navigate(`/dashboard/admin/manage-event/create-event`);
  };
  return (
    <div className={classes.wrapManageEvent}>
      <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
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
              <Grid item xs={6} md={6} sx={{ minWidth: "20%" }}>
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
                    }}
                    id="outlined-basic"
                    placeholder="Tìm kiếm..."
                    variant="outlined"
                  />
                </Box>
              </Grid>
              <Grid item xs={6} md={3} sx={{ minWidth: "20%" }}>
                <Box component="form" noValidate autoComplete="off">
                  <TextField
                    fullWidth
                    classes={{ root: classes.textField }}
                    id="outlined-select-currency"
                    select
                    label="Hiển thị theo"
                    defaultValue="Tuần này"
                    value={filters.time}
                    onChange={(e: any) => onChangeFilter(e, "time")}>
                    {timeOpts.map((option: any) => (
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
              <Grid item xs={4} md={3} sx={{ minWidth: "20%" }}>
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
                    {sortOpts.map((option: any) => (
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
                      {row.status === "Đang diễn ra" ? <Chip label="hoạt động" /> : <Chip label="đã kết thúc" />}
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
          <Grid container>
            <Grid item xs={12} md={6} lg={6}>
              <Card sx={{ p: 2 }}>
                <img src={img1} alt="img event detail" />
                <Typography variant="subtitle1">Để có một cuối kỳ thật hoàn hảo với SSG102</Typography>
                <Typography variant="subtitle1">Thời gian dự kiến : 24/3/2022 - 4/5/2022</Typography>

                <IconButton onClick={handleClickOpenPreview("paper")}>
                  <Tooltip title="Xem hiển thị">
                    <VisibilityIcon color="inherit" />
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
                <DialogPreviewEventDetail open={openPreview} handleClose={handleClosePreview} scroll={scroll} />
              </Card>
            </Grid>
          </Grid>
        </TabPanel>
      </TabContext>
    </div>
  );
};

export default ManageEvent;
