import React, { useEffect, useState } from "react";
import { useStyles } from "./EventDetail.style";
// import { Document, Page } from "react-pdf";
// component custom
import Page from "../../layout/Page";

//component material
import { Grid, Typography, Box, Tooltip, Button, CircularProgress } from "@mui/material";
// icon
import HowToRegOutlinedIcon from "@mui/icons-material/HowToRegOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { Event } from "../../models/event";
import SlideShowEventList from "./SlideShowEventList";
import img1 from "../../assets/home_event_images/14.png";
import EventNoteIcon from "@mui/icons-material/EventNote";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import moment from "moment";
const EventDetail = () => {
  const classes = useStyles();
  const urlParams = new URLSearchParams(window.location.search);
  const eventId = urlParams.get("eventid");
  const [dataDetail, setDataDetail]: any = useState(null);
  // pdf

  const getEventDetailByEventId = async () => {
    const data = await Event.getEventDetailByEventId(eventId);
    setDataDetail(data);
    console.log("event ID", eventId);
  };

  useEffect(() => {
    getEventDetailByEventId();
  }, [eventId]);

  if (!dataDetail) {
    return (
      <Page className={classes.root}>
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
      <>
        <Box sx={{ mt: 8 }}>
          <SlideShowEventList />
        </Box>
        <Page className={classes.root}>
          <Grid item xs={12} md={8} lg={8} className={classes.postContent}>
            <Grid item>
              <img src={img1} alt="img event detail" /> 
            </Grid>
            <Grid item className={classes.postTitle}>
              <Typography variant="h5">{dataDetail?.eventContent?.title}</Typography>
            </Grid>
            <div className={classes.mainContent}>
              <Typography variant="body1">{dataDetail?.eventContent?.description}</Typography>
            </div>
            <Grid container item xs={12} className={classes.simpleActions}>
              <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                <Tooltip title="Số lượt xem">
                  <Box sx={{ display: "flex", alignItems: "center", mr: 2 }}>
                    <VisibilityOutlinedIcon sx={{ mr: 0.5, width: 20, height: 20 }} />
                    <Typography style={{ fontSize: 14 }}>{dataDetail?.eventContent?.viewCount}</Typography>
                  </Box>
                </Tooltip>
                  <Tooltip title="Số lượt đăng kí hỗ trợ">
                    <Box sx={{ display: "flex", alignItems: "center", mr: 2 }}>
                      <HowToRegOutlinedIcon sx={{ mr: 0.5, width: 20, height: 20 }} />
                      <Typography style={{ fontSize: 14 }}>{dataDetail?.listNonRegisterPost}</Typography>
                    </Box>
                  </Tooltip>
                  <Tooltip title="Số vấn đề đăng kí">
                    <Box sx={{ display: "flex", alignItems: "center", mr: 2 }}>
                      <EventNoteIcon sx={{ mr: 0.5, width: 20, height: 20 }} />
                      <Typography style={{ fontSize: 14 }}>{dataDetail?.listUserRequestor}</Typography>
                    </Box>
                  </Tooltip>
                <Tooltip title="Thời gian kết thúc đăng kí">
                  <Box sx={{ display: "flex", alignItems: "center", mr: 2 }}>
                    <AccessTimeIcon sx={{ mr: 0.5, width: 20, height: 20 }} />
                    <Typography style={{ fontSize: 14 }}>
                      {moment(dataDetail?.eventContent?.endAt).fromNow()}
                    </Typography>
                  </Box>
                </Tooltip>
              </Box>
            </Grid>
            <Grid item>
              <Typography>{dataDetail?.eventContent?.content}</Typography>
            </Grid>
            <Grid sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
              <Tooltip title="Danh sách số vấn đề có trong sự kiện">
                <Button variant="contained" startIcon={<ArrowForwardIcon />} sx={{ mr: 2 }}>
                  Vấn đề{" "}
                </Button>
              </Tooltip>
              <Tooltip title="Danh sách người đăng ký hỗ trợ">
                <Button variant="contained" color="secondary" startIcon={<ArrowForwardIcon />}>
                  Người đăng ký hỗ trợ
                </Button>
              </Tooltip>
            </Grid>
          </Grid>
          <Grid item xs={12} md={4} lg={4}></Grid>
        </Page>
      </>
    );
  }
};

export default EventDetail;
