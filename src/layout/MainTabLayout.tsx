import React from "react";
// material
import { styled } from "@mui/material/styles";
import { Card, Typography, Divider } from "@mui/material";
// utils

// ----------------------------------------------------------------------

const MainTabLayout = (props: any) => {
  const { title, icon, content } = props;

  // const getTabBgColor = (type: string, theme: any) => {
  //   switch (type) {
  //     case "myPost":
  //       return {
  //         color: theme.palette.primary.darker,
  //         backgroundColor: theme.palette.primary.lighter,
  //       };

  //     case "registeredPost":
  //       return {
  //         color: theme.palette.info.darker,
  //         backgroundColor: theme.palette.info.lighter,
  //       };
  //     case "mostRecentPost":
  //       return {
  //         color: theme.palette.error.darker,
  //         backgroundColor: theme.palette.error.lighter,
  //       };
  //     case "event":
  //       return {
  //         color: theme.palette.warning.darker,
  //         backgroundColor: theme.palette.warning.lighter,
  //       };
  //   }
  // };

  const RootStyle = styled(Card)(({ theme }: any) => ({
    display: "flex",
    flexDirection: "column",
    height: "100%",
    boxShadow: "none",
    textAlign: "center",
    padding: theme.spacing(2),
    color: "#000",
    backgroundColor: "#fff",
  }));

  const CardHeaderStyle = styled("div")(({ theme }: any) => ({
    margin: "0",
    padding: "5px 0px",
    display: "flex",
    alignItems: "center",
    width: "100%",
    height: theme.spacing(4),
    justifyContent: "flex-start",
    color: "#000",
  }));

  return (
    <RootStyle>
      <CardHeaderStyle>
        {icon}
        <Typography variant="subtitle2" sx={{ fontWeight: 900, ml: 1 }}>
          {title}
        </Typography>
      </CardHeaderStyle>
      <Divider />
      {content}
    </RootStyle>
  );
};

export default MainTabLayout;
