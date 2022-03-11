import React from "react";
//material
import { Typography, Box, Button } from "@mui/material";
//components
import MainTabLayout from "../../../layout/MainTabLayout";
//icons
import EventIcon from "@mui/icons-material/Event";

const EventJoined = () => {
  const renderEventJoined = (eventData: any) => {
    if (eventData.length === 0) {
      return (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
            flexGrow: 1,
          }}>
          <Typography variant="subtitle2" sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
            Tạo bài viết ngay để tìm người giải quyết vấn đề của bạn
          </Typography>
          <Button variant="contained" color="warning">
            Tham gia sự kiện
          </Button>
        </Box>
      );
    }
  };
  return <MainTabLayout title={"Sự kiện"} content={renderEventJoined([])} type="event" icon={<EventIcon />} />;
};

export default EventJoined;
