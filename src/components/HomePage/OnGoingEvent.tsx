import React from "react";

//material
import { Card, CardHeader, Box, Grid, Typography, Divider, Button, Tooltip } from "@mui/material";
//lodash
import { map } from "lodash";
//icons
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import HowToRegOutlinedIcon from "@mui/icons-material/HowToRegOutlined";
import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined";
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import RecordVoiceOverOutlinedIcon from "@mui/icons-material/RecordVoiceOverOutlined";
import VerifiedUserOutlinedIcon from "@mui/icons-material/VerifiedUserOutlined";
import SupervisedUserCircleOutlinedIcon from "@mui/icons-material/SupervisedUserCircleOutlined";

import { Link as RouterLink } from "react-router-dom";
import EventPopover from "./Event/EventPopover";

const OnGoingEvent = () => {
  return (
    <Card>
      <Grid container>
        <Grid item xs={9}>
          <CardHeader title="Sự kiện đang diễn ra" subheader="Còn 4 ngày" />
        </Grid>
        <Grid item xs={3} sx={{ p: 3, textAlign: "end" }}>
          <EventPopover />
        </Grid>
      </Grid>
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
        {map(["1", "2"], (item: any, index: number) => (
          <Box key={index} sx={{ p: 3 }}>
            <Grid>
              <Typography variant="subtitle2">Tiêu đề bài viết</Typography>
              <Typography variant="caption">
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                industry standard dummy text ever since the 1500s
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                <Tooltip title="Số lượt xem">
                  <Box sx={{ display: "flex", alignItems: "center", mr: 1 }}>
                    <VisibilityOutlinedIcon sx={{ mr: 0.5, width: 20, height: 20 }} />
                    <Typography style={{ fontSize: 14 }}>10</Typography>
                  </Box>
                </Tooltip>
                <Tooltip title="Số lượt đăng kí">
                  <Box sx={{ display: "flex", alignItems: "center", mr: 1 }}>
                    <HowToRegOutlinedIcon sx={{ mr: 0.5, width: 20, height: 20 }} />
                    <Typography style={{ fontSize: 14 }}>5</Typography>
                  </Box>
                </Tooltip>
                <Tooltip title="Số bình luận">
                  <Box sx={{ display: "flex", alignItems: "center", mr: 1 }}>
                    <CommentOutlinedIcon sx={{ mr: 0.5, width: 20, height: 20 }} />
                    <Typography style={{ fontSize: 14 }}>15</Typography>
                  </Box>
                </Tooltip>
              </Box>
            </Grid>
          </Box>
        ))}
      </Box>
      <Divider />
      <Box sx={{ p: 2, textAlign: "right" }}>
        <Button to="#" size="small" color="inherit" component={RouterLink} endIcon={<ArrowForwardIosOutlinedIcon />}>
          View all
        </Button>
      </Box>
    </Card>
  );
};

export default OnGoingEvent;
