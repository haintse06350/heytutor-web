import React, { useState, useEffect } from "react";
import { Box, Grid, Typography, Divider, Button, Tooltip } from "@mui/material";

//

//lodash
// import { map } from "lodash";

//icons

import HowToRegOutlinedIcon from "@mui/icons-material/HowToRegOutlined";
// import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import moment from "moment";
// import Image from "../../assets/27366933.jpg";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useNavigate } from "react-router-dom";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import JoinEvent from "./JoinEvent";

const EventDuration = (data: any) => {
  const navigate = useNavigate();

  const onClickShow = (id: any) => {
    setCheckShowMore(!checkShowMore);
    setItemCheck(id);
  };
  const [checkShowMore, setCheckShowMore] = useState(false);
  const [itemCheck, setItemCheck] = useState();
  const [showListEvent, setShowListEvent] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const handleViewDetail = (eventId: any) => {
    //navigate sang URL detail EVENT
    navigate(`/event-detail?eventid=${eventId}`);
  };
  const handleEventList = () => {
    navigate(`/event-list`);
  };

  const handleClickOpenDialog = () => {
    setOpenDialog(true);
  };

  useEffect(() => {
    data?.length > 3 ? setShowListEvent(true) : setShowListEvent(false);
  }, [data?.length]);

  return (
    <>
      {data?.data?.map((item: any, index: number) => (
        <Box key={index} sx={{ height: "fit-content" }}>
          <br />
          <Divider />

          <Grid sx={{ display: "flex", alignItems: "center" }} container>
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
          </Grid>

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
            <Button
              size="small"
              color="inherit"
              variant="outlined"
              endIcon={<ArrowForwardIcon />}
              onClick={handleClickOpenDialog}>
              Đăng ký
            </Button>
            <JoinEvent open={openDialog} onClose={() => setOpenDialog(false) } ></JoinEvent>
          </Grid>
        </Box>
      ))}
      {showListEvent && (
        <Box sx={{ p: 2, textAlign: "right" }}>
          <Typography sx={{ mb: 1 }}>Đăng hiển thị: 3/{data?.length}</Typography>
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
