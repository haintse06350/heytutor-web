import React from "react";
import {
  Avatar,
  Box,
  Card,
  Grid,
  Typography,
  TextField,
  Popover,
  InputAdornment,
  MenuItem,
  Button,
  Chip,
} from "@mui/material";
import BreadcrumbsTab from "../../Common/Breadcrumbs/Breadcrumbs";
import { stringAvatar } from "../../UserProfile/helper";
import { useStyles } from "./ManagerProfileUser.style";
import DateRangePicker from "../../DetailPage/DateRangePicker";
import { DateRange } from "@mui/lab/DateRangePicker";
import Page from "../../../layout/Page";
// icon
// import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import StarIcon from "@mui/icons-material/Star";
import EmailIcon from "@mui/icons-material/Email";
import SearchIcon from "@mui/icons-material/Search";
import FestivalIcon from "@mui/icons-material/Festival";
const ManagerProfileUser = () => {
  const classes = useStyles();
  const [openDatePicker, setOpenDatePicker] = React.useState(false);
  const [filters, setFilters]: any = React.useState({ status: "joined" });
  const [sortBy, setSortBy]: any = React.useState("deadlineTime");
  const [dateData, setDateData] = React.useState<DateRange<Date>>([null, null]);

  const onCloseDatePicker = () => {
    setOpenDatePicker(false);
    // setFinishPickDate(true);
  };
  const onChangeFilter = (event: any, type: string) => {
    if (type === "status") {
      // setPostStatus(event.target.value);
    }
    if (type === "hashtag") {
      if (event.length === 0) {
        delete filters["hashtag"];
        setFilters({ ...filters });
      } else {
        const newFilter = {
          hashtag: event,
        };
        setFilters({ ...filters, ...newFilter });
      }
    } else if (type === "time") {
      if (event.target.value === "Chọn ngày") {
        delete filters["time"];
        setOpenDatePicker(true);
      } else {
        const newFilter = {
          time: event.target.value,
        };
        setFilters({ ...filters, ...newFilter });
      }
    } else {
      const newFilter = {
        status: event.target.value,
      };
      setFilters({ ...filters, ...newFilter });
    }
  };
  const timeOpts = [
    { value: "Tuần này", label: "Tuần này" },
    { value: "Tháng này", label: "Tháng này" },
    { value: "Chọn ngày", label: "Chọn ngày" },
  ];

  const sortOpts = [
    { value: "deadlineTime", label: "Thời gian của vấn đề" },
    { value: "reviewsPoint", label: "Xếp hạng đánh giá" },
  ];
  return (
    <Box>
      <BreadcrumbsTab
        history={[{ title: "Quản lí người dùng", href: "/dashboard/manage-user" }]}
        current={{ title: "Quản lí Profile" }}
      />
      <Page sx={{ mt: -4 }}>
        <Grid container spacing={2}>
          <Grid
            container
            item
            xs={12}
            md={12}
            lg={3.9}
            className={classes.baseProfile}
            sx={{ display: "flex", mr: 1, p: 2, height: "fit-content" }}>
            <Grid container item sx={{ pb: 1 }}>
              <Grid item xs={2} md={2} lg={2}>
                <Avatar {...stringAvatar("Đức Anh")}></Avatar>
              </Grid>
              <Grid item xs={12} md={6} lg={6}>
                <Typography variant="h6">Đức Anh</Typography>
                <Typography variant="subtitle1">K13-IS</Typography>
              </Grid>
            </Grid>
            <Grid container item sx={{ display: "flex", borderTop: "1px solid #e0e0e0", pt: 2 }}>
              <Grid item xs={2} md={2} lg={2}>
                <EmailIcon />
              </Grid>
              <Grid item xs={3} md={3} lg={3}>
                <Typography variant="subtitle1">Email:</Typography>
              </Grid>
              <Grid item xs={7} md={7} lg={7}>
                <Typography>anhcd@fpt.edu.vn</Typography>
              </Grid>
            </Grid>
            <Grid item xs={2} md={2} lg={2}>
              <FestivalIcon />
            </Grid>
            <Grid item xs={3} md={3} lg={3}>
              <Typography variant="subtitle1">Chuyên ngành:</Typography>
            </Grid>
            <Grid item xs={7} md={7} lg={7}>
              <Typography>Kỹ thuật phần mềm (IS)</Typography>
            </Grid>

            <Box sx={{ display: "flex" }}>
              <Box>
                <Typography variant="subtitle1" sx={{ color: "#5ab4ec" }}>
                  4.3 <StarIcon sx={{ color: "gold" }} /> / 420 Đánh giá của người hỗ trợ vấn đề
                </Typography>
                <Typography variant="subtitle1" sx={{ color: "#ff3a16" }}>
                  4.3 <StarIcon sx={{ color: "gold" }} /> / 420 Đánh giá của người có vấn đề cần hỗ trợ
                </Typography>
              </Box>
            </Box>
            <Box>
              <Typography>Lịch sử báo xấu: 1</Typography>
              <Box sx={{ display: "flex" }}>
                <Chip
                  label="Hạn chế đăng bài 1 ngày"
                  variant="outlined"
                  sx={{
                    color: "#ff3a16",
                  }}
                />
                <Typography>Hiệu lực từ 28/4/2022 - 29/4/2022</Typography>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} md={12} lg={8} className={classes.baseProfile}>
            <Box sx={{ p: 2 }}>
              <Box>
                <Typography variant="h6">Đánh giá</Typography>
              </Box>
              <Grid container item xs={12} spacing={1} sx={{ mt: 2, width: "100%" }}>
                <Grid item xs={6} md={6} sx={{ minWidth: "20%" }}>
                  <Box component="form" noValidate autoComplete="off">
                    <TextField
                      autoFocus
                      classes={{ root: classes.textField }}
                      fullWidth
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <SearchIcon />
                          </InputAdornment>
                        ),
                      }}
                      id="outlined-basic"
                      placeholder="Tìm kiếm đánh giá..."
                      variant="outlined"
                    />
                  </Box>
                </Grid>
                <Grid item xs={6} md={3} sx={{ minWidth: "20%" }}>
                  <Box component="form" noValidate autoComplete="off">
                    <TextField
                      fullWidth
                      classes={{ root: classes.textField }}
                      id="outlined-select-currency"
                      select
                      label="Hiển thị theo"
                      defaultValue="Tuần này"
                      value={filters.time}
                      onChange={(e: any) => onChangeFilter(e, "time")}>
                      {timeOpts.map((option: any) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Box>
                  <Popover
                    open={openDatePicker}
                    onClose={onCloseDatePicker}
                    anchorOrigin={{ vertical: "center", horizontal: "center" }}
                    transformOrigin={{ vertical: "center", horizontal: "center" }}>
                    <DateRangePicker setValue={setDateData} value={dateData} />
                  </Popover>
                </Grid>
                <Grid item xs={4} md={3} sx={{ minWidth: "20%" }}>
                  <Box component="form" noValidate autoComplete="off">
                    <TextField
                      fullWidth
                      classes={{ root: classes.textField }}
                      id="outlined-select-currency"
                      select
                      label="Sắp xếp"
                      defaultValue="Thời gian của vấn đề"
                      value={sortBy}
                      onChange={(e: any) => setSortBy(e.target.value)}>
                      {sortOpts.map((option: any) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Box>
                  <Popover
                    open={openDatePicker}
                    onClose={onCloseDatePicker}
                    anchorOrigin={{ vertical: "center", horizontal: "center" }}
                    transformOrigin={{ vertical: "center", horizontal: "center" }}>
                    <DateRangePicker setValue={setDateData} value={dateData} />
                  </Popover>
                </Grid>
              </Grid>
              <Grid container spacing={2} sx={{ display: "flex", mt: 2 }}>
                <Grid item xs={12} md={12} lg={12}>
                  <Card sx={{ p: 1 }}>
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Typography variant="subtitle1">Người đánh giá:</Typography>
                        <Typography variant="body1">&nbsp; Nguoi văn B</Typography>

                        <Typography variant="subtitle1" sx={{ ml: 2 }}>
                          Vai trò đánh giá:
                        </Typography>
                        <Typography variant="body1">&nbsp; Người hỗ trợ</Typography>
                      </Box>
                      <Button variant="outlined" disabled endIcon={<StarIcon sx={{ color: "gold" }} />}>
                        <Typography variant="subtitle1" sx={{ color: "black" }}>
                          4.7
                        </Typography>
                      </Button>
                    </Box>
                    <Box>
                      <Typography variant="subtitle2">Thời điểm đánh giá: 28/4/2022</Typography>
                      <Typography variant="subtitle1">Nội dung đánh giá</Typography>
                    </Box>
                  </Card>
                </Grid>
                <Grid item xs={12} md={12} lg={12}>
                  <Card sx={{ p: 1 }}>
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Typography variant="subtitle1">Người đánh giá:</Typography>
                        <Typography variant="body1">&nbsp; Nguoi văn B</Typography>

                        <Typography variant="subtitle1" sx={{ ml: 2 }}>
                          Vai trò đánh giá:
                        </Typography>
                        <Typography variant="body1">&nbsp; Người hỗ trợ</Typography>
                      </Box>
                      <Button variant="outlined" disabled endIcon={<StarIcon sx={{ color: "gold" }} />}>
                        <Typography variant="subtitle1" sx={{ color: "black" }}>
                          4.7
                        </Typography>
                      </Button>
                    </Box>
                    <Box>
                      <Typography variant="subtitle2">Thời điểm đánh giá: 28/4/2022</Typography>
                      <Typography variant="subtitle1">Nội dung đánh giá</Typography>
                    </Box>
                  </Card>
                </Grid>
                <Grid item xs={12} md={12} lg={12}>
                  <Card sx={{ p: 1 }}>
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Typography variant="subtitle1">Người đánh giá:</Typography>
                        <Typography variant="body1">&nbsp; Nguoi văn B</Typography>

                        <Typography variant="subtitle1" sx={{ ml: 2 }}>
                          Vai trò đánh giá:
                        </Typography>
                        <Typography variant="body1">&nbsp; Người hỗ trợ</Typography>
                      </Box>
                      <Button variant="outlined" disabled endIcon={<StarIcon sx={{ color: "gold" }} />}>
                        <Typography variant="subtitle1" sx={{ color: "black" }}>
                          4.7
                        </Typography>
                      </Button>
                    </Box>
                    <Box>
                      <Typography variant="subtitle2">Thời điểm đánh giá: 28/4/2022</Typography>
                      <Typography variant="subtitle1">Nội dung đánh giá</Typography>
                    </Box>
                  </Card>
                </Grid>
                <Grid item xs={12} md={12} lg={12}>
                  <Card sx={{ p: 1 }}>
                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <Box sx={{ display: "flex", alignItems: "center" }}>
                        <Typography variant="subtitle1">Người đánh giá:</Typography>
                        <Typography variant="body1">&nbsp; Nguoi văn B</Typography>

                        <Typography variant="subtitle1" sx={{ ml: 2 }}>
                          Vai trò đánh giá:
                        </Typography>
                        <Typography variant="body1">&nbsp; Người hỗ trợ</Typography>
                      </Box>
                      <Button variant="outlined" disabled endIcon={<StarIcon sx={{ color: "gold" }} />}>
                        <Typography variant="subtitle1" sx={{ color: "black" }}>
                          4.7
                        </Typography>
                      </Button>
                    </Box>
                    <Box>
                      <Typography variant="subtitle2">Thời điểm đánh giá: 28/4/2022</Typography>
                      <Typography variant="subtitle1">Nội dung đánh giá</Typography>
                    </Box>
                  </Card>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Page>
    </Box>
  );
};
export default ManagerProfileUser;
