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
  Button,
  TextField,
  InputAdornment,
  MenuItem,
  Popover,
} from "@mui/material";
//icon
// import EventNoteIcon from "@mui/icons-material/EventNote";
// import { LineStatistical } from "../../HomeDashBoard/LineStatistical";
import HowToRegOutlinedIcon from "@mui/icons-material/HowToRegOutlined";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import EditIcon from "@mui/icons-material/Edit";
import FlagIcon from "@mui/icons-material/Flag";
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

  function data(id: number, title: string, dateTime: string, joined: number, reported: number, managerCurrent: string) {
    return {
      id,
      title,
      dateTime,
      joined,
      reported,
      managerCurrent,
    };
  }

  const data1 = [
    data(1, "Thử nghiệm", "12/12/2020", 212, 1, "Cao Duc Anh"),
    data(2, "Thử nghiệm Thử nghiệm Thử nghiệm Thử nghiệm Thử nghiệm", "12/12/2020", 120, 12, "Nguyen Van A"),
    data(3, "Thử nghiệm", "12/12/2020", 134, 2, "Le Thi B"),
    data(4, "Thử  nghiệmnghiệmnghiệmnghiệm nghiệmnghiệm nghiệm nghiệm", "12/12/2020", 0, 0, "Le Huy Chuong"),
  ];
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
  const navigate = useNavigate();

  const handleOpenDetail = (item: any) => {
    navigate(`/dashboard/admin/manage-event/detail?${item.id}`);
  };
  return (
    <div className={classes.wrapManageEvent}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList
            onChange={handleChange}
            aria-label="lab API tabs example"
            sx={{ backgroundColor: "#fff", borderRadius: "8px" }}>
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

          <Grid container spacing={2}>
            {data1.map((item, index) => (
              <Grid item xs={12} md={6} lg={6} key={index}>
                <Card sx={{ p: 2 }}>
                  {/* title sự kiện đagn quản lí */}

                  <Grid container>
                    <Grid item xs={2}>
                      <Typography variant="subtitle1">Tiêu đề : </Typography>
                    </Grid>
                    <Grid item xs={9}>
                      <Typography
                        noWrap
                        onClick={() => handleOpenDetail(item)}
                        sx={{ textDecoration: "underline", cursor: "pointer" }}>
                        {item.title}
                      </Typography>
                    </Grid>
                    <Grid item xs={1}>
                      <div className={classes.newMessage}>{index === 3 && <i className={classes.blink}></i>}</div>
                    </Grid>
                  </Grid>
                  <Grid container>
                    <Grid item xs={1}>
                      <AccessTimeIcon />
                    </Grid>
                    <Grid item xs={11}>
                      <Typography variant="subtitle1">Từ 12 tháng 3 năm 2022 đến 21 tháng 4 năm 2022 </Typography>
                    </Grid>
                  </Grid>
                  <Grid container>
                    <Grid item xs={1}>
                      <HowToRegOutlinedIcon />
                    </Grid>
                    <Grid item xs={5} sx={{ display: "flex", justifyContent: "space-between" }}>
                      <Typography variant="subtitle1">Số lượng người tham gia </Typography>
                      <Typography variant="subtitle1">:</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography> &nbsp; {item.joined}</Typography>
                    </Grid>
                  </Grid>
                  <Grid container>
                    <Grid item xs={1}>
                      <FlagIcon />
                    </Grid>
                    <Grid item xs={5} sx={{ display: "flex", justifyContent: "space-between" }}>
                      <Typography variant="subtitle1">Số báo cáo xấu</Typography>
                      <Typography variant="subtitle1">:</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography> &nbsp; {item.reported}</Typography>
                    </Grid>
                  </Grid>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Typography variant="subtitle1">Quản lí: {item.managerCurrent}</Typography>
                    {/* Ban cộng tác viên */}
                    <IconButton aria-label="Chỉnh sửa cộng tác viên">
                      <Tooltip title="Chỉnh sửa">
                        <EditIcon color="primary" />
                      </Tooltip>
                    </IconButton>
                  </Box>
                  <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                    <Button
                      variant="contained"
                      onClick={() => {
                        handleOpenDetail(item);
                      }}>
                      Chi tiết
                    </Button>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
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
