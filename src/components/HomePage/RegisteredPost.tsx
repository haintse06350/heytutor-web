import React, { useState } from "react";
//material
import { Box, Typography, Button, Divider, CircularProgress } from "@mui/material";
import { useTheme } from "@mui/material/styles";
//components
import MainTabLayout from "../../layout/MainTabLayout";
import { StatItem } from "../Common/StatItem";
//library
// import { isEmpty } from "lodash";
import { useNavigate } from "react-router-dom";
//icons
import FactCheckIcon from "@mui/icons-material/FactCheck";
import AppRegistrationOutlinedIcon from "@mui/icons-material/AppRegistrationOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import ConfirmationNumberOutlinedIcon from "@mui/icons-material/ConfirmationNumberOutlined";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { Link as RouterLink } from "react-router-dom";
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
            Tạo bài viết ngay để tìm người giải quyết vấn đề của bạn
          </Typography>
          <Button variant="contained" color="info">
            Tìm kiếm nhu cầu
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
                data={data.nbOfPendingPost}
                title="Vấn đề đã đăng ký"
                subTitle="Số vấn đề tôi đã đăng ký hỗ trợ"
                onNavigate={() => onNavigate("/registered-request?detail=registered")}
              />
              <StatItem
                onHoverElem={onHoverElem}
                setOnHoverElem={setOnHoverElem}
                tab="confirmed"
                icon={<AssignmentOutlinedIcon sx={{ color: theme.palette.grey[500] }} />}
                data={data.nbOfConfirmedPost}
                title="Vấn đề tôi đang hỗ trợ"
                subTitle="Số vấn đề tôi đang trong quá trình hỗ trợ"
                onNavigate={() => onNavigate("/registered-request?detail=confirmed")}
              />
              <StatItem
                onHoverElem={onHoverElem}
                setOnHoverElem={setOnHoverElem}
                tab="onEvent"
                icon={<ConfirmationNumberOutlinedIcon sx={{ color: theme.palette.grey[500] }} />}
                data={data.nbOfPostOnEvent}
                title="Vấn đề tôi đang hỗ trợ trong các sự kiện"
                subTitle="Số vấn đề tôi đang hỗ trợ trong các sự kiện"
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
                {openInformation ? "Ẩn" : "Hiển thị"}
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
                  Xem chi tiết
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
      title={"Vấn đề tôi đăng kí hỗ trợ"}
      content={renderRegisterPost()}
      type="registeredPost"
      icon={<FactCheckIcon />}
    />
  );
};

export default RegisteredPost;
