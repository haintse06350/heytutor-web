import React, { useState } from "react";
import { useStyles } from "./ManagerUser.style";
import { useNavigate } from "react-router-dom";

import {
  TableCell,
  TableHead,
  TableRow,
  TableBody,
  Table,
  TableContainer,
  Paper,
  TablePagination,
  Chip,
  Typography,
  Box,
  Tooltip,
  TextField,
  MenuItem,
  InputAdornment,
  IconButton,
  Grid,
  Popover,
} from "@mui/material";

import DateRangePicker from "../../DetailPage/DateRangePicker";
import { DateRange } from "@mui/lab/DateRangePicker";
// icon
import SearchIcon from "@mui/icons-material/Search";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import StarIcon from "@mui/icons-material/Star";
import DialogManagerUser from "./DialogManageUser";
// import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
export const ManagerUser = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [filters, setFilters]: any = useState({ status: "joined" });
  const [sortBy, setSortBy]: any = useState("deadlineTime");
  const [dateData, setDateData] = useState<DateRange<Date>>([null, null]);
  const [dataPick, setDataPick] = useState(null);
  function createData(
    id: number,
    name: string,
    gmail: string,
    nbOfEventJoined: number,
    eventJoined: string,
    nbOfRegisted: number,
    nbOfRequested: number,
    nbOfReport: number,
    ratePoint: number,
    nbOfRate: number,
    status: Array<string>
  ) {
    return {
      id,
      name,
      gmail,
      nbOfEventJoined,
      eventJoined,
      nbOfRegisted,
      nbOfRequested,
      nbOfReport,
      ratePoint,
      nbOfRate,
      status,
    };
  }

  const rows = [
    createData(
      1,
      "Cao Duc Anh",
      "anhcd4@fpt.edu.vn",
      2,
      "Để có một cuối kỳ thật hoàn hảo với SSG102 ",
      21,
      4,
      1,
      4.7,
      120,
      ["Hoạt động"]
    ),
    createData(
      2,
      "Nguyen Trung Hai",
      "trungnt2@fpt.edu.vn",
      2,
      "Chung tay cùng nhau vượt qua nỗi sợ mang tên PRO192",
      21,
      4,
      0,
      4,
      120,
      ["Hạn chế đăng bài 3 ngày", "Hạn chế đăng kí 1 ngày"]
    ),
    createData(
      3,
      "Le Huy Chuong",
      "chuonglh1@fpt.edu.vn",
      2,
      "Say “No” với mệt mỏi, Say “No” với thức đêm Tham gia ngay để say ",
      21,
      4,
      0,
      4.7,
      120,
      ["Hạn chế đăng bài 3 ngày", "Hạn chế đăng kí 7 ngày"]
    ),
    createData(
      4,
      "Cao Duc Anh",
      "anhcd1@fpt.edu.vn",
      2,
      "“No” thức đêm học bài mà vẫn có thể dễ dàng qua PRF192 ",
      21,
      4,
      0,
      3.7,
      120,
      ["Hạn chế đăng bài 1 ngày", "Hạn chế đăng kí 1 ngày"]
    ),
    createData(
      5,
      "Cao Duc Anh",
      "anhcd4@fpt.edu.vn",
      2,
      "CSD. thức đêm học bài mà vẫn có thể dễ dàng qua  ",
      21,
      4,
      0,
      2.7,
      120,
      ["Hạn chế đăng bài 1 ngày", "Hạn chế đăng kí 1 ngày"]
    ),
    createData(
      6,
      "Cao Duc Anh",
      "anhcd4@fpt.edu.vn",
      2,
      "CSD thức đêm học bài mà vẫn có thể dễ dàng qua  ",
      21,
      4,
      0,
      1.7,
      120,
      ["Hạn chế đăng bài 1 ngày", "Hạn chế đăng kí 1 ngày"]
    ),
    createData(
      7,
      "Cao Duc Anh",
      "anhcd4@fpt.edu.vn",
      2,
      "CSD thức đêm học bài mà vẫn có thể dễ dàng qua  ",
      21,
      4,
      0,
      1.7,
      120,
      ["Hạn chế đăng bài 1 ngày", "Hạn chế đăng kí 1 ngày"]
    ),
    createData(
      8,
      "Cao Duc Anh",
      "anhcd4@fpt.edu.vn",
      2,
      "CSD  thức đêm học bài mà vẫn có thể dễ dàng qua ",
      21,
      4,
      0,
      1.7,
      120,
      ["Hạn chế đăng bài 3 ngày", "Hạn chế đăng kí 7 ngày"]
    ),
    createData(
      9,
      "Cao Duc Anh",
      "anhcd4@fpt.edu.vn",
      2,
      "CSD  thức đêm học bài mà vẫn có thể dễ dàng qua ",
      21,
      4,
      0,
      1.7,
      120,
      ["Hạn chế đăng bài 1 ngày", "Hạn chế đăng kí 1 ngày"]
    ),
    createData(
      10,
      "Cao Duc Anh",
      "anhcd4@fpt.edu.vn",
      2,
      "CSD  thức đêm học bài mà vẫn có thể dễ dàng qua ",
      21,
      4,
      0,
      1.7,
      120,
      ["Hạn chế đăng bài 1 ngày", "Hạn chế đăng kí 1 ngày"]
    ),
    createData(
      11,
      "Cao Duc Anh",
      "anhcd4@fpt.edu.vn",
      2,
      "CSD  thức đêm học bài mà vẫn có thể dễ dàng qua ",
      21,
      4,
      0,
      1.7,
      120,
      ["Hạn chế đăng bài 1 ngày", "Hạn chế đăng kí 1 ngày"]
    ),
  ];
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const renderStatus = (status: any) => {
    return status.map((item: any) => (
      <Box key={item} sx={{ mt: 1 }}>
        <Chip
          label={item}
          variant="outlined"
          sx={{
            color:
              item === "Hoạt động"
                ? "#00AB55"
                : item === "Hạn chế đăng bài 1 ngày" ||
                  item === "Hạn chế đăng bài 3 ngày" ||
                  item === "Hạn chế đăng bài 7 ngày"
                ? "#ff3a16"
                : "#5ab4ec",
          }}
        />
      </Box>
    ));
  };
  const renderTime = (status: any) => {
    return status.map((item: any) => (
      <Typography key={item}>{item !== "Hoạt động" ? "Còn 1 ngày" : "Thanh niên nghiêm túc"}</Typography>
    ));
  };

  const handleLink = (props: any) => {
    navigate(`/dashboard/manage-user/${props}`);
  };
  const [openDialogManageUser, setOpenDialogManageUser] = useState(false);
  const closeDialog = () => {
    setOpenDialogManageUser(false);
  };
  const handleDialogManageUser = (row: any) => {
    setOpenDialogManageUser(true);
    setDataPick(row);
  };

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
    { value: "isNotResolve", label: "Chưa xử lí" },
  ];
  return (
    <div className={classes.wrapTableManager}>
      <Box sx={{ mb: 2 }}>
        <Box sx={{ display: "flex" }}>
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
                  placeholder="Tìm kiếm..."
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
        </Box>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Tên</TableCell>
              <TableCell>Báo cáo xấu</TableCell>
              <TableCell>Đánh giá hỗ trợ</TableCell>
              <TableCell>Đánh giá yêu cầu hỗ trợ</TableCell>
              <TableCell>Trạng thái</TableCell>
              <TableCell>Thời gian hiệu lực</TableCell>
              <TableCell>Quản lí</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle1" className={classes.nameUser} onClick={() => handleLink("profile")}>
                    {row.name}
                  </Typography>
                  <Typography variant="subtitle2">{row.gmail}</Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    variant="subtitle1"
                    sx={{ textDecoration: "underline", cursor: "pointer" }}
                    onClick={() => handleLink("detail")}>
                    Chưa giải quyết:{row.nbOfReport + Math.floor(Math.random() * 10) + 1}/
                    {row.nbOfReport + Math.floor(Math.random() * 10) + 2}
                  </Typography>
                  Thuộc 4 sự kiện
                </TableCell>
                <TableCell sx={{ color: "#5ab4ec" }}>
                  {row.ratePoint} <StarIcon color="warning" /> {" / (" + row.nbOfRate + " lượt)"}
                </TableCell>
                <TableCell sx={{ color: "#ff3a16" }}>
                  {row.ratePoint} <StarIcon color="warning" /> {" / (" + row.nbOfRate + " lượt)"}
                </TableCell>
                <TableCell>
                  {/* render status */}
                  {renderStatus(row.status)}
                </TableCell>
                <TableCell>{renderTime(row.status)}</TableCell>
                <TableCell className={classes.iconMoreHoriz}>
                  <Tooltip title="Quản lí trạng thái">
                    <IconButton aria-label="Xem chi tiết" onClick={() => handleDialogManageUser(row)}>
                      <BorderColorIcon color="error" />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
            <DialogManagerUser open={openDialogManageUser} closeDialog={closeDialog} data={dataPick} />;
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 20]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </div>
  );
};

export default ManagerUser;
