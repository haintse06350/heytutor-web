import React, { useState, useEffect } from "react";
import { Box, Grid, Typography, Divider, Button, Tooltip } from "@mui/material";

//

//lodash
// import { map } from "lodash";

//icons

import AccessTimeIcon from "@mui/icons-material/AccessTime";
import moment from "moment";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate } from "react-router-dom";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import JoinEvent from "./JoinEvent";
import PersonIcon from "@mui/icons-material/Person";
import GppGoodIcon from "@mui/icons-material/GppGood";
import GppMaybeIcon from "@mui/icons-material/GppMaybe";
import HowToRegIcon from "@mui/icons-material/HowToReg";
import demoImg6 from "../../assets/default_images/6.jpg";
import { useStyles } from "../HomePage/HomePage.style";

const EventDuration = (data: any) => {
  const navigate = useNavigate();
  const classes = useStyles();

  const [showListEvent, setShowListEvent] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [eventSelected, setEventSelected] = useState(null);
  const handleViewDetail = (eventId: any) => {
    navigate(`/event-detail?eventid=${eventId}`);
  };

  const handleEventList = () => {
    navigate(`/event-list`);
  };

  const handleClickOpenDialog = (data: any) => {
    setOpenDialog(true);
    setEventSelected(data);
  };

  useEffect(() => {
    if (data) {
      data.data?.length > 3 ? setShowListEvent(true) : setShowListEvent(false);
    }
  }, [data]);

  return (
    <>
      {data?.data?.slice(0, 3).map((item: any, index: number) => (
        <Box key={index} sx={{ minWidth: "100%", height: "fit-content", mr: 4, mb: 3 }}>
          <Grid className={classes.headerEvent} sx={{ display: "flex", alignItems: "center" }} container>
            <img src={demoImg6} alt="" />
            <Typography
              variant="subtitle1"
              sx={{ mt: 1, cursor: "pointer", textDecoration: "underline", width: "100%" }}
              onClick={() => handleViewDetail(item?.eventDetail?.id)}>
              {item?.eventDetail?.title}
            </Typography>
            <Typography variant="caption" sx={{ ml: 2 }}>
              {item?.eventDetail?.description}
            </Typography>
          </Grid>
          <Box sx={{ display: "flex", background: "#d8dfe6", flexDirection: "column", p: 2, borderRadius: 1 }}>
            <Tooltip title="Thời gian kết thúc sự kiện">
              <Box sx={{ display: "flex", alignItems: "center", mr: 1 }}>
                <AccessTimeIcon sx={{ mr: 0.5, width: 20, height: 20 }} />
                <Typography style={{ fontSize: 14 }}>
                  Từ{" "}
                  <span style={{ fontWeight: 500 }}>
                    {moment(item?.eventDetail?.createdAt).lang("vi").format("LL")}
                  </span>{" "}
                  tới ngày{" "}
                  <span style={{ fontWeight: 500 }}>{moment(item?.eventDetail?.endAt).lang("vi").format("LL")}</span>
                </Typography>
              </Box>
            </Tooltip>
            <Box sx={{ display: "flex" }}>
              <Grid container>
                <Grid item md={12} lg={6} xs={12}>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <PersonIcon sx={{ mr: 0.5, width: 20, height: 20 }} />
                    <Typography variant="subtitle2">Số người tham gia: </Typography>
                    <Typography sx={{ fontSize: 14, ml: 1 }}>{item?.eventUser?.numberOfUser}</Typography>
                  </Box>
                </Grid>
                <Grid item md={12} lg={6} xs={12}>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <HowToRegIcon sx={{ mr: 0.5, width: 20, height: 20 }} />
                    <Typography variant="subtitle2">Số người tham gia hỗ trợ: </Typography>
                    <Typography sx={{ fontSize: 14, ml: 0.5, mr: 1 }}>{item?.eventUser?.numberOfSP}</Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>
            <Box sx={{ display: "flex" }}>
              <Grid container>
                <Grid item md={12} lg={6} xs={12}>
                  <Box sx={{ display: "flex", alignItems: "center", mr: 1 }}>
                    <GppGoodIcon sx={{ mr: 0.5, width: 20, height: 20 }} />
                    <Typography variant="subtitle2">Số vấn đề hỗ trợ thành công: </Typography>
                    <Typography sx={{ fontSize: 14, ml: 1 }}>{item?.listPostDone}</Typography>
                  </Box>
                </Grid>
                <Grid item md={12} lg={6} xs={12}>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <GppMaybeIcon sx={{ mr: 0.5, width: 20, height: 20 }} />
                    <Typography variant="subtitle2">Số vấn đề đăng kí: </Typography>
                    <Typography sx={{ fontSize: 14, ml: 0.5, mr: 1 }}>{item?.listPost}</Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                size="small"
                color="primary"
                variant="contained"
                sx={{ width: 200 }}
                endIcon={<ArrowForwardIcon />}
                onClick={() => handleClickOpenDialog(item?.eventDetail)}>
                Đăng ký
              </Button>
            </Box>
          </Box>
          <Divider sx={{ mt: 2 }} />
        </Box>
      ))}

      <JoinEvent open={openDialog} onClose={() => setOpenDialog(false)} data={eventSelected}></JoinEvent>
      {showListEvent && (
        <Box sx={{ p: 2, textAlign: "right" }}>
          <Typography sx={{ mb: 1 }}>Đăng hiển thị: 3/{data?.data.length}</Typography>
          <Button
            variant="contained"
            size="small"
            color="inherit"
            onClick={handleEventList}
            endIcon={<ArrowForwardIosOutlinedIcon />}>
            Xem chi tiết
          </Button>
        </Box>
      )}
    </>
  );
};

export default EventDuration;
