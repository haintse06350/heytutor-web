import React from "react";
//material
import { Box, Typography, Button, Divider } from "@mui/material";
import { useTheme } from "@mui/material/styles";
//components
import MainTabLayout from "../../layout/MainTabLayout";
import { StatItem } from "../Common/StatItem";
//library
import { isEmpty } from "lodash";
import { useNavigate } from "react-router-dom";
//icons
import FactCheckIcon from "@mui/icons-material/FactCheck";
import AppRegistrationOutlinedIcon from "@mui/icons-material/AppRegistrationOutlined";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import PendingActionsOutlinedIcon from "@mui/icons-material/PendingActionsOutlined";
import FactCheckOutlinedIcon from "@mui/icons-material/FactCheckOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import ConfirmationNumberOutlinedIcon from "@mui/icons-material/ConfirmationNumberOutlined";

import { Link as RouterLink } from "react-router-dom";

const registerdData = {
  registeredPostCount: 10,
  activePostCount: 3,
  pendingPost: 2,
  donePostCount: 4,
};

const RegisteredPost = () => {
  const [onHoverElem, setOnHoverElem]: any = React.useState(null);
  const theme = useTheme();
  const navigate = useNavigate();

  const onNavigate = (path: string) => {
    navigate(path);
  };

  const renderRegisterPost = () => {
    if (isEmpty(registerdData)) {
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
          <Box
            sx={{
              padding: "5px 0px",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "space-between",
              flexGrow: 1,
            }}>
            <StatItem
              onHoverElem={onHoverElem}
              setOnHoverElem={setOnHoverElem}
              tab="registered"
              icon={<AppRegistrationOutlinedIcon sx={{ color: theme.palette.grey[500] }} />}
              data={registerdData.registeredPostCount}
              title="Registered"
              onNavigate={() => onNavigate("/registered-request?detail=registered")}
            />
            <StatItem
              onHoverElem={onHoverElem}
              setOnHoverElem={setOnHoverElem}
              tab="confirmed"
              icon={<ConfirmationNumberOutlinedIcon sx={{ color: theme.palette.grey[500] }} />}
              data={registerdData.activePostCount}
              title="Confirmed"
              onNavigate={() => onNavigate("/registered-request?detail=confirmed")}
            />
            <StatItem
              onHoverElem={onHoverElem}
              setOnHoverElem={setOnHoverElem}
              tab="pending"
              icon={<PendingActionsOutlinedIcon sx={{ color: theme.palette.grey[500] }} />}
              data={registerdData.pendingPost}
              title="Pending"
              onNavigate={() => onNavigate("/registered-request?detail=pending")}
            />
            <StatItem
              onHoverElem={onHoverElem}
              setOnHoverElem={setOnHoverElem}
              tab="active"
              icon={<AssignmentOutlinedIcon sx={{ color: theme.palette.grey[500] }} />}
              data={registerdData.activePostCount}
              title="Active"
              onNavigate={() => onNavigate("/registered-request?detail=active")}
            />
            <StatItem
              onHoverElem={onHoverElem}
              setOnHoverElem={setOnHoverElem}
              tab="done"
              icon={<FactCheckOutlinedIcon sx={{ color: theme.palette.grey[500] }} />}
              data={registerdData.activePostCount}
              title="Done"
              onNavigate={() => onNavigate("/registered-request?detail=done")}
            />
          </Box>
          <Divider />
          <Box sx={{ pt: 2, textAlign: "right" }}>
            <Button
              to="/registered-request"
              size="small"
              color="inherit"
              component={RouterLink}
              endIcon={<ArrowForwardIosOutlinedIcon />}>
              View detail
            </Button>
          </Box>
        </>
      );
    }
  };
  return (
    <MainTabLayout
      title={"Vấn đề đã đăng kí"}
      content={renderRegisterPost()}
      type="registeredPost"
      icon={<FactCheckIcon />}
    />
  );
};

export default RegisteredPost;
