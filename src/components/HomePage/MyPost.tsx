import React, { useContext } from "react";
//material
import { Typography, Box, Button, Divider } from "@mui/material";
import { useTheme } from "@mui/material/styles";
//components
import MainTabLayout from "../../layout/MainTabLayout";
import { PostCtx } from "../../context/post/state";

import { StatItem } from "../Common/StatItem";
//icons
import ArticleIcon from "@mui/icons-material/Article";
import SubjectIcon from "@mui/icons-material/Subject";
import PendingActionsOutlinedIcon from "@mui/icons-material/PendingActionsOutlined";
import FactCheckOutlinedIcon from "@mui/icons-material/FactCheckOutlined";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
//lodash
import { isEmpty } from "lodash";
import { map } from "lodash";

import { Link as RouterLink, useNavigate } from "react-router-dom";

const myPostData = {
  subject: ["PE", "PRO", "CSD", "DBI"],
  totalPost: 10,
  registeredCount: 20,
  pendingPost: 1,
  activePostCount: 3,
  donePostCount: 6,
};

const MyPost = () => {
  const { createPost } = useContext(PostCtx);
  const theme = useTheme();
  const [onHoverElem, setOnHoverElem]: any = React.useState(null);
  const navigate = useNavigate();

  const onNavigate = (path: string) => {
    navigate(path);
  };

  const renderMyPostContent = () => {
    if (isEmpty(myPostData)) {
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
              tab="subjects"
              icon={<SubjectIcon sx={{ color: theme.palette.grey[500] }} />}
              data={map(myPostData.subject, (subject: string) => `${subject}, `)}
              title="Môn học"
              subTitle="Số lượng các môn học của vấn đề được đăng ký"
              onNavigate={() => onNavigate("/my-request?detail=subjects")}
            />

            <StatItem
              onHoverElem={onHoverElem}
              setOnHoverElem={setOnHoverElem}
              tab="pendingPost"
              icon={<PendingActionsOutlinedIcon sx={{ color: theme.palette.grey[500] }} />}
              data={myPostData.pendingPost}
              title="Vấn đề chưa có người đăng ký "
              subTitle="Số lượng các vấn đề chưa có người đăng ký"
              onNavigate={() => onNavigate("/my-request?detail=pending")}
            />
            <StatItem
              onHoverElem={onHoverElem}
              setOnHoverElem={setOnHoverElem}
              tab="activePost"
              icon={<AssignmentOutlinedIcon sx={{ color: theme.palette.grey[500] }} />}
              data={myPostData.activePostCount}
              title="Vấn đề đã có người đăng ký"
              subTitle="Số lượng các vấn đề đã có người đăng ký"
              onNavigate={() => onNavigate("/my-request?detail=active")}
            />
            <StatItem
              onHoverElem={onHoverElem}
              setOnHoverElem={setOnHoverElem}
              tab="processSupportPost"
              icon={<FactCheckOutlinedIcon sx={{ color: theme.palette.grey[500] }} />}
              data={myPostData.donePostCount}
              title="Vấn đề đang được hỗ trợ"
              subTitle="Số lượng các vấn đề  đang trong quá trình hỗ trợ"
              onNavigate={() => onNavigate("/my-request?detail=done")}
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
