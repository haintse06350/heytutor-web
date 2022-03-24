import React, { useState } from "react";
import {
  Grid,
  Typography,
  Card,
  Box,
  // Tab,
  TextField,
  Input,
  InputAdornment,
  // TableContainer,
  // Table,
  // TableHead,
  // TableRow,
  // TableCell,
  // TableBody,
  // IconButton,
  // Tooltip,
  // Menu,
  // MenuItem,
  // Paper,
  Button,
  Divider,
  Popover,
  Tooltip,
  Rating,
  // InputLabel,
  // Select,
  // MenuItem,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

// import TabContext from "@mui/lab/TabContext";
// import TabList from "@mui/lab/TabList";
// import TabPanel from "@mui/lab/TabPanel";

import { useStyles } from "./ManagePost.style";

// icon
// import NewspaperIcon from "@mui/icons-material/Newspaper";
// import DoneAllIcon from "@mui/icons-material/DoneAll";
// import FlagIcon from "@mui/icons-material/Flag";
// import CoPresentIcon from "@mui/icons-material/CoPresent";
// import ReportIcon from "@mui/icons-material/Report";
// import BugReportIcon from "@mui/icons-material/BugReport";
// import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { renderCardImg } from "../../DetailPage/utils";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
import VisibilityIcon from "@mui/icons-material/Visibility";
// import PushPinIcon from "@mui/icons-material/PushPin";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import { map } from "lodash";

const ManagePost = () => {
  const classes = useStyles();

  // const [valueTab, setValueTab] = useState("1");
  const [valueFilterStartDate, setValueFilterStartDate] = useState<Date | null>(null);
  const [valueFilterEndDate, setValueFilterEndDate] = useState<Date | null>(null);
  // const handleChange = (event: React.SyntheticEvent, newValue: string) => {
  //   setValueTab(newValue);
  //   console.log(newValue);
  // };
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const openMenu = Boolean(anchorEl);

  const onOpenMenu = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const onCloseMenu = () => {
    setAnchorEl(null);
  };
  const [toggleItem, setToggleItem]: any = React.useState(false);

  //

  function postData(
    postId: number,
    title: string,
    content: string,
    status: number,
    nbRegister: number,
    requester: string,
    nbView: number,
    nbRating: number
  ) {
    return {
      postId,
      title,
      content,
      status,
      nbRegister,
      requester,
      nbView,
      nbRating,
    };
  }

  const data = [
    postData(
      1,
      "Tim ng sp 2DP491",
      "Tìm ngươid support lab 6 và asm môn 2DP491 cô phuonglh ạ giá cả thương lượng...",
      1,
      120,
      "Duc Anh",
      1200,
      4
    ),
    postData(
      2,
      "Các anh.chị.bạn có lưu lại PE PRN211 các kì tới với ạ",
      "Các anh.chị.bạn có lưu lại PE PRN211 các kì trước cho em xin với ạ, em cảm ơn anh chị blabla",
      2,
      12,
      "Long",
      1200,
      2
    ),
    postData(
      3,
      "Các anh.chị.bạn có lưu lại PE PRN211 các kì tới với ạ",
      "Các anh.chị.bạn có lưu lại PE PRN211 các kì trước cho em xin với ạ, em cảm ơn anh chị blabla",
      3,
      50,
      "Hải",
      1200,
      4
    ),
    postData(
      4,
      "Các anh.chị.bạn có lưu lại PE PRN211 các kì tới với ạ",
      "Các anh.chị.bạn có lưu lại PE PRN211 các kì trước cho em xin với ạ, em cảm ơn anh chị blabla",
      4,
      22,
      "Chương",
      1200,
      3.5
    ),
  ];

  return (
    <>
      <Grid container>
        {/* header */}
        <Grid container item sx={{ mb: 2 }} className={classes.btnCreatePost}>
          <Button startIcon={<AddCircleOutlineIcon />} variant="contained">
            Tạo bài viết
          </Button>
        </Grid>
        {/* icon header */}

        <div className={classes.listPost}>
          {/* filter */}
          <Grid container className={classes.filter}>
            <Grid item xs={12} lg={3} md={3}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Ngày bắt đầu"
                  value={valueFilterStartDate}
                  onChange={(newValue) => {
                    setValueFilterStartDate(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} sx={{ ml: 2, mr: 1 }} />}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} lg={3} md={3}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Ngày kết thúc"
                  value={valueFilterEndDate}
                  onChange={(newValue) => {
                    setValueFilterEndDate(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} lg={6} md={6} sx={{ pr: 2 }}>
              <Input
                fullWidth
                disableUnderline
                placeholder="Tìm kiếm ... "
                startAdornment={
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: "text.disabled", width: 20, height: 20 }} />
                  </InputAdornment>
                }
                sx={{ mr: 1, p: 1.3, fontWeight: "fontWeightBold", border: "1px solid #d8dde1", borderRadius: 1 }}
              />
            </Grid>
          </Grid>

          <Grid container spacing={2} sx={{ mt: 2 }}>
            {map(data, (item: any, index: number) => (
              <Grid key={index} item xs={12} sm={6} md={6} lg={4}>
                <Card className={classes.item}>
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
                        <Typography variant="subtitle1" sx={{ mr: 1, color: "#6262ff" }}>
                          {item.requester}
                        </Typography>
                        <Rating name="read-only" sx={{ fontSize: 15 }} precision={0.5} value={item.nbRating} readOnly />
                      </Box>
                    </div>
                    <div>
                      <MoreVertRoundedIcon onClick={onOpenMenu} />
                    </div>
                  </div>

                  <div className={classes.cardContent}>
                    <div className={classes.shortContent}>
                      <Box>
                        <Typography
                          variant="subtitle2"
                          sx={{ fontSize: 12, fontWeight: 700, lineHeight: 1.5, ml: 0.5 }}>
                          {toggleItem !== item.postId ? `${item.content.slice(0, 100)}...` : item.content}
                          <span
                            onClick={() =>
                              toggleItem !== item.postId ? setToggleItem(item.postId) : setToggleItem(null)
                            }
                            style={{
                              marginLeft: 8,
                              textDecoration: "underline",
                              fontWeight: 400,
                              color: "#94a4c4",
                              cursor: "pointer",
                            }}>
                            {item.content.length > 100 && (toggleItem !== item.postId ? "Xem thêm" : "Thu gọn")}
                          </span>
                        </Typography>
                      </Box>
                    </div>
                    <Divider />

                    <Box sx={{ display: "flex", p: 1 }}>
                      <Tooltip title="Số lượt xem">
                        <Box sx={{ display: "flex", alignItems: "center", mr: 1 }}>
                          <VisibilityIcon sx={{ mr: 0.5, width: 20, height: 20 }} />
                          <Typography style={{ fontSize: 14 }}>{item?.nbView}</Typography>
                        </Box>
                      </Tooltip>
                      <Tooltip title="Số người đăng kí giải quyết vấn đề">
                        <Box sx={{ display: "flex", alignItems: "center", mr: 1 }}>
                          <SupervisedUserCircleIcon sx={{ mr: 0.5, width: 20, height: 20 }} />
                          <Typography style={{ fontSize: 14 }}>{item?.nbRegister}</Typography>
                        </Box>
                      </Tooltip>
                    </Box>
                  </div>
                </Card>
              </Grid>
            ))}
            <Popover
              open={openMenu}
              anchorEl={anchorEl}
              onClose={onCloseMenu}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}>
              <Box
                className={classes.actions}
                sx={{ display: "flex", alignItems: "center", flexDirection: "column", py: 1, px: 1 }}>
                <Typography variant="subtitle2" sx={{ py: 0.5, px: 2 }}>
                  Cảnh báo bài viết tới người dùng
                </Typography>
                <Typography variant="subtitle2" sx={{ py: 0.5, px: 2 }}>
                  Ghim bài viết
                </Typography>
                <Typography variant="subtitle2" sx={{ py: 0.5, px: 2 }}>
                  Gỡ hạn chế
                </Typography>
                <Typography variant="subtitle2" sx={{ py: 0.5, px: 2 }}>
                  Hạn chế
                </Typography>
              </Box>
            </Popover>
          </Grid>
        </div>
      </Grid>
    </>
  );
};

export default ManagePost;
