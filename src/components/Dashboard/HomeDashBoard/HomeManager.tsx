import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
// import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import VisibilityIcon from "@mui/icons-material/Visibility";
import SportsScoreIcon from "@mui/icons-material/SportsScore";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import {
  Avatar,
  Box,
  Card,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { renderCardImg } from "../../DetailPage/utils";
import { stringAvatar } from "../../UserProfile/helper";
// import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import { useStyles } from "./HomeManager.style";
import { LineStatistical } from "./LineStatistical";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
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

  function event(id: number, title: string, timeOut: string, nbUserRegister: number, nbUserRequest: number) {
    return {
      id,
      title,
      timeOut,
      nbUserRegister,
      nbUserRequest,
    };
  }

  const topEvent = [
    event(1, "Bạn đang thắc mắc về NWC , hãy tham gia với chúng tôi", "cuối tuần này", 450, 700),
    event(2, "[CodersX Sharing] AI PROGRAMMING WITH PYTHON", "cuối tuần này", 300, 500),
    event(3, "𝐅𝐏𝐓𝐔 𝐕𝐎𝐕𝐈𝐍𝐀𝐌 𝐂𝐋𝐔𝐁 𝐑𝐄𝐂𝐑𝐔𝐈𝐓𝐌𝐄𝐍𝐓", "cuối tuần này", 300, 450),
    event(4, "Tìm kiếm đồng đội vượt qua khó khăn mang tên : JPD ", "cuối tuần này", 200, 300),
    event(5, "Những điều bạn chưa biết về MLN ", "cuối tuần này", 100, 200),
  ];

  const [selectTime, setSelectTime] = useState("1");
  const handleChange = (event: SelectChangeEvent) => {
    setSelectTime(event.target.value as string);
  };
  return (
    <>
      <Grid container spacing={2}>
        <Grid container item>
          <Grid item xs={6} md={8} lg={8}></Grid>
          <Grid item xs={6} md={4} lg={4}>
            <Select
              id="demo-simple-select"
              sx={{ backgroundColor: "#fff" }}
              value={selectTime}
              label="Chọn thời gian"
              onChange={handleChange}>
              <MenuItem value={1}>Hôm nay</MenuItem>
              <MenuItem value={2}>Tuần này</MenuItem>
              <MenuItem value={3}>Tháng này</MenuItem>
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
            className={classes.borderBoxSizing}
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
          <Grid container item xs={12} md={3.7} lg={3.7} className={classes.borderBoxSizing}>
            <Typography variant="subtitle2" sx={{ p: 1 }}>
              Xếp hạng người đi hỗ trợ
            </Typography>
            <Grid item>
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

        <Grid container item spacing={2}>
          <Grid item lg={4} md={4} xs={12} sx={{ p: 2, mt: 2, ml: 2 }} className={classes.borderBoxSizing}>
            <Typography variant="subtitle2">Top 5 Xếp hạng sự kiện nổi bật</Typography>
            <Grid item>
              {topEvent.map((item, index: number) => (
                <Grid key={index} sx={{ mt: 2 }}>
                  <div className={classes.cardHeader}>
                    <div className={classes.cardImg}>
                      <img src={renderCardImg(index)} alt="" />
                    </div>
                    <div className={classes.postTitle}>
                      <Typography variant="subtitle1" noWrap>
                        {item.title}
                      </Typography>
                      <div className={classes.dueDate}>
                        <AccessTimeOutlinedIcon sx={{ color: "#94a4c4" }} />
                        <Typography
                          variant="subtitle2"
                          sx={{ color: "#94a4c4", fontSize: 12, fontWeight: 500, lineHeight: 1.5, ml: 1 }}>
                          Due on Nov 3
                        </Typography>
                      </div>
                      <Box sx={{ display: "flex" }}>
                        <Tooltip title="Số lượt xem">
                          <Box sx={{ display: "flex", alignItems: "center", mr: 1 }}>
                            <VisibilityIcon sx={{ mr: 0.5, width: 20, height: 20 }} />
                            <Typography style={{ fontSize: 14 }}>120</Typography>
                          </Box>
                        </Tooltip>
                        <Tooltip title="Số người đăng kí giải quyết vấn đề">
                          <Box sx={{ display: "flex", alignItems: "center", mr: 1 }}>
                            <SupervisedUserCircleIcon sx={{ mr: 0.5, width: 20, height: 20 }} />
                            <Typography style={{ fontSize: 14 }}>15</Typography>
                          </Box>
                        </Tooltip>
                      </Box>
                    </div>
                  </div>
                </Grid>
              ))}
            </Grid>
          </Grid>
          <Grid item lg={7.8} md={7.8} xs={12}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    {/* <div className={classes.tableBox}>
                      {/* {orderById ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />} */}
                    {/* <ArrowDownwardIcon /> */}
                    {/* </div> */}
                    <TableCell>Id</TableCell>
                    <TableCell align="right">Tên</TableCell>
                    <TableCell align="right">Vị trí</TableCell>
                    <TableCell align="right">Số bài đang quản lí</TableCell>
                    <TableCell align="right">Thời gian tham gia</TableCell>
                    <TableCell align="right">Trạng thái</TableCell>
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
                      <TableCell align="right">{row.position}</TableCell>
                      <TableCell align="right">{Math.floor(Math.random() * 20)}</TableCell>
                      <TableCell align="right">Hôm nay</TableCell>
                      <TableCell align="right">
                        <Tooltip title={row.status === 1 ? "active" : "inactive"}>
                          <FiberManualRecordIcon sx={{ color: row.status === 1 ? "green" : "red" }} />
                        </Tooltip>
                      </TableCell>
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
