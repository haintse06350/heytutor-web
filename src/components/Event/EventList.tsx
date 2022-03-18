import React, { useEffect, useState } from "react";
import { Event } from "../../models/event";
// import { map } from "lodash";

import {
  Box,
  Grid,
  Typography,
  Divider,
  Button,
  Tooltip,
  CircularProgress,
  Input,
  InputAdornment,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import moment from "moment";
import { useStyles } from "./EventList.style";
import { useNavigate } from "react-router-dom";

import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import HowToRegOutlinedIcon from "@mui/icons-material/HowToRegOutlined";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import SearchIcon from "@mui/icons-material/Search";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Page from "../../layout/Page";

export const EventList = () => {
  const classes = useStyles();
  const [data, setData]: any = useState(null);

  const getListEventByUser = async () => {
    const data = await Event.getListEventByUser();

    console.log(data, "eventlist");
    setData(data.listEvent);
  };
  // const getNbUserOfEvent = async (eventId: number) => {
  //   const stats = await Event.getEventStats(eventId);
  //   return stats;
  // };
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
      <>
        <Page className={classes.rootEventList}>
          <Grid className={classes.wrapEventHeader}>
            <Typography variant="h3">Event List</Typography>
            <Box className={classes.searchEvent}>
              <Input
                autoFocus
                fullWidth
                disableUnderline
                placeholder="Search…"
                startAdornment={
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: "text.disabled", width: 20, height: 20 }} />
                  </InputAdornment>
                }
                sx={{ mr: 1, fontWeight: "fontWeightBold" }}
              />
              <Button variant="contained">Search</Button>
            </Box>
            <Box className={classes.fillterEvent}>
              {/* mặc định khi fill event người dùng là chuyên ngành ở trong bảng student */}
              <Box>
                <InputLabel id="select-term">Chuyên ngành</InputLabel>
                <Select labelId="select-term" id="demo-simple-select" label="term" value={10}>
                  <MenuItem value={10}>SE</MenuItem>
                  <MenuItem value={20}>IS</MenuItem>
                  <MenuItem value={30}>AI</MenuItem>
                </Select>
              </Box>
              <Box>
                <InputLabel id="select-time">Thời gian</InputLabel>
                <Select labelId="select-time" id="select-time" label="term" value={10}>
                  <MenuItem value={10}>Hôm nay</MenuItem>
                  <MenuItem value={20}>Tuần này</MenuItem>
                  <MenuItem value={30}>Tháng này</MenuItem>
                </Select>
              </Box>
            </Box>
            <Box className={classes.sortEvent}>
              <InputLabel id="sort-event">Sắp xếp</InputLabel>
              <Select labelId="sort-event" id="sort-event" label="term" value={10}>
                <MenuItem value={10}>Người tham gia</MenuItem>
                <MenuItem value={20}>Lượt xem</MenuItem>
                <MenuItem value={30}>Người đăng kí</MenuItem>
              </Select>
            </Box>
          </Grid>
          <Grid container className={classes.wrapEventList}>
            {data?.map((item: any, index: number) => (
              <Grid item lg={6} md={6} xs={12} key={index} className={classes.wrapEvent}>
                <Grid className={classes.wrapEventContent} container>
                  {/* <img src={Image} alt="fuk" /> */}
                  <Typography variant="h6" sx={{ ml: 1 }}>
                    {item?.eventDetail?.title}
                  </Typography>
                  <Typography variant="body2" sx={{ position: "relative" }}>
                    {checkShowMore && itemCheck === item?.eventDetail?.id
                      ? item?.eventDetail?.description
                      : item?.eventDetail?.description.slice(0, 300)}

                    {item?.eventDetail?.description.length > 300 ? (
                      <Button
                        variant="text"
                        color="inherit"
                        sx={{ ml: 1 }}
                        onClick={() => onClickShow(item?.eventDetail?.id)}>
                        {checkShowMore && itemCheck === item?.eventDetail?.id ? "Ẩn đi" : "Đọc thêm"}
                      </Button>
                    ) : (
                      ""
                    )}
                  </Typography>

                  <Box sx={{ display: "flex", ml: 1, mt: 1, mb: 1 }}>
                    <Tooltip title="Số lượt xem">
                      <Box sx={{ display: "flex", alignItems: "center", mr: 1 }}>
                        <VisibilityOutlinedIcon sx={{ mr: 0.5, width: 20, height: 20 }} />
                        <Typography style={{ fontSize: 14 }}>{item?.eventDetail?.viewCount}</Typography>
                      </Box>
                    </Tooltip>
                    <Tooltip title="Số lượt đăng kí">
                      <Box sx={{ display: "flex", alignItems: "center", mr: 1 }}>
                        <HowToRegOutlinedIcon sx={{ mr: 0.5, width: 20, height: 20 }} />
                        <Typography style={{ fontSize: 14 }}>{item?.numberOfUser?.numberOfUser}</Typography>
                      </Box>
                    </Tooltip>
                    <Tooltip title="Thời gian kết thúc sự kiện">
                      <Box sx={{ display: "flex", alignItems: "center", mr: 1 }}>
                        <AccessTimeIcon sx={{ mr: 0.5, width: 20, height: 20 }} />
                        <Typography style={{ fontSize: 14 }}>
                          {moment(item?.eventDetail?.endAt).lang("vi").format("LL")}
                        </Typography>
                      </Box>
                    </Tooltip>
                  </Box>
                  <Grid item>
                    <Button
                      size="small"
                      color="inherit"
                      onClick={() => handleViewDetail(item?.eventDetail?.id)}
                      variant="outlined"
                      endIcon={<ArrowForwardIcon />}>
                      Xem chi tiết
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            ))}
          </Grid>

          <br />
          <Divider />
        </Page>
      </>
    );
  }
};

export default EventList;
