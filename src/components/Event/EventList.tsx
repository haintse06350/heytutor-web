import React, { useEffect, useState } from "react";
import { Event } from "../../models/event";
// import { map } from "lodash";

import {
  Box,
  Grid,
  Typography,
  InputAdornment,
  Tooltip,
  Paper,
  Tab,
  TextField,
  Container,
  Divider,
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
import demoImg6 from "../../assets/home_event_images/events/1.png";
import { useNavigate } from "react-router-dom";
import TabList from "@mui/lab/TabList";
import checkDeadline from "../Common/CheckDeadline";
import TabPanel from "@mui/lab/TabPanel";
import EventDuration from "./EventDuration";
import { getImageUrl } from "../../utils/imageUrl";
import LoadingState from "../Common/LoadingState";
import { compact, isEmpty } from "lodash";

export const EventList = () => {
  const classes = useStyles();
  const [tabValue, setTabValue] = useState("joined");
  const [dataEventJoint, setDataEventJoint]: any = useState(null);
  const [dataEventNotEnroll, setDataEventNotEnroll]: any = useState(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [searchData, setSearchData] = useState<any>(null);

  const onChangeSearch = (e: any) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    if (isEmpty(searchQuery)) {
      setSearchData(tabValue === "joined" ? dataEventJoint : dataEventNotEnroll);
    }

    if (searchQuery) {
      const eventJoint = dataEventJoint?.map((item: any) => {
        if (item.eventDetail.title.toLowerCase().includes(searchQuery.toLowerCase())) {
          return item;
        }
      });

      const eventNotEnroll = dataEventNotEnroll?.map((item: any) => {
        if (item.eventDetail.title.toLowerCase().includes(searchQuery.toLowerCase())) {
          return item;
        }
      });

      if (tabValue === "joined") {
        setSearchData(compact(eventJoint));
      } else {
        setSearchData(compact(eventNotEnroll));
      }
    }
  }, [searchQuery, tabValue]);

  useEffect(() => {
    if (dataEventNotEnroll && dataEventJoint) {
      if (tabValue === "joined") {
        setSearchData(dataEventJoint);
      } else {
        setSearchData(dataEventNotEnroll);
      }
    }
  }, [dataEventJoint, dataEventNotEnroll, tabValue]);

  //getListEventNotEnroll
  const getListEventByUser = async () => {
    const data = await Event.getListEventByUser();
    setDataEventJoint(data);
  };

  const getListEventNotEnroll = async () => {
    const data = await Event.getEventNotEnroll();
    setDataEventNotEnroll(data);
  };

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
        count = dataEventJoint?.length;
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

  const eventImage = (image: any) => {
    const imageLink = image ? JSON.parse(image)[0] : null;
    if (imageLink) {
      return getImageUrl(imageLink);
    } else {
      return demoImg6;
    }
  };

  const JointEvent = () => {
    return (
      <Grid container item xs={12} spacing={1} sx={{ mt: 2, width: "100%" }}>
        {/* begin list data */}
        {searchData?.slice(0, 10).map((item: any, index: number) => (
          <Box key={index} sx={{ mb: 3 }}>
            <Grid className={classes.headerEvent} sx={{ display: "flex", alignItems: "center" }} container>
              <img src={eventImage(item?.eventDetail?.image)} alt="" />
              <Typography
                variant="subtitle1"
                className={classes.eventTitle}
                sx={{ cursor: "pointer", pt: 1, width: "100%" }}
                onClick={() => handleViewDetail(item?.eventDetail?.id)}>
                {item?.eventDetail?.title}
              </Typography>
              <Typography variant="caption">{item?.eventDetail?.description}</Typography>
            </Grid>
            <Box sx={{ display: "flex", background: "#d8dfe6", flexDirection: "column", p: 2, borderRadius: 1 }}>
              <Tooltip title="Thời gian kết thúc sự kiện">
                <Box sx={{ display: "flex", alignItems: "center", mr: 1 }}>
                  {checkDeadline(item?.eventDetail?.endAt)}
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
            <Divider sx={{ mt: 2 }} />
          </Box>
        ))}
      </Grid>
    );
  };

  useEffect(() => {
    getListEventByUser();
    getListEventNotEnroll();
  }, []);

  if (!dataEventJoint) {
    return (
      <Page>
        <LoadingState />
      </Page>
    );
  } else {
    return (
      <Box>
        <Box sx={{ mt: 8 }}>
          <SlideShowEventList />
        </Box>

        <Container maxWidth="md" sx={{ pt: 1 }}>
          <Paper elevation={2} sx={{ px: 2 }}>
            <TabContext value={tabValue}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList onChange={handleChange} aria-label="lab API tabs example">
                  <Tab label={renderTabLabel("joined")} value="joined" />
                  <Tab label={renderTabLabel("unJoined")} value="unJoined" />
                </TabList>
              </Box>
              <Grid item xs={12} sx={{ mt: 2, width: "100%" }}>
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
                    onChange={onChangeSearch}
                    id="outlined-basic"
                    placeholder="Tìm kiếm theo tiêu đề sự kiện..."
                    variant="outlined"
                  />
                </Box>
              </Grid>
              <TabPanel value="joined">
                <JointEvent />
              </TabPanel>
              <TabPanel value="unJoined">
                <EventDuration data={searchData}></EventDuration>
              </TabPanel>
            </TabContext>
          </Paper>
        </Container>
      </Box>
    );
  }
};

export default EventList;
