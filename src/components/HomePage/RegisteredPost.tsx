import React, { useState } from "react";
//material
import { Box, Typography, Button, Divider, CircularProgress } from "@mui/material";
import { useTheme } from "@mui/material/styles";
//components
import MainTabLayout from "../../layout/MainTabLayout";
import { StatItem } from "../Common/StatItem";
//library
import { useNavigate } from "react-router-dom";
//icons
import FactCheckIcon from "@mui/icons-material/FactCheck";
import AppRegistrationOutlinedIcon from "@mui/icons-material/AppRegistrationOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
// import ConfirmationNumberOutlinedIcon from "@mui/icons-material/ConfirmationNumberOutlined";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Link as RouterLink } from "react-router-dom";
import FactCheckOutlinedIcon from "@mui/icons-material/FactCheckOutlined";
import { useStyles } from "./HomePage.style";

const RegisteredPost = (props: any) => {
  const { data } = props;
  const [onHoverElem, setOnHoverElem]: any = React.useState(null);
  const theme = useTheme();
  const navigate = useNavigate();
  const classes = useStyles();

  const onNavigate = (path: string) => {
    navigate(path, { state: { data } });
  };

  const [openInformation, setOpenInformation] = useState(true);

  const renderRegisterPost = () => {
    if (!data) {
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
    } else if (data?.length === 0) {
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
            T???o b??i vi???t ngay ????? t??m ng?????i gi???i quy???t v???n ????? c???a b???n
          </Typography>
          <Button variant="contained" color="info">
            T??m ki???m nhu c???u
          </Button>
        </Box>
      );
    } else {
      return (
        <>
          {openInformation && (
            <Box
              sx={{
                padding: "5px 0px",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start",
                justifyContent: "flex-start",
                flexGrow: 1,
              }}>
              <StatItem
                onHoverElem={onHoverElem}
                setOnHoverElem={setOnHoverElem}
                tab="pending"
                icon={<AppRegistrationOutlinedIcon sx={{ color: theme.palette.grey[500] }} />}
                data={data.nbOfActivePost + "/" + (data.nbOfTotalRegisteredPost - data.nbOfDonePost)}
                title="??ang trao ?????i"
                subTitle="S??? v???n ????? t??i ??ang trao ?????i ????? ???????c x??c nh???n l??m ng?????i h??? tr???"
                onNavigate={() => onNavigate("/registered-request?detail=registered")}
              />
              <StatItem
                onHoverElem={onHoverElem}
                setOnHoverElem={setOnHoverElem}
                tab="confirmed"
                icon={<FactCheckOutlinedIcon sx={{ color: theme.palette.grey[500] }} />}
                data={data.nbOfConfirmedPost + "/" + (data.nbOfTotalRegisteredPost - data.nbOfDonePost)}
                title="??ang h??? tr???"
                subTitle="S??? v???n ????? t??i ??ang trong qu?? tr??nh h??? tr???"
                onNavigate={() => onNavigate("/registered-request?detail=confirmed")}
              />
              <StatItem
                onHoverElem={onHoverElem}
                setOnHoverElem={setOnHoverElem}
                tab="confirmed"
                icon={<AssignmentOutlinedIcon sx={{ color: theme.palette.grey[500] }} />}
                data={data.nbOfPendingPost + "/" + (data.nbOfTotalRegisteredPost - data.nbOfDonePost)}
                title="??ang ch??? x??c nh???n"
                subTitle="S??? v???n ????? t??i ???? ????ng k?? nh??ng ch??a ???????c x??c nh???n"
                onNavigate={() => onNavigate("/registered-request?detail=confirmed")}
              />
            </Box>
          )}
          <Divider />
          <Box sx={{ display: "flex" }} className={classes.btnHideContentMyPost}>
            <Box sx={{ pt: 2, textAlign: "left" }}>
              <Button
                size="small"
                color="inherit"
                endIcon={openInformation ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                onClick={() => setOpenInformation(!openInformation)}>
                {openInformation ? "???n" : "Hi???n th???"}
              </Button>
            </Box>
            {openInformation && (
              <Box sx={{ pt: 2, textAlign: "right" }}>
                <Button
                  to="/registered-request"
                  size="small"
                  color="inherit"
                  component={RouterLink}
                  endIcon={<ArrowForwardIosOutlinedIcon />}>
                  Xem chi ti???t
                </Button>
              </Box>
            )}
          </Box>
        </>
      );
    }
  };
  return (
    <MainTabLayout
      title={"V???n ????? ????ng k?? h??? tr???"}
      content={renderRegisterPost()}
      type="registeredPost"
      icon={<FactCheckIcon />}
    />
  );
};

export default RegisteredPost;
