import React from "react";
import { Typography, Box, Grid } from "@mui/material";
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
        <Grid display="flex" alignItems="center" item>
          {icon}
        </Grid>
        <Grid flexGrow={1} item>
          <Box sx={{ display: "flex" }}>
            <Typography color={"text.primary"} variant="subtitle2" align="left">
              {title}:
            </Typography>
            <Typography
              ml={1}
              color={tab === "subjects" ? "primary.main" : "text.primary"}
              variant="subtitle2"
              align="left"
              noWrap>
              {data}
            </Typography>
          </Box>
          <Typography variant="caption" color={"text.primary"} align="left">
            {subTitle}
          </Typography>
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
