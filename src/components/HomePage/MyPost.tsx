import React, { useContext, useState } from "react";
//material
import { Typography, Box, Button, Divider, CircularProgress } from "@mui/material";
import { useTheme } from "@mui/material/styles";
//components
import MainTabLayout from "../../layout/MainTabLayout";
import { PostCtx } from "../../context/post/state";

import { StatItem } from "../Common/StatItem";
//icons
import ArticleIcon from "@mui/icons-material/Article";
import PendingActionsOutlinedIcon from "@mui/icons-material/PendingActionsOutlined";
import FactCheckOutlinedIcon from "@mui/icons-material/FactCheckOutlined";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import EventNoteIcon from "@mui/icons-material/EventNote";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
//lodash
// import { isEmpty } from "lodash";
import { useStyles } from "./HomePage.style";
import { Link as RouterLink, useNavigate } from "react-router-dom";

const MyPost = (props: any) => {
  const { data } = props;
  const classes = useStyles();
  const { createPost } = useContext(PostCtx);
  const theme = useTheme();
  const [onHoverElem, setOnHoverElem]: any = React.useState(null);
  const navigate = useNavigate();

  const onNavigate = (path: string) => {
    navigate(path);
  };

  const [openInformation, setOpenInformation] = useState(true);

  const renderMyPostContent = () => {
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
          <Button variant="contained" color="primary" onClick={() => createPost()}>
            Tạo bài viết
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
                flexGrow: 1,
              }}>
              <StatItem
                onHoverElem={onHoverElem}
                setOnHoverElem={setOnHoverElem}
                tab="pendingPost"
                icon={<PendingActionsOutlinedIcon sx={{ color: theme.palette.grey[500] }} />}
                data={data.nbOfPendingPost}
                title="Vấn đề chưa có người đăng ký "
                subTitle="Số lượng các vấn đề chưa có người đăng ký giúp đỡ"
                onNavigate={() => onNavigate("/my-request?detail=pending")}
              />
              <StatItem
                onHoverElem={onHoverElem}
                setOnHoverElem={setOnHoverElem}
                tab="activePost"
                icon={<AssignmentOutlinedIcon sx={{ color: theme.palette.grey[500] }} />}
                data={data.nbOfActivePost}
                title="Vấn đề đã có người đăng ký"
                subTitle="Số lượng các vấn đề đã có người đăng ký giúp đỡ"
                onNavigate={() => onNavigate("/my-request?detail=active")}
              />
              <StatItem
                onHoverElem={onHoverElem}
                setOnHoverElem={setOnHoverElem}
                tab="processSupportPost"
                icon={<FactCheckOutlinedIcon sx={{ color: theme.palette.grey[500] }} />}
                data={data.nbOfConfirmedPost}
                title="Vấn đề đang được hỗ trợ"
                subTitle="Số lượng các vấn đề  đang trong quá trình hỗ trợ"
                onNavigate={() => onNavigate("/my-request?detail=processing")}
              />
              <StatItem
                onHoverElem={onHoverElem}
                setOnHoverElem={setOnHoverElem}
                tab="onEventPost"
                icon={<EventNoteIcon sx={{ color: theme.palette.grey[500] }} />}
                data={data.nbOfPostOnEvent}
                title="Vấn đề đang tham gia trong các event"
                subTitle="Số lượng các vấn đề  đang tham gia của các event"
                onNavigate={() => onNavigate("/my-request?detail=onEvent")}
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
                  to="/my-request"
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
      title={"Vấn đề hiện tại tôi cần hỗ trợ"}
      content={renderMyPostContent()}
      type="myPost"
      icon={<ArticleIcon />}
    />
  );
};

export default MyPost;
