import React from "react";
import { Box, CircularProgress, Typography } from "@mui/material";

export default function LoadingState() {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        height: "100vh",
        width: "100%",
      }}>
      <CircularProgress />
      <Typography sx={{ mt: 1 }} variant="body1">
        Đang tải dữ liệu...
      </Typography>
    </Box>
  );
}
