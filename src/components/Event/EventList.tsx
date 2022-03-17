import React, { useEffect, useState } from "react";
import { Event } from "../../models/event";
import { map } from "lodash";

import { Box, Grid, Typography, Divider, Button, Tooltip, CircularProgress } from "@mui/material";
import moment from "moment";
import { useStyles } from "../HomePage/HomePage.style";
import { useNavigate } from "react-router-dom";

import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import HowToRegOutlinedIcon from "@mui/icons-material/HowToRegOutlined";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Page from "../../layout/Page";

export const EventList = () => {
  const classes = useStyles();
  const [data, setData]: any = useState(null);

  const getListEventByUser = async () => {
    const data = await Event.getListEventByUser();
    const res = await Promise.all(
      map(data, async (d: any) => {
        const eventStats = await getNbUserOfEvent(d["Event.id"]);
        return { ...d, eventStats };
      })
    );
    console.log(res);
    setData(res);
  };
  const getNbUserOfEvent = async (eventId: number) => {
    const stats = await Event.getEventStats(eventId);
    return stats;
  };
  const onClickShow = (id: any) => {
    setCheckShowMore(!checkShowMore);
    setItemCheck(id);
  };
  const [checkShowMore, setCheckShowMore] = useState(false);
  const [itemCheck, setItemCheck] = useState();
  const navigate = useNavigate();

  const handleViewDetail = (eventId: any) => {
    //navigate sang URL detail EVENT
    navigate(`/event-detail?eventid=${eventId}`);
  };
  useEffect(() => {
    getListEventByUser();
  }, []);
  if (!data) {
    return (
      <Page className={classes.rootEventList}>
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
        <Page className={classes.rootEventList}>
          {data?.map((item: any, index: number) => (
            <Box key={index} sx={{ height: "fit-content" }}>
              <br />
              <Divider />

              <Grid className={classes.headerEvent} sx={{ display: "flex", alignItems: "center" }} container>
                {/* <img src={Image} alt="fuk" /> */}
                <Typography variant="h6" sx={{ ml: 1 }}>
                  {item["Event.title"]}
                </Typography>
                <Typography variant="body2" sx={{ position: "relative" }}>
                  {checkShowMore && itemCheck === item["Event.id"]
                    ? item["Event.description"]
                    : item["Event.description"].slice(0, 300)}

                  {item["Event.description"].length > 300 ? (
                    <Button variant="text" color="inherit" sx={{ ml: 1 }} onClick={() => onClickShow(item["Event.id"])}>
                      {checkShowMore && itemCheck === item["Event.id"] ? "Ẩn đi" : "Đọc thêm"}
                    </Button>
                  ) : (
                    ""
                  )}
                </Typography>
              </Grid>

              <Box sx={{ display: "flex", ml: 1, mt: 1, mb: 1 }}>
                <Tooltip title="Số lượt xem">
                  <Box sx={{ display: "flex", alignItems: "center", mr: 1 }}>
                    <VisibilityOutlinedIcon sx={{ mr: 0.5, width: 20, height: 20 }} />
                    <Typography style={{ fontSize: 14 }}>{item["Event.viewCount"]}</Typography>
                  </Box>
                </Tooltip>
                <Tooltip title="Số lượt đăng kí">
                  <Box sx={{ display: "flex", alignItems: "center", mr: 1 }}>
                    <HowToRegOutlinedIcon sx={{ mr: 0.5, width: 20, height: 20 }} />
                    <Typography style={{ fontSize: 14 }}>{item.eventStats.listEventUser.numberOfUser}</Typography>
                  </Box>
                </Tooltip>
                <Tooltip title="Thời gian kết thúc sự kiện">
                  <Box sx={{ display: "flex", alignItems: "center", mr: 1 }}>
                    <AccessTimeIcon sx={{ mr: 0.5, width: 20, height: 20 }} />
                    <Typography style={{ fontSize: 14 }}>
                      {moment(item["Event.updatedAt"]).lang("vi").format("LL")}
                    </Typography>
                  </Box>
                </Tooltip>
              </Box>
              <Grid item>
                <Button
                  size="small"
                  color="inherit"
                  onClick={() => handleViewDetail(item["Event.id"])}
                  variant="outlined"
                  endIcon={<ArrowForwardIcon />}>
                  Xem chi tiết
                </Button>
              </Grid>
            </Box>
          ))}

          <br />
          <Divider />
        </Page>
      </>
    );
  }
};

export default EventList;
