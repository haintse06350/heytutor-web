import React, { useEffect, useState } from "react";
//material
import { Card, Box, Grid, Typography, Divider, Tooltip, CircularProgress, Button } from "@mui/material";

//
//lodash
// import { map } from "lodash";

//icons
import BuildIcon from "@mui/icons-material/Build";
import PersonOffIcon from "@mui/icons-material/PersonOff";
import EventNoteIcon from "@mui/icons-material/EventNote";
// import AccessTimeIcon from "@mui/icons-material/AccessTime";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import { useNavigate } from "react-router-dom";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Event } from "../../models/event";
// import moment from "moment";//
import { useStyles } from "./HomePage.style";
// import Image from "../../assets/27366933.jpg";
import EventDuration from "../Event/EventDuration";

import demoImg6 from "../../assets/default_images/6.jpg";
import checkDeadline from "../Common/CheckDeadline";
import { getImageUrl } from "../../utils/imageUrl";

const OnGoingEvent = () => {
  const [value, setValue] = React.useState("1");
  const classes = useStyles();
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  const navigate = useNavigate();

  const [data, setData]: any = useState(null);

  const handleViewDetail = (eventId: any) => {
    //navigate sang URL detail EVENT
    navigate(`/event-detail?eventid=${eventId}`);
  };

  // const onClickShow = (id: any) => {
  //   setCheckShowMore(!checkShowMore);
  //   setItemCheck(id);
  // };
  // const [checkShowMore, setCheckShowMore] = useState(false);
  // const [itemCheck, setItemCheck] = useState();
  const [dataEventNotEnroll, setDataEventNotEnroll]: any = useState(null);

  const eventImage = (image: any) => {
    const imageLink = image ? JSON.parse(image)[0] : null;
    if (imageLink) {
      return getImageUrl(imageLink);
    } else {
      return demoImg6;
    }
  };

  const itemEvent = () => {
    if (!data) {
      return (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}>
          <CircularProgress />
        </Box>
      );
    } else {
      return (
        <>
          {data.length === 0 && (
            <Box>
              <Typography variant="h5">Hi???n t???i b???n ch??a tham gia b???t k?? s??? ki???n n??o!!</Typography>
            </Box>
          )}
          {data.slice(0, 3).map((item: any, index: number) => (
            <Box key={index} sx={{ minWidth: "100%", height: "fit-content", mr: 4, mb: 3 }}>
              <Grid className={classes.headerEvent} sx={{ display: "flex", alignItems: "center" }} container>
                <img src={eventImage(item?.eventDetail?.image)} alt="" />
                <Typography
                  sx={{ mt: 1, width: "100%" }}
                  className={classes.titleEvent}
                  variant="subtitle1"
                  onClick={() => handleViewDetail(item?.eventDetail?.id)}>
                  {item?.eventDetail?.title}
                </Typography>
                <Typography variant="caption" sx={{ py: 1, color: "#000" }}>
                  {item?.eventDetail?.description}
                </Typography>
              </Grid>
              <Box sx={{ display: "flex", background: "#d8dfe6", flexDirection: "column", p: 2, borderRadius: 1 }}>
                <Tooltip title="Th???i gian k???t th??c s??? ki???n">
                  <Box sx={{ display: "flex", alignItems: "center", mr: 1 }}>
                    {checkDeadline(item?.eventDetail?.endAt)}
                  </Box>
                </Tooltip>
                <Box sx={{ display: "flex" }}>
                  <Grid container>
                    <Grid item md={12} lg={6} xs={12}>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <NotificationsActiveIcon sx={{ mr: 0.5, width: 20, height: 20, color: "#fd5050" }} />
                        <Typography variant="subtitle2">V???n ????? s???p h???t h???n: </Typography>
                        <Typography sx={{ fontSize: 14, ml: 1 }}>{item?.listPostNearDeadline}</Typography>
                      </Box>
                    </Grid>
                    <Grid item md={12} lg={6} xs={12}>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <EventNoteIcon sx={{ mr: 0.5, width: 20, height: 20 }} />
                        <Typography variant="subtitle2">S??? v???n ????? ????ng k??: </Typography>
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
                        <Typography variant="subtitle2">Ch??a c?? ng?????i nh???n h??? tr???: </Typography>
                        <Typography sx={{ fontSize: 14, ml: 1 }}>{item?.listNonRegisterPost}</Typography>
                      </Box>
                    </Grid>
                    <Grid item md={12} lg={6} xs={12}>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <BuildIcon sx={{ mr: 0.5, width: 20, height: 20 }} />
                        <Typography variant="subtitle2">S??? l?????t ????ng k?? h??? tr???: </Typography>
                        <Typography sx={{ fontSize: 14, ml: 0.5, mr: 1 }}>{item?.listUserRequestor}</Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
              <Divider sx={{ mt: 2 }} />
            </Box>
          ))}
          {data?.length > 2 && (
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography variant="subtitle1">???? hi???n th??? 3 tr??n {data?.length} s??? ki???n </Typography>
              <Button variant="contained" onClick={handleEventList}>
                Xem chi ti???t
              </Button>
            </Box>
          )}
        </>
      );
    }
  };

  const getListEventByUser = async () => {
    const data = await Event.getListEventByUser();
    setData(data);
  };

  const getListEventNotEnroll = async () => {
    const data = await Event.getEventNotEnroll();
    setDataEventNotEnroll(data);
  };

  const handleEventList = () => {
    navigate(`/event-list`);
  };
  useEffect(() => {
    getListEventByUser();
    getListEventNotEnroll();
  }, []);
  return (
    <Card>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="S??? ki???n ???? tham gia" value="1" />
            <Tab label="S??? ki???n ch??a tham gia" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1">{itemEvent()}</TabPanel>
        <TabPanel value="2">
          <EventDuration data={dataEventNotEnroll} />
        </TabPanel>
      </TabContext>
    </Card>
  );
};

export default OnGoingEvent;
