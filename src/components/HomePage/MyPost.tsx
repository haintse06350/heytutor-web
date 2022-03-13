import React, { useContext } from "react";
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
import DoneAllIcon from "@mui/icons-material/DoneAll";
import EventNoteIcon from "@mui/icons-material/EventNote";
//lodash
// import { isEmpty } from "lodash";

import { Link as RouterLink, useNavigate } from "react-router-dom";

const MyPost = (props: any) => {
  const { data } = props;

  const { createPost } = useContext(PostCtx);
  const theme = useTheme();
  const [onHoverElem, setOnHoverElem]: any = React.useState(null);
  const navigate = useNavigate();

  const onNavigate = (path: string) => {
    navigate(path);
  };

  const renderMyPostContent = () => {
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
          <Button variant="contained" color="primary" onClick={() => createPost()}>
            Tạo bài viết
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
              tab="pendingPost"
              icon={<PendingActionsOutlinedIcon sx={{ color: theme.palette.grey[500] }} />}
              data={data.nbOfPendingPost}
              title="Vấn đề chưa có người đăng ký "
              subTitle="Số lượng các vấn đề chưa có người đăng ký"
              onNavigate={() => onNavigate("/my-request?detail=pending")}
            />
            <StatItem
              onHoverElem={onHoverElem}
              setOnHoverElem={setOnHoverElem}
              tab="activePost"
              icon={<AssignmentOutlinedIcon sx={{ color: theme.palette.grey[500] }} />}
              data={data.nbOfActivePost}
              title="Vấn đề đã có người đăng ký"
              subTitle="Số lượng các vấn đề đã có người đăng ký"
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
              tab="donePost"
              icon={<DoneAllIcon sx={{ color: theme.palette.grey[500] }} />}
              data={data.nbOfDonePost}
              title="Vấn đề đã hoàn thành hỗ trợ"
              subTitle="Số lượng các vấn đề  đã hoàn thành quá trình hỗ trợ"
              onNavigate={() => onNavigate("/my-request?detail=done")}
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
            <StatItem
              onHoverElem={onHoverElem}
              setOnHoverElem={setOnHoverElem}
              tab="allPost"
              icon={<EventNoteIcon sx={{ color: theme.palette.grey[500] }} />}
              data={data.nbOfAllPost}
              title="Tất cả vấn đề của bạn"
              subTitle="Số lượng các vấn đề của bạn từ trước đên nay"
              onNavigate={() => onNavigate("/my-request?detail=all")}
            />
          </Box>
          <Divider />
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
        </>
      );
    }
  };
  return (
    <MainTabLayout
      title={"Vấn đề tôi cần hỗ trợ"}
      content={renderMyPostContent()}
      type="myPost"
      icon={<ArticleIcon />}
    />
  );
};

export default MyPost;
