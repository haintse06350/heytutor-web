import React, { useEffect, useState } from "react";
import { useStyles } from "./EventDetail.style";
// component custom
import Page from "../../layout/Page";

//component material
import { Grid, Typography, Box, Tooltip, IconButton, Button } from "@mui/material";
// icon
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import HowToRegOutlinedIcon from "@mui/icons-material/HowToRegOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { Event } from "../../models/event";
const EventDetail = () => {
  const classes = useStyles();
  const urlParams = new URLSearchParams(window.location.search);
  const eventid = urlParams.get("eventid");
  console.log(eventid);
  const [dataDetail, setDataDetail]: any = useState(null);
  const getEventDetailByEventId = async () => {
    const data = await Event.getEventDetailByEventId(eventid);
    setDataDetail(data);
  };

  useEffect(() => {
    getEventDetailByEventId();
  }, [eventid]);
  console.log(dataDetail, "event");

  return (
    <Page className={classes.root}>
      <Grid container className={classes.dialogHeader}>
        <Grid xs={6} item className={classes.backBtn}>
          <Tooltip title="Trở lại">
            <IconButton>
              <ArrowBackIosIcon />
            </IconButton>
          </Tooltip>
        </Grid>
        <Grid xs={6} item className={classes.moreBtn}>
          <IconButton>
            <MoreHorizIcon />
          </IconButton>
        </Grid>
      </Grid>
      <br></br>
      <Grid item xs={12} className={classes.postContent}>
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
            <Tooltip title="Số lượt đăng kí">
              <Box sx={{ display: "flex", alignItems: "center", mr: 2 }}>
                <HowToRegOutlinedIcon sx={{ mr: 0.5, width: 20, height: 20 }} />
                <Typography style={{ fontSize: 14 }}>5</Typography>
              </Box>
            </Tooltip>
          </Box>
        </Grid>
        <Grid>
          <Tooltip title="Danh sách số vấn đề có trong sự kiện">
            <Button variant="contained">Xem danh sách vấn đề</Button>
          </Tooltip>
        </Grid>
      </Grid>
    </Page>
  );
};

export default EventDetail;
