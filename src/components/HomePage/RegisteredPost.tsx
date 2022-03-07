import React from "react";
//material
import { Box, Typography, Button } from "@mui/material";
//icons
import FactCheckIcon from "@mui/icons-material/FactCheck";
//components
import MainTabLayout from "../../layout/MainTabLayout";

const RegisteredPost = () => {
  const renderRegisterPost = (registerdData: any) => {
    if (registerdData.length === 0) {
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
    }
  };
  return (
    <MainTabLayout
      title={"Vấn đề đã đăng kí"}
      content={renderRegisterPost([])}
      type="registeredPost"
      icon={<FactCheckIcon />}
    />
  );
};

export default RegisteredPost;
