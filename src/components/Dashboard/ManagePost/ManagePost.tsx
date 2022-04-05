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
  Button,
  Divider,
  Popover,
  Tooltip,
  Rating,
  Chip,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

// import TabContext from "@mui/lab/TabContext";
// import TabList from "@mui/lab/TabList";
// import TabPanel from "@mui/lab/TabPanel";

import { useStyles } from "./ManagePost.style";

// icon
import NewspaperIcon from "@mui/icons-material/Newspaper";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import FlagIcon from "@mui/icons-material/Flag";
import CoPresentIcon from "@mui/icons-material/CoPresent";
import ReportIcon from "@mui/icons-material/Report";
import BugReportIcon from "@mui/icons-material/BugReport";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PushPinIcon from "@mui/icons-material/PushPin";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
import VisibilityIcon from "@mui/icons-material/Visibility";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import { map } from "lodash";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
const ManagePost = () => {
  const classes = useStyles();
  interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
  }
  function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`vertical-tabpanel-${index}`}
        aria-labelledby={`vertical-tab-${index}`}
        {...other}>
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }
  function a11yProps(index: number) {
    return {
      id: `vertical-tab-${index}`,
      "aria-controls": `vertical-tabpanel-${index}`,
    };
  }
  const [value, setValue] = React.useState(0);
  const [valueFilterStartDate, setValueFilterStartDate] = useState<Date | null>(null);
  const [valueFilterEndDate, setValueFilterEndDate] = useState<Date | null>(null);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const openMenu = Boolean(anchorEl);

  const onOpenMenu = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const onCloseMenu = () => {
    setAnchorEl(null);
  };
  // const [toggleItem, setToggleItem]: any = React.useState(false);

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
  // manager post

  function task(id: number, name: string, newNofication: number, total: number) {
    return {
      id,
      name,
      newNofication,
      total,
    };
  }

  const listTask = [
    task(0, "Đăng kí ghim", 20, 320),
    task(1, "Chưa có người đăng kí", 4, 320),
    task(2, "Đã người đăng kí", 4, 320),
    task(3, "Trong quá tình hỗ trợ", 4, 320),
    task(4, "Bị báo cáo", 1, 2),
    task(5, "Đã hạn chế", 4, 12),
    task(6, "Đã đóng", 4, 120),
  ];

  const renderIcon = (index: number) => {
    switch (index) {
      case 0: {
        // ghim bai viet
        return (
          <Box>
            <Tooltip title="Đăng kí ghim">
              <PushPinIcon color="error" />
            </Tooltip>
          </Box>
        );
      }
      case 1: {
        // chua co nguoi dang ky
        return (
          <Tooltip title="Chưa có người đăng kí">
            <AccessTimeIcon color="secondary" />
          </Tooltip>
        );
      }
      case 2: {
        //da co nguoi dang ky
        return (
          <Tooltip title="Đã có người đăng kí">
            <CoPresentIcon color="success" sx={{ opacity: 0.5 }} />
          </Tooltip>
        );
      }
      case 3: {
        // trong qua trinh ho tro
        return (
          <Tooltip title="Trong quá trình hỗ trợ">
            <NewspaperIcon color="success" />
          </Tooltip>
        );
      }
      case 4: {
        // bi bao cao
        return (
          <Tooltip title="Bị báo cáo">
            <FlagIcon color="warning" />
          </Tooltip>
        );
      }
      case 5: {
        // da  han che
        return (
          <Tooltip title="Đã hạn chế">
            <ReportIcon color="error" />
          </Tooltip>
        );
      }

      case 6: {
        // đa dong
        return (
          <Tooltip title="Đã đóng">
            <DoneAllIcon sx={{ color: "#7edfec" }} />
          </Tooltip>
        );
      }
      default: {
        return (
          <Tooltip title="Lỗi">
            <BugReportIcon />
          </Tooltip>
        );
      }
    }
  };

  return (
    <>
      {/* header */}
      <Grid container item sx={{ mb: 2 }} className={classes.btnCreatePost}>
        <Button startIcon={<AddCircleOutlineIcon />} variant="contained">
          Tạo bài viết
        </Button>
      </Grid>
      {/* icon header */}
      <Box sx={{ flexGrow: 1, bgcolor: "background.paper", display: "flex", height: "100%", width: "100%" }}>
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          sx={{
            borderRight: 1,
            borderColor: "divider",
            alignItem: "center",
            justifyContent: "center",
            overflow: "unset !important",
          }}>
          {listTask.map((task, index) => (
            <Tab key={index} icon={renderIcon(index)} {...a11yProps(index)} sx={{ display: "block" }}></Tab>
          ))}
        </Tabs>
        {listTask.map((task, index) => (
          <TabPanel key={index} value={value} index={index}>
            <Grid container>
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
                  <Grid item xs={12} lg={6} md={6} sx={{ pl: 1 }}>
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
                              <Rating
                                name="read-only"
                                sx={{ fontSize: 15 }}
                                precision={0.5}
                                value={item.nbRating}
                                readOnly
                              />
                            </Box>
                          </div>
                          <div>
                            <MoreVertRoundedIcon onClick={onOpenMenu} />
                          </div>
                        </div>

                        <div className={classes.cardContent}>
                          <div className={classes.shortContent}>
                            <Box>
                              <Typography variant="subtitle2">
                                Hashtag:
                                <Chip label="#SSG102" variant="outlined"></Chip>
                              </Typography>
                              <Typography variant="subtitle2">
                                Thuộc sự kiện: Để có một cuối kỳ thật hoàn hảo với SSG102
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
                            <Tooltip title="Số báo cáo">
                              <Box sx={{ display: "flex", alignItems: "center", mr: 1 }}>
                                <FlagIcon sx={{ mr: 0.5, width: 20, height: 20 }} />
                                <Typography style={{ fontSize: 14 }}>999</Typography>
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
          </TabPanel>
        ))}
      </Box>
    </>
  );
};

export default ManagePost;
