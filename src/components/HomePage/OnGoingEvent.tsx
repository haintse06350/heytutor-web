import React, { useEffect, useState } from "react";
//material
import { Card, CardHeader, Box, Grid, Typography, Divider, Button, Tooltip, CircularProgress } from "@mui/material";

//
//lodash
// import { map } from "lodash";

//icons
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import HowToRegOutlinedIcon from "@mui/icons-material/HowToRegOutlined";
// import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined";
// import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
// import RecordVoiceOverOutlinedIcon from "@mui/icons-material/RecordVoiceOverOutlined";
// import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";
// import SupervisedUserCircleOutlinedIcon from "@mui/icons-material/SupervisedUserCircleOutlined";
import EventBusyRoundedIcon from "@mui/icons-material/EventBusyRounded";
import PostAddRoundedIcon from "@mui/icons-material/PostAddRounded";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { useNavigate } from "react-router-dom";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Event } from "../../models/event";
import moment from "moment";
import { useStyles } from "./HomePage.style";
// import Image from "../../assets/27366933.jpg";
import EventDuration from "../Event/EventDuration";

import demoImg6 from "../../assets/default_images/6.jpg";

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

  const onClickShow = (id: any) => {
    setCheckShowMore(!checkShowMore);
    setItemCheck(id);
  };
  const [checkShowMore, setCheckShowMore] = useState(false);
  const [itemCheck, setItemCheck] = useState();
  const [dataEventDuration, setDataEventDuration]: any = useState(null);

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
          {/* <Box sx={{ display: "flex", alignItems: "center", px: 3, pt: 1 }}>
            <Tooltip title="Số lượt xem">
              <Box sx={{ display: "flex", alignItems: "center", mr: 1 }}>
                <VisibilityOutlinedIcon sx={{ mr: 0.5, width: 20, height: 20 }} />
                <Typography style={{ fontSize: 14 }}>100</Typography>
              </Box>
            </Tooltip>
            <Tooltip title="Số người tham gia sự kiện">
              <Box sx={{ display: "flex", alignItems: "center", mr: 1 }}>
                <PeopleAltOutlinedIcon sx={{ mr: 0.5, width: 20, height: 20 }} />
                <Typography style={{ fontSize: 14 }}>80</Typography>
              </Box>
            </Tooltip>
            <Tooltip title="Số người đăng vấn đề">
              <Box sx={{ display: "flex", alignItems: "center", mr: 1 }}>
                <RecordVoiceOverOutlinedIcon sx={{ mr: 0.5, width: 20, height: 20 }} />
                <Typography style={{ fontSize: 14 }}>50</Typography>
              </Box>
            </Tooltip>
            <Tooltip title="Số người đăng kí giải quyết vấn đề">
              <Box sx={{ display: "flex", alignItems: "center", mr: 1 }}>
                <SupervisedUserCircleOutlinedIcon sx={{ mr: 0.5, width: 20, height: 20 }} />
                <Typography style={{ fontSize: 14 }}>30</Typography>
              </Box>
            </Tooltip>
            <Tooltip title="Số người đã từng giải quyết vấn đề">
              <Box sx={{ display: "flex", alignItems: "center", mr: 1 }}>
                <VerifiedUserOutlinedIcon color="primary" sx={{ mr: 0.5, width: 20, height: 20 }} />
                <Typography color="primary" style={{ fontSize: 14 }}>
                  20
                </Typography>
              </Box>
            </Tooltip>
          </Box> */}
          <Box sx={{ display: "flex", overflowX: "scroll" }} dir="ltr">
            {data?.map((item: any, index: number) => (
              <Box key={index} sx={{ minWidth: "100%", height: "fit-content", mr: 4 }}>
                <Grid className={classes.headerEvent} sx={{ display: "flex", alignItems: "center" }} container>
                  <img src={demoImg6} alt="" />
                  <Typography variant="h6" sx={{ ml: 1 }} onClick={() => handleViewDetail(item?.eventDetail?.id)}>
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
                </Grid>
                <Box sx={{ display: "flex", background: "#d8dfe6", flexDirection: "column", p: 2, borderRadius: 1 }}>
                  <Box sx={{ display: "flex" }}>
                    <Box sx={{ display: "flex", alignItems: "center", mr: 1 }}>
                      <VisibilityOutlinedIcon sx={{ mr: 0.5, width: 20, height: 20 }} />
                      <Typography variant="subtitle2">Bạn có 1 vấn đề sắp hết hạn</Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", ml: 3 }}>
                      <HowToRegOutlinedIcon sx={{ mr: 0.5, width: 20, height: 20 }} />
                      <Typography variant="subtitle2">Số lượt đăng kí</Typography>
                      <Typography sx={{ fontSize: 14, ml: 1 }}>{item?.numberOfUser?.numberOfUser + 50}</Typography>
                    </Box>
                  </Box>
                  <Box sx={{ display: "flex" }}>
                    <Box sx={{ display: "flex", alignItems: "center", mr: 1 }}>
                      <VisibilityOutlinedIcon sx={{ mr: 0.5, width: 20, height: 20 }} />
                      <Typography variant="subtitle2">Số lượt xem</Typography>
                      <Typography sx={{ fontSize: 14, ml: 1 }}>{item?.eventDetail?.viewCount + 100}</Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", ml: 3 }}>
                      <HowToRegOutlinedIcon sx={{ mr: 0.5, width: 20, height: 20 }} />
                      <Typography variant="subtitle2">Số lượt đăng kí</Typography>
                      <Typography sx={{ fontSize: 14, ml: 1 }}>{item?.numberOfUser?.numberOfUser + 50}</Typography>
                    </Box>
                  </Box>
                  <Box sx={{ display: "flex", mt: 1 }}>
                    <Box sx={{ display: "flex", alignItems: "center", mr: 1 }}>
                      <EventBusyRoundedIcon sx={{ mr: 0.5, width: 20, height: 20 }} />
                      <Typography variant="subtitle2">Yêu cầu chưa có người giải quyết</Typography>
                      <Typography sx={{ fontSize: 14, ml: 1 }}>{item?.eventDetail?.viewCount}</Typography>
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", ml: 3 }}>
                      <PostAddRoundedIcon sx={{ mr: 0.5, width: 20, height: 20 }} />
                      <Typography variant="subtitle2">Yêu cầu mới</Typography>
                      <Typography sx={{ fontSize: 14, ml: 1 }}>{item?.numberOfUser?.numberOfUser}</Typography>
                    </Box>
                  </Box>

                  <Tooltip title="Thời gian kết thúc sự kiện">
                    <Box sx={{ display: "flex", alignItems: "center", mr: 1, mt: 1 }}>
                      <AccessTimeIcon sx={{ mr: 0.5, width: 20, height: 20 }} />
                      <Typography style={{ fontSize: 14 }}>
                        Từ{" "}
                        <span style={{ fontWeight: 600 }}>
                          {moment(item?.eventDetail?.createdAt).lang("vi").format("LL")}
                        </span>{" "}
                        tới ngày{" "}
                        <span style={{ fontWeight: 600 }}>
                          {moment(item?.eventDetail?.endAt).lang("vi").format("LL")}
                        </span>
                      </Typography>
                    </Box>
                  </Tooltip>
                </Box>
              </Box>
            ))}
          </Box>
          <br />
          <Divider />
        </>
      );
    }
  };

  const getListEventByUser = async () => {
    const data = await Event.getListEventByUser();
    setData(data.listEvent);
  };
  const getDataEventDuration = async () => {
    const data = await Event.getEventDuration();
    setDataEventDuration(data);
  };

  useEffect(() => {
    getListEventByUser();
    getDataEventDuration();
  }, [data?.length]);

  console.log(dataEventDuration, "duration");

  return (
    <Card>
      <Grid container>
        <Grid item xs={9}>
          <CardHeader title="Sự kiện đang diễn ra" subheader="Còn 4 ngày" />
        </Grid>
      </Grid>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Sự kiện đã tham gia" value="1" />
            <Tab label="Sự kiện ngắn hạn" value="2" />
            <Tab label="Sự kiện dài hạn" value="3" />
          </TabList>
        </Box>
        <TabPanel value="1">{itemEvent()}</TabPanel>
        <TabPanel value="2">
          <EventDuration data={dataEventDuration?.shortTermEvents} />
        </TabPanel>
        <TabPanel value="3">Sự kiện dài hạn</TabPanel>
      </TabContext>
    </Card>
  );
};

export default OnGoingEvent;
