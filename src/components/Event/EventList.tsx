import React, { useEffect, useState } from "react";
import { Event } from "../../models/event";
// import { map } from "lodash";

import {
  Box,
  Grid,
  Typography,
  CircularProgress,
  InputAdornment,
  MenuItem,
  Card,
  Tooltip,
  Paper,
  Tab,
  TextField,
  Popover,
  // Avatar,
} from "@mui/material";
// import moment from "moment";
import { useStyles } from "./EventList.style";
import Page from "../../layout/Page";
import "react-slideshow-image/dist/styles.css";
import SlideShowEventList from "./SlideShowEventList";
// icon
import SearchIcon from "@mui/icons-material/Search";
import BuildIcon from "@mui/icons-material/Build";
import PersonOffIcon from "@mui/icons-material/PersonOff";
import EventNoteIcon from "@mui/icons-material/EventNote";
// import AccessTimeIcon from "@mui/icons-material/AccessTime";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import TabContext from "@mui/lab/TabContext";
import demoImg6 from "../../assets/home_event_images/New folder/1.jpg";
import { useNavigate } from "react-router-dom";
import TabList from "@mui/lab/TabList";
import DateRangePicker from "../ListData/DateTimePicker/DateRangePicker";
import { DateRange } from "@mui/lab/DateRangePicker";
import checkDeadline from "../Common/CheckDeadline";
import TabPanel from "@mui/lab/TabPanel";
import EventDuration from "./EventDuration";
export const EventList = () => {
  const classes = useStyles();
  const [tabValue, setTabValue] = useState("joined");
  const [data, setData]: any = useState(null);
  const [dataEventNotEnroll, setDataEventNotEnroll]: any = useState(null);

  //getListEventNotEnroll
  const getListEventByUser = async () => {
    const data = await Event.getListEventByUser();
    setData(data);
  };

  const getListEventNotEnroll = async () => {
    const data = await Event.getEventNotEnroll();
    setDataEventNotEnroll(data);
  };
  const [openDatePicker, setOpenDatePicker] = React.useState(false);
  const [filters, setFilters]: any = React.useState({ status: "joined" });
  const [sortBy, setSortBy]: any = React.useState("deadlineTime");
  const [dateData, setDateData] = React.useState<DateRange<Date>>([null, null]);

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
    { value: "deadlineTime", label: "Thời gian của vấn đề" },
    { value: "rankingUser", label: "Xếp hạng của người dùng" },
  ];

  const navigate = useNavigate();

  const handleViewDetail = (eventId: any) => {
    //navigate sang URL detail EVENT
    navigate(`/event-detail?eventid=${eventId}`);
  };

  const renderTabLabel = (label: string) => {
    let count = 0;
    let labelText = "";

    switch (label) {
      case "joined": {
        count = data?.length;
        labelText = "Đã tham gia";
        break;
      }
      case "unJoined": {
        count = dataEventNotEnroll?.length;
        labelText = "Chưa tham gia";
        break;
      }
    }
    return (
      <div className={classes.tab}>
        <Typography>{labelText}</Typography>
        <span>{count}</span>
      </div>
    );
  };
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
  };

  const renderFilter = () => {
    return (
      <Grid container item xs={12} spacing={1} sx={{ mt: 2, width: "100%" }}>
        <Grid item xs={6} md={4} sx={{ minWidth: "20%", width: "100%" }}>
          <Box component="form" noValidate autoComplete="off">
            <TextField
              autoFocus
              fullWidth
              classes={{ root: classes.textField }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              id="outlined-basic"
              placeholder="Tìm kiếm tên tiêu đề..."
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
        <Grid lg={3} md={3} xs={12} sx={{ width: "100%" }}>
          <div></div>
        </Grid>
        <Grid lg={6} md={6} xs={12} sx={{ spacing: 2 }}>
          <Box sx={{ p: 2 }}>
            {/* begin list data */}
            {data?.slice(1, 10).map((item: any, index: number) => (
              <Card key={index} sx={{ minWidth: "100%", height: "fit-content", mr: 4, mb: 3, p: 2 }}>
                <Grid className={classes.headerEvent} sx={{ display: "flex", alignItems: "center" }} container>
                  <img src={demoImg6} alt="" />
                  <Typography
                    variant="subtitle1"
                    className={classes.eventTitle}
                    sx={{ ml: 1, cursor: "pointer", pt: 1, width: "100%" }}
                    onClick={() => handleViewDetail(item?.eventContent?.id)}>
                    {item?.eventContent?.title}
                  </Typography>
                  <Typography variant="caption" sx={{ ml: 2 }}>
                    {item?.eventContent?.description}
                  </Typography>
                </Grid>
                <Box sx={{ display: "flex", background: "#d8dfe6", flexDirection: "column", p: 2, borderRadius: 1 }}>
                  <Tooltip title="Thời gian kết thúc sự kiện">
                    <Box sx={{ display: "flex", alignItems: "center", mr: 1 }}>
                      {/* <AccessTimeIcon sx={{ mr: 0.5, width: 20, height: 20 }} />
                        <Typography style={{ fontSize: 14 }}> */}
                      {/* {moment.duration(moment(item?.eventDetail?.endAt).diff(moment().startOf("day"))).asDays() <
                        3 ? (
                          <div>
                            <AccessTimeIcon sx={{ mr: 0.5, width: 20, height: 20, color: "red" }} />
                            <Typography sx={{ color: "red" }} style={{ fontSize: 14 }}>
                              {moment(item?.eventDetail?.endAt).fromNow()}
                            </Typography>
                          </div>
                        ) : (
                          <div>
                            <AccessTimeIcon sx={{ mr: 0.5, width: 20, height: 20 }} />
                            <Typography style={{ fontSize: 14 }}>
                              {moment(item?.eventDetail?.endAt).fromNow()}
                            </Typography>
                          </div>
                        )} */}
                      {checkDeadline(item?.eventContent?.endAt)}
                    </Box>
                  </Tooltip>
                  <Box sx={{ display: "flex" }}>
                    <Grid container>
                      <Grid item md={12} lg={6} xs={12}>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <NotificationsActiveIcon sx={{ mr: 0.5, width: 20, height: 20, color: "#fd5050" }} />
                          <Typography variant="subtitle2">Vấn đề sắp hết hạn: </Typography>
                          <Typography sx={{ fontSize: 14, ml: 1 }}>{item?.listPostNearDeadline}</Typography>
                        </Box>
                      </Grid>
                      <Grid item md={12} lg={6} xs={12}>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <EventNoteIcon sx={{ mr: 0.5, width: 20, height: 20 }} />
                          <Typography variant="subtitle2">Số vấn đề đăng kí: </Typography>
                          <Typography sx={{ fontSize: 14, ml: 0.5, mr: 1 }}>{item?.listPostInEventOfUser}</Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>
                  <Box sx={{ display: "flex" }}>
                    <Grid container>
                      <Grid item md={12} lg={6} xs={12}>
                        <Box sx={{ display: "flex", alignItems: "center", mr: 1 }}>
                          <PersonOffIcon sx={{ mr: 0.5, width: 20, height: 20 }} />
                          <Typography variant="subtitle2">Chưa có người nhận hỗ trợ: </Typography>
                          <Typography sx={{ fontSize: 14, ml: 1 }}>{item?.listNonRegisterPost}</Typography>
                        </Box>
                      </Grid>
                      <Grid item md={12} lg={6} xs={12}>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <BuildIcon sx={{ mr: 0.5, width: 20, height: 20 }} />
                          <Typography variant="subtitle2">Số đăng kí hỗ trợ các vấn đề: </Typography>
                          <Typography sx={{ fontSize: 14, ml: 0.5, mr: 1 }}>{item?.listUserRequestor}</Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>
                </Box>
              </Card>
            ))}
          </Box>
        </Grid>
        <Grid lg={3} md={3} xs={12}>
          <div></div>
        </Grid>
      </Grid>
    );
  };

  useEffect(() => {
    getListEventByUser();
    getListEventNotEnroll();
  }, []);

  if (!data) {
    return (
      <Page>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
          <CircularProgress />
        </Box>
      </Page>
    );
  } else {
    return (
      <Box>
        <Box sx={{ mt: 8 }}>
          <SlideShowEventList />
        </Box>

        <Grid container className={classes.rootEventList}>
          <Box className={classes.searchAndFilter} sx={{ width: "100%", typography: "body1" }}>
            <Paper elevation={2} sx={{ px: 2 }}>
              <TabContext value={tabValue}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <TabList onChange={handleChange} aria-label="lab API tabs example">
                    <Tab label={renderTabLabel("joined")} value="joined" />
                    <Tab label={renderTabLabel("unJoined")} value="unJoined" />
                  </TabList>
                </Box>
                <TabPanel value="joined">{renderFilter()}</TabPanel>
                <TabPanel value="unJoined">
                  <Grid container>
                    <Grid lg={3} md={3} xs={12} sx={{ width: "100%" }}>
                      <div></div>
                    </Grid>
                    <Grid lg={6} md={6} xs={12} sx={{ width: "100%" }}>
                      <EventDuration data={dataEventNotEnroll}></EventDuration>
                    </Grid>
                    <Grid lg={3} md={3} xs={12} sx={{ width: "100%" }}>
                      <div></div>
                    </Grid>
                  </Grid>
                </TabPanel>
              </TabContext>
            </Paper>
          </Box>
        </Grid>
      </Box>
    );
  }
};

export default EventList;
