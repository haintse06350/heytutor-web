import React from "react";
// MUI
import {
  Button,
  Card,
  Box,
  Grid,
  Typography,
  AvatarGroup,
  Avatar,
  //   Divider,
} from "@mui/material";

// class style
import { useStyles } from "./HomeSupperAdmin.style";

//icon

// import
import { stringAvatar } from "../../UserProfile/helper";
import { map } from "lodash";

const HomeSupperAdmin = () => {
  const classes = useStyles();
  const rolesList = [
    {
      id: 1,
      totalUser: 5,
      role: "Admin",
      users: [{ name: "trung hai" }, { name: "duc anh" }, { name: "huy le" }, { name: "chuong jason" }],
    },
    {
      id: 2,
      totalUser: 20,
      role: "Cộng tác viên",
      users: [{ name: "huy le" }, { name: "chuong jason" }, { name: "trung hai" }, { name: "duc anh" }],
    },
    { id: 5, totalUser: 500, role: "Sự kiện" },
    {
      id: 3,
      totalUser: 500,
      role: "Đăng kí hỗ trợ",
    },
    { id: 4, totalUser: 500, role: "Vấn đề" },
  ];

  const renderAvatarGroup = (users: any) => {
    return (
      <AvatarGroup max={3}>
        {map(users, (user: any) => (
          <Avatar alt="Remy Sharp" {...stringAvatar(user?.name)} />
        ))}
      </AvatarGroup>
    );
  };

  return (
    <Grid container className={classes.wrapper} spacing={2} sx={{ p: 1 }}>
      <Box sx={{ width: "100%" }}>
        <Typography variant="h4">Thống kê người dùng theo quyền</Typography>
        <Typography className={classes.totalListRole}>
          Danh sách người dùng theo quyền cho xem trước thông tin và các tính năng cơ bản tùy vào quyền của người dùng
        </Typography>
      </Box>
      {rolesList.map((role, index) => (
        <Grid key={index} item xs={12} md={6} lg={4} sx={{ height: "100%" }}>
          <Card sx={{ p: 2 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Typography className={classes.totalListRole}>
                Tổng {role.totalUser}
                {role.role === `Vấn đề` ? " bài đăng" : role.role === "Sự kiện" ? " bài đăng" : " người dùng"}
              </Typography>

              <Box>{renderAvatarGroup(role.users)}</Box>
            </Box>
            <Typography variant="h5">{role.role}</Typography>
            <Button>Thêm {role.role}</Button>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default HomeSupperAdmin;
