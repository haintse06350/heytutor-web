import React from "react";
//material
import { Typography, Box, Tooltip } from "@mui/material";
//components
import MainTabLayout from "../../layout/MainTabLayout";
// icons
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import HowToRegOutlinedIcon from "@mui/icons-material/HowToRegOutlined";
import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined";

const RecentPost = () => {
  const renderMyRecentPost = (myRecentPostData: any) => {
    if (!myRecentPostData) {
      return (
        <Box sx={{ pb: 2 }}>
          <Typography variant="subtitle2">
            Các thông số về bài viết gần đây nhất của sẽ xuất hiện ở đây giúp bạn dễ dang theo dõi tiến trình của bài
            viết
          </Typography>
        </Box>
      );
    } else {
      return (
        <Box sx={{ my: 1, px: 1 }}>
          <Typography variant="subtitle2" sx={{ textAlign: "left" }} noWrap>
            Tiêu đề của bài post
          </Typography>
          <Typography variant="body2" sx={{ textAlign: "left" }}>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry
            standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to
            make a type specimen book. It has survived not only five centuries,
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
            <Tooltip title="Số lượt xem">
              <Box sx={{ display: "flex", alignItems: "center", mr: 1 }}>
                <VisibilityOutlinedIcon sx={{ mr: 0.5 }} />
                <span style={{ fontSize: 14 }}>10</span>
              </Box>
            </Tooltip>
            <Tooltip title="Số lượt đăng kí">
              <Box sx={{ display: "flex", alignItems: "center", mr: 1 }}>
                <HowToRegOutlinedIcon sx={{ mr: 0.5 }} />
                <span style={{ fontSize: 14 }}>5</span>
              </Box>
            </Tooltip>
            <Tooltip title="Số bình luận">
              <Box sx={{ display: "flex", alignItems: "center", mr: 1 }}>
                <CommentOutlinedIcon sx={{ mr: 0.5 }} />
                <span style={{ fontSize: 14 }}>15</span>
              </Box>
            </Tooltip>
          </Box>
        </Box>
      );
    }
  };
  return (
    <MainTabLayout
      title={"Vấn đề gần nhất của bạn"}
      content={renderMyRecentPost({ id: 1 })}
      type="mostRecentPost"
      icon={<AccessTimeIcon />}
    />
  );
};

export default RecentPost;
