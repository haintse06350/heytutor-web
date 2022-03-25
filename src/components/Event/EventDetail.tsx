import React, { useEffect, useState } from "react";
import { useStyles } from "./EventDetail.style";
// component custom
import Page from "../../layout/Page";

//component material
import { Grid, Typography, Box, Tooltip, Button, CircularProgress } from "@mui/material";
// icon
import HowToRegOutlinedIcon from "@mui/icons-material/HowToRegOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { Event } from "../../models/event";
import moment from "moment";
// import Image from "../../assets/27366933.jpg";

const EventDetail = () => {
  const classes = useStyles();
  const urlParams = new URLSearchParams(window.location.search);
  const eventId = urlParams.get("eventid");
  const [dataDetail, setDataDetail]: any = useState(null);

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
      <Page className={classes.root}>
        <Grid item xs={12} className={classes.postContent}>
          <br></br>
          <Grid item className={classes.postTitle}>
            <Typography variant="h5">{dataDetail?.eventContent?.title}</Typography>
          </Grid>
          <div className={classes.mainContent}>
            <Typography variant="body1">{dataDetail?.eventContent?.description}</Typography>
          </div>
          {/* <img src={Image}></img> */}
          <Grid container item xs={12} className={classes.simpleActions}>
            <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
              <Tooltip title="Số lượt xem">
                <Box sx={{ display: "flex", alignItems: "center", mr: 2 }}>
                  <VisibilityOutlinedIcon sx={{ mr: 0.5, width: 20, height: 20 }} />
                  <Typography style={{ fontSize: 14 }}>{dataDetail?.eventContent?.viewCount}</Typography>
                </Box>
              </Tooltip>
              <Tooltip title="Số lượt đăng kí">
                <Box sx={{ display: "flex", alignItems: "center", mr: 2 }}>
                  <HowToRegOutlinedIcon sx={{ mr: 0.5, width: 20, height: 20 }} />
                  <Typography style={{ fontSize: 14 }}>5</Typography>
                </Box>
              </Tooltip>
              <Tooltip title="Thời gian kết thúc đăng kí">
                <Box sx={{ display: "flex", alignItems: "center", mr: 2 }}>
                  <AccessTimeIcon sx={{ mr: 0.5, width: 20, height: 20 }} />
                  <Typography style={{ fontSize: 14 }}>{moment(dataDetail?.eventContent?.endAt).fromNow()}</Typography>
                </Box>
              </Tooltip>
            </Box>
          </Grid>
          <Grid sx={{ mt: 2 }}>
            <Tooltip title="Danh sách số vấn đề có trong sự kiện">
              <Button variant="contained">Xem danh sách vấn đề </Button>
            </Tooltip>
            <Tooltip title="Danh sách người đăng ký hỗ trợ">
              <Button variant="contained">Xem danh sách người đăng ký hỗ trợ</Button>
            </Tooltip>
          </Grid>
        </Grid>
      </Page>
    );
  }
};

export default EventDetail;
