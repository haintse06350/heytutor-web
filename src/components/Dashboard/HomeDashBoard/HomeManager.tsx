import {
  Box,
  Card,
  Grid,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  IconButton,
  Tooltip,
  TableBody,
  Menu,
  MenuItem,
  InputLabel,
  Select,
  SelectChangeEvent,
  Avatar,
} from "@mui/material";
import React, { useState } from "react";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import VisibilityIcon from "@mui/icons-material/Visibility";
import MoodBadIcon from "@mui/icons-material/MoodBad";
import SportsScoreIcon from "@mui/icons-material/SportsScore";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
// import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { useStyles } from "./HomeManager.style";
import { LineStatistical } from "./LineStatistical";
import { stringAvatar } from "../../UserProfile/helper";

const HomeManager = () => {
  const renderGeneralStatistic = [
    { title: "Tổng bài đăng", data: "1200", dataStatus: 2.7 },
    { title: "Tổng người đăng kí giải quyết vấn đề", data: "200", dataStatus: -2.7 },
    { title: "Tổng sự kiện", data: "10", dataStatus: 2.7 },
  ];
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const classes = useStyles();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  // const [orderById, setOrderById] = useState(true);
  function createData(id: number, name: string, status: number, position: string) {
    return {
      id,
      name,
      status,
      position,
    };
  }

  const rows = [
    createData(1, "Cao Duc Anh", 1, "Cộng tác viên 4"),
    createData(2, "Cao Duc Anh", 2, "Cộng tác viên 1"),
    createData(3, "Nguyen Trung Hai", 1, "Cộng tác viên 3"),
    createData(4, "Le Huy Chuong", 1, "Cộng tác viên 5"),
    createData(5, "Nguyen DN Long", 2, "Cộng tác viên 1"),
  ];

  function user(id: number, name: string, score: number) {
    return {
      id,
      name,
      score,
    };
  }

  const topUser = [
    user(1, "Cao Duc Anh", 9042000),
    user(2, "Nguyen Trung Hai", 500000),
    user(3, "Le Huy Chuong", 450000),
  ];

  const [selectTime, setSelectTime] = useState("1");

  const handleChangeTime = (event: SelectChangeEvent) => {
    setSelectTime(event.target.value as string);
  };
  return (
    <>
      <Grid container spacing={2}>
        <Grid container item>
          <Grid item xs={6} md={8} lg={8}>
            <Typography variant="h6"> Chào mừng bạn trở lại với quản lí</Typography>
          </Grid>
          <Grid item xs={6} md={4} lg={4} sx={{ textAlign: "right" }}>
            <InputLabel id="select-time">Hiển thị theo</InputLabel>
            <Select
              sx={{ backgroundColor: "#fff" }}
              labelId="select-time"
              id="demo-select-time"
              label="Hiển thị theo"
              value={selectTime}
              onChange={handleChangeTime}>
              <MenuItem value={1}>Hôm nay</MenuItem>
              <MenuItem value={2}>Tuần này</MenuItem>
              <MenuItem value={3}>Tháng này</MenuItem>
              <MenuItem value={4}>Chọn thời gian</MenuItem>
            </Select>
          </Grid>
        </Grid>
        <Grid container item spacing={2}>
          {renderGeneralStatistic.map((item, index) => (
            <Grid item key={index} xs={12} md={4} lg={4} sx={{ mt: 2 }}>
              <Card sx={{ p: 2 }}>
                <Typography variant="subtitle2">{item.title}</Typography>
                <Box sx={{ display: "flex" }}>
                  {item.dataStatus > 0 ? <TrendingUpIcon color="success" /> : <TrendingDownIcon color="error" />}
                  <Typography sx={{ ml: 1 }}>{item.dataStatus} % </Typography>
                </Box>
                <Typography variant="h4">Tổng: {item.data} </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Grid container item spacing={1} sx={{ mt: 1 }}>
          <Grid
            className={classes.interactiveUser}
            item
            xs={12}
            md={7.8}
            lg={7.8}
            sx={{
              ml: 2,
              mr: 2,
            }}>
            <LineStatistical />
          </Grid>
          <Grid item xs={12} md={3.7} lg={3.7} className={classes.topRegister}>
            <Typography variant="subtitle2" sx={{ p: 1 }}>
              Xếp hạng người đi hỗ trợ
            </Typography>
            <Grid container>
              {topUser.map((item, index: number) => (
                <Box key={index} className={classes.topUser}>
                  <Avatar
                    {...stringAvatar(item.name)}
                    sx={{ border: "2px solid #94a4c4", borderRadius: "50%", mr: 2 }}
                  />
                  <Box sx={{ width: "70%" }}>
                    <Typography noWrap variant="body1">
                      {item?.name}
                    </Typography>
                    <Box sx={{ display: "flex" }}>
                      <SportsScoreIcon />
                      <Typography variant="body2" sx={{ opacity: 0.8 }}>
                        {item?.score > 1000 ? `${item.score / 1000} k` : `${item.score}`}
                      </Typography>
                    </Box>
                  </Box>
                  <Box className={classes.cupIcon}>
                    <EmojiEventsIcon sx={{ color: item?.id === 1 ? "gold" : item?.id === 2 ? "silver" : "brown" }} />
                  </Box>
                </Box>
              ))}
            </Grid>
          </Grid>
        </Grid>

        <Grid container item>
          <Grid item lg={4} md={4} xs={12}>
            <Box></Box>
          </Grid>
          <Grid item lg={8} md={8} xs={12}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    <div className={classes.tableBox}>
                      <TableCell>Id</TableCell>
                      {/* {orderById ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />} */}
                      <ArrowDownwardIcon />
                    </div>
                    <TableCell align="right">Tên</TableCell>
                    <TableCell align="right">Trạng thái</TableCell>
                    <TableCell align="right">Vị trí</TableCell>
                    <TableCell align="right"></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell component="th" scope="row">
                        {row.id}
                      </TableCell>
                      <TableCell align="right">{row.name}</TableCell>
                      <TableCell align="right" sx={{ color: row.status === 1 ? "green" : "red" }}>
                        {row.status === 1 ? "active" : "inactive"}
                      </TableCell>
                      <TableCell align="right">{row.position}</TableCell>
                      <TableCell align="right" className={classes.iconMoreHoriz}>
                        <IconButton
                          aria-controls={open ? "account-menu" : undefined}
                          aria-haspopup="true"
                          aria-expanded={open ? "true" : undefined}
                          onClick={handleClick}>
                          <Tooltip title="Xem thêm">
                            <MoreHorizIcon />
                          </Tooltip>
                        </IconButton>
                        <Menu
                          anchorEl={anchorEl}
                          id="account-menu"
                          open={open}
                          onClose={handleCloseMenu}
                          transformOrigin={{ horizontal: "right", vertical: "top" }}
                          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}>
                          <MenuItem>
                            <VisibilityIcon /> Xem chi tiết
                          </MenuItem>
                          <MenuItem>
                            <MoodBadIcon /> Cấm/bỏ cấm
                          </MenuItem>
                        </Menu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default HomeManager;
