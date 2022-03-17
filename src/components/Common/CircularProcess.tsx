import React from "react";
import { Box, CircularProgress } from "@mui/material";

export default function CircularProgressFunc() {
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
}
