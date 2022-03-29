import React from "react";
import { Typography, Box, Grid, Tooltip } from "@mui/material";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";

export const StatItem = (props: any) => {
  const { onHoverElem, setOnHoverElem, tab, icon, data, title, subTitle, onNavigate } = props;
  return (
    <Box
      onMouseEnter={() => setOnHoverElem(tab)}
      onMouseLeave={() => setOnHoverElem(null)}
      onClick={() => onNavigate()}
      py={0.75}
      sx={{
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        cursor: "pointer",
      }}>
      <Grid container spacing={1}>
        <Grid item>{icon}</Grid>
        <Grid flexGrow={1} item>
          <Tooltip title={subTitle}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography color={"text.primary"} variant="subtitle2" align="left">
                {title}:
              </Typography>
              <Typography
                ml={1}
                color={tab === "subjects" ? "primary.main" : "text.primary"}
                variant="subtitle2"
                noWrap>
                {data}
              </Typography>
            </Box>
          </Tooltip>
        </Grid>
        <Grid display={onHoverElem === tab ? "flex" : "none"} alignItems="center" item>
          <Box width="100%">
            <ArrowForwardIosOutlinedIcon sx={{ width: 12 }} />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
