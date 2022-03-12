import React from "react";
import { map } from "lodash";
import { purple } from "@mui/material/colors";
//material
import { Typography, Box, Tooltip, Button, ButtonProps, Grid, Divider } from "@mui/material";
//components
import MainTabLayout from "../../layout/MainTabLayout";
// icons
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import HowToRegOutlinedIcon from "@mui/icons-material/HowToRegOutlined";
import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined";
// style
// import { useStyles } from "./HomePage.style";
import { styled } from "@mui/material/styles";
const RecentPost = () => {
  const ColorButton = styled(Button)<ButtonProps>(({ theme }) => ({
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: purple[500],
    boxShadow: "0 8px 16px 0 rgb(181 25 208 / 24%)",
    "&:hover": {
      backgroundColor: purple[700],
    },
  }));
  const handleViewDetail = () => {
    console.log("view detail clicked");
  };

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
        <Box>
          {map(["1", "2"], (item: any, index: number) => (
            <>
              <Box sx={{ my: 1, px: 1 }}>
                <Box sx={{ display: "flex" }}>
                  <Typography variant="subtitle1" sx={{ textAlign: "left" }} noWrap>
                    Tiêu đề của bài post
                  </Typography>
                  <Typography variant="caption" color="#637381" sx={{ ml: 1 }}>
                    Hôm nay
                  </Typography>
                </Box>

                <Grid container sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                  <Grid item xs={8} md={8} sx={{ display: "flex" }}>
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
                  </Grid>
                  <Grid item xs={4} md={4} sx={{ display: "flex", justifyContent: "center" }}>
                    <ColorButton variant="contained" onClick={handleViewDetail}>
                      Xem chi tiết
                    </ColorButton>
                  </Grid>
                </Grid>
              </Box>
              <Divider />
            </>
          ))}
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
