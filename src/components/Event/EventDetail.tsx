import React, { useEffect, useState } from "react";
import { useStyles } from "./EventDetail.style";
// import { Document, Page } from "react-pdf";
// component custom
import Page from "../../layout/Page";

//component material
import { Grid, Box, CircularProgress, Typography } from "@mui/material";
// icon
import { Event } from "../../models/event";
import { ListPost } from "../ListData/ListRequest/ListPost";
import { useNavigate } from "react-router-dom";
import img1 from "../../assets/home_event_images/14.png";
import moment from "moment";
import "moment/locale/vi";
import FilterAndSearch from "../ListData/FilterAndSearch/FilterAndSearch";
// import { map } from "lodash";

const EventDetail = () => {
  const classes = useStyles();
  const urlParams = new URLSearchParams(window.location.search);
  const eventId = urlParams.get("eventid");
  const [event, setEvent]: any = useState(null);
  const [listPost, setListPost]: any = useState(null);

  const getEventDetailByEventId = async (eventId: string) => {
    const data = await Event.getEventDetailByEventId(eventId);
    setEvent(data);
  };

  const getListPostOfEvent = async (eventId: string) => {
    const res = await Event.getListPostOnEvent(eventId);
    setListPost(res);
  };

  const navigate = useNavigate();

  const onClickPostDetail = (postId: number) => {
    navigate(`/post-detail?postId=${postId}&from=event`);
  };

  //TODO: show list post
  console.log("listPost", listPost, event);

  useEffect(() => {
    if (eventId) {
      getEventDetailByEventId(eventId);
      getListPostOfEvent(eventId);
    }
  }, [eventId]);

  if (!listPost) {
    return (
      <Page className={classes.root}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
            width: "100%",
          }}>
          <CircularProgress />
        </Box>
      </Page>
    );
  } else {
    return (
      <>
        <Page maxWidth="lg" className={classes.root}>
          <Box display="flex">
            <img style={{ borderRadius: 8, height: 180 }} src={img1} alt="" />
            <Box sx={{ ml: 1, width: "100%" }}>
              <Typography variant="subtitle1">{event?.eventContent.title}</Typography>
              <Typography variant="subtitle2" color="textSecondary">
                {event?.eventContent.description}
              </Typography>
              <Typography>{event?.eventContent.description}</Typography>
              <Box sx={{ background: "#d8dfe6", borderRadius: 1, p: 1, mt: 1 }}>
                <Typography variant="subtitle2">
                  Tổng số bài đăng:{" "}
                  <Typography component="span" variant="caption">
                    {listPost?.length}{" "}
                  </Typography>
                </Typography>
                <Typography variant="subtitle2">
                  Thời gian kết thúc sự kiện:{" "}
                  <Typography component="span" variant="caption">
                    {moment().from(event?.eventContent.endAt)}{" "}
                  </Typography>
                </Typography>
                <Typography variant="subtitle2">
                  Bài viết của bạn trong sự kiện:{" "}
                  <Typography component="span" variant="caption">
                    {event?.listPostInEventOfUser}
                  </Typography>
                </Typography>
              </Box>
            </Box>
          </Box>
          <Box sx={{ mt: 1 }}>
            <FilterAndSearch onListEvent={true} resetData={() => {}} />
          </Box>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <ListPost
              data={listPost}
              onClickPostDetail={onClickPostDetail}
              selectItem={{}}
              onOpenMenu={() => {}}
              renderRegisterAndSupporter={null}
            />
          </Grid>
        </Page>
      </>
    );
  }
};

export default EventDetail;
