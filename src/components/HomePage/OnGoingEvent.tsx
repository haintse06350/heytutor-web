import React, { useEffect, useState } from "react";
//material
import { Card, CardHeader, Box, Grid, Typography, Divider, Button, Tooltip } from "@mui/material";
//lodash
// import { map } from "lodash";
//icons
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import HowToRegOutlinedIcon from "@mui/icons-material/HowToRegOutlined";
// import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import RecordVoiceOverOutlinedIcon from "@mui/icons-material/RecordVoiceOverOutlined";
import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";
import SupervisedUserCircleOutlinedIcon from "@mui/icons-material/SupervisedUserCircleOutlined";
import { useNavigate } from "react-router-dom";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Event } from "../../models/event";
import moment from "moment";
import { map } from "lodash";
import { useStyles } from "./HomePage.style";

const OnGoingEvent = () => {
  const [value, setValue] = React.useState("1");
  const classes = useStyles();
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  const navigate = useNavigate();

  const [data, setData]: any = useState(null);
  console.log(data);

  const handleViewDetail = (eventId: any) => {
    //navigate sang URL detail EVENT
    navigate(`/event-detail?eventid=${eventId}`);
  };

  const itemEvent = (data: any) => {
    return (
      <>
        <Box sx={{ display: "flex", alignItems: "center", px: 3, pt: 1 }}>
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
        </Box>
        <Box dir="ltr">
          {data?.map((item: any, index: number) => (
            <Box key={index}>
              <br />
              <Divider />

              <Grid className={classes.headerEvent} sx={{ display: "flex", alignItems: "center" }} container>
                <Grid item xs={10}>
                  <Typography variant="h6" sx={{ ml: 1 }}>
                    {item["Event.title"]}
                  </Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography
                    variant="caption"
                    color="#637381"
                    sx={{ ml: 1, display: "flex", justifyContent: "flex-start" }}>
                    {moment(item["Event.updatedAt"]).lang("vi").format("LL")}
                  </Typography>
                </Grid>
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
              </Box>
              <Grid item>
                <Button
                  size="small"
                  color="inherit"
                  onClick={() => handleViewDetail(item["Event.id"])}
                  variant="contained">
                  Xem chi tiết
                </Button>
              </Grid>
            </Box>
          ))}
        </Box>
        <br />
        <Divider />
        <Box sx={{ p: 2, textAlign: "right" }}>
          <Button size="small" color="inherit" endIcon={<ArrowForwardIosOutlinedIcon />}>
            Xem chi tiết
          </Button>
        </Box>
      </>
    );
  };

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

  useEffect(() => {
    getListEventByUser();
  }, []);

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
        <TabPanel value="1"> {itemEvent(data)}</TabPanel>
        <TabPanel value="2">Sự kiện ngắn hạn</TabPanel>
        <TabPanel value="3">Sự kiện đã dài hạn</TabPanel>
      </TabContext>
    </Card>
  );
};

export default OnGoingEvent;
