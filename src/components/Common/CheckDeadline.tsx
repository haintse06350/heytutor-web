import React from "react";
import { Box, Typography } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import moment from "moment";

export default function checkDeadline(props: string) {
  return (
    <>
      {moment.duration(moment(props).diff(moment().startOf("day"))).asDays() < 3 ? (
        <Box sx={{ display: "flex" }}>
          <AccessTimeIcon sx={{ mr: 0.5, width: 20, height: 20, color: "#db1c1c" }} />
          <Typography sx={{ color: "#db1c1c" }} style={{ fontSize: 14 }}>
            {moment(props).fromNow()}
          </Typography>
        </Box>
      ) : (
        <Box sx={{ display: "flex" }}>
          <AccessTimeIcon sx={{ mr: 0.5, width: 20, height: 20 }} />
          <Typography style={{ fontSize: 14 }}>{moment(props).fromNow()}</Typography>
        </Box>
      )}
    </>
  );
}
