import React from "react";
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
import FactCheckOutlinedIcon from "@mui/icons-material/FactCheckOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import ConfirmationNumberOutlinedIcon from "@mui/icons-material/ConfirmationNumberOutlined";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import EventNoteIcon from "@mui/icons-material/EventNote";
import { Link as RouterLink } from "react-router-dom";

const RegisteredPost = (props: any) => {
  const { data } = props;
  const [onHoverElem, setOnHoverElem]: any = React.useState(null);
  const theme = useTheme();
  const navigate = useNavigate();

  const onNavigate = (path: string) => {
    navigate(path);
  };

  const renderRegisterPost = () => {
    if (!data) {
      return (
        <Box
          sx={{
            display: "flex",
            width: "568px",
            height: "470px",
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
              subTitle="Số vấn đề tôi đã đăng ký hỗ trợ nhưng chưa được xác nhận"
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
              onNavigate={() => onNavigate("/registered-request?detail=isActive")}
            />

            <StatItem
              onHoverElem={onHoverElem}
              setOnHoverElem={setOnHoverElem}
              tab="active"
              icon={<FactCheckOutlinedIcon sx={{ color: theme.palette.grey[500] }} />}
              data={data.nbOfActivePost}
              title="Vấn đề tôi đã đăng ký thành công nhưng chưa trao đổi thông tin"
              subTitle="Số vấn đề tôi đang đăng ký hỗ trợ thành công nhưng hai người chưa trao đổi thông tin"
              onNavigate={() => onNavigate("/registered-request?detail=isActive")}
            />
            <StatItem
              onHoverElem={onHoverElem}
              setOnHoverElem={setOnHoverElem}
              tab="done"
              icon={<DoneAllIcon sx={{ color: theme.palette.grey[500] }} />}
              data={data.nbOfDonePost}
              title="Vấn đề tôi đã giải quyết thành công"
              subTitle="Số vấn đề tôi đã giải quyết hỗ trợ thành công"
              onNavigate={() => onNavigate("/registered-request?detail=isDone")}
            />
            <StatItem
              onHoverElem={onHoverElem}
              setOnHoverElem={setOnHoverElem}
              tab="allPost"
              icon={<EventNoteIcon sx={{ color: theme.palette.grey[500] }} />}
              data={data.nbOfAllPost}
              title="Tất cả vấn đề tôi đã đăng ký"
              subTitle="Số vấn đề tôi đã hỗ trợ từ trước tới nay"
              onNavigate={() => onNavigate("/registered-request?detail=all")}
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
              Xem chi tiết
            </Button>
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
