import React, { useEffect, useState } from "react";
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
  SelectChangeEvent,
  Select,
} from "@mui/material";

import DateRangePicker from "../../ListData/DateTimePicker/DateRangePicker";
import { DateRange } from "@mui/lab/DateRangePicker";
// icon
import SearchIcon from "@mui/icons-material/Search";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import StarIcon from "@mui/icons-material/Star";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DialogManagerUser from "./DialogManageUser";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DatePicker from "@mui/lab/DatePicker";
import moment from "moment";
import { Manager } from "../../../models/manager";
export const ManagerUser = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [dateData, setDateData] = useState<DateRange<Date>>([null, null]);
  const [dataPick, setDataPick] = useState(null);
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const [sortBy, setSortBy]: any = useState("asc");
  const [visible, setVisible] = useState("isNotResolve");
  const [valueFilterStartDate, setValueFilterStartDate] = useState<Date | null>(moment().subtract(7, "days").toDate());
  const [valueFilterEndDate, setValueFilterEndDate] = useState<Date | null>(moment().startOf("day").toDate());
  const [searchBy, setSearchBy] = React.useState("nameOfUser");

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
        {item === "Hoạt động" ? (
          <Chip label={item} color="primary" />
        ) : item === "Hạn chế đăng bài 1 ngày" ||
          item === "Hạn chế đăng bài 3 ngày" ||
          item === "Hạn chế đăng bài 7 ngày" ? (
          <Chip label={item} color="info" />
        ) : (
          <Chip label={item} color="warning" />
        )}
      </Box>
    ));
  };

  const renderTime = (status: any) => {
    return status.map((item: any) => (
      <Typography key={item}>{item !== "Hoạt động" ? "Còn 1 ngày" : "Còn hiệu lực"}</Typography>
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

  const openDescribeEvent = Boolean(anchorEl);

  const onCloseDatePicker = () => {
    setOpenDatePicker(false);
    // setFinishPickDate(true);
  };

  const [eventPick, setEventPick] = useState("");
  const onOpenDescribeEvent = (event: any, eventJoined: string) => {
    setAnchorEl(event.currentTarget);
    setEventPick(eventJoined);
  };
  const onCloseDescribeEvent = (event: SelectChangeEvent) => {
    setAnchorEl(null);
  };

  const [
    data = {
      selected: [],
      open: false,
      sortByOpts: [
        { value: "asc", label: "Số lượng tăng dần" },
        { value: "desc", label: "Số lượng giảm dần" },
      ],
      sortOpts: [
        { value: "isNotResolve", label: "Báo cáo xấu chưa giải quyết" },
        { value: "reviewRegisterPoint", label: "Xếp hạng yêu cầu hỗ trợ" },
        { value: "reviewRequesterPoint", label: "Xếp hạng hỗ trợ" },
      ],
      timeOpts: [
        { value: "currentWeek", label: "Tuần này" },
        { value: "currentMonth", label: "Tháng này" },
      ],
    },
  ]: // setData,
  any = useState();
  const onChangeSearchBy = (e: SelectChangeEvent) => {
    setSearchBy(e.target.value);
  };
  const [rowsData, setRowsData] = useState(null);

  const getListUser = async () => {
    const data = await Manager.getUserManage();
    setRowsData(data);
  };
  const onChangeFilter = (event: any, type: string) => {
    if (type === "time") {
      if (event.target.value === "currentWeek") {
        setValueFilterStartDate(moment().subtract(7, "days").toDate());
        setValueFilterEndDate(moment().startOf("day").toDate());
      } else if (event.target.value === "currentMonth") {
        setValueFilterStartDate(moment().subtract(1, "months").toDate());
        setValueFilterEndDate(moment().startOf("day").toDate());
      }
    }
  };
  useEffect(() => {
    getListUser();
    console.log(rowsData, "rowdata");
  }, []);

  return (
    <div className={classes.wrapTableManager}>
      <Box sx={{ mb: 2 }}>
        <Box sx={{ display: "flex" }}>
          <Grid container spacing={2} sx={{ mt: 2, width: "100%" }}>
            <Grid item xs={12} lg={4} md={4}>
              <Box component="form" noValidate autoComplete="off">
                <TextField
                  fullWidth
                  classes={{ root: classes.textField }}
                  id="outlined-select-currency"
                  select
                  label="Thời gian"
                  defaultValue="currentWeek"
                  // value={filters.time}
                  onChange={(e: any) => onChangeFilter(e, "time")}>
                  {data.timeOpts.map((option: any) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Box>
            </Grid>
            <Grid item xs={12} lg={4} md={4}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Ngày bắt đầu"
                  inputFormat="dd/MM/yyyy"
                  value={valueFilterStartDate}
                  onChange={(newValue) => {
                    setValueFilterStartDate(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} sx={{ background: "#fff", width: "100%" }} />}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item xs={12} lg={4} md={4}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Ngày kết thúc"
                  inputFormat="dd/MM/yyyy"
                  value={valueFilterEndDate}
                  onChange={(newValue) => {
                    setValueFilterEndDate(newValue);
                  }}
                  renderInput={(params) => <TextField {...params} sx={{ background: "#fff", width: "100%" }} />}
                />
              </LocalizationProvider>
            </Grid>

            <Grid item xs={6} md={4} sx={{ minWidth: "20%" }}>
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
                    endAdornment: (
                      <Select
                        className={classes.select}
                        value={searchBy}
                        defaultValue="nameOfUser"
                        onChange={onChangeSearchBy}
                        inputProps={{
                          name: "departmentValue",
                          id: "departmentValue",
                        }}>
                        <MenuItem value="nameOfUser">Tên người dùng</MenuItem>
                        <MenuItem value="nameOfEvent">Tiêu đề sự kiện</MenuItem>
                      </Select>
                    ),
                  }}
                  id="outlined-basic"
                  placeholder="Tìm kiếm ..."
                  variant="outlined"
                />
              </Box>
            </Grid>
            <Grid item xs={6} md={4} sx={{ minWidth: "20%" }}>
              <Box component="form" noValidate autoComplete="off">
                <TextField
                  fullWidth
                  classes={{ root: classes.textField }}
                  id="outlined-select-currency"
                  select
                  label="Hiển thị theo"
                  defaultValue="isNotResolve"
                  value={visible}
                  onChange={(e: any) => setVisible(e.target.value)}>
                  {data.sortOpts.map((option: any) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Box>
            </Grid>
            <Grid item xs={4} md={4} sx={{ minWidth: "20%" }}>
              <Box component="form" noValidate autoComplete="off">
                <TextField
                  fullWidth
                  classes={{ root: classes.textField }}
                  id="outlined-select-currency"
                  select
                  label="Sắp xếp"
                  defaultValue="desc"
                  value={sortBy}
                  onChange={(e: any) => setSortBy(e.target.value)}>
                  {data.sortByOpts.map((option: any) => (
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
              <TableCell>Thuộc sự kiện</TableCell>
              <TableCell>Đánh giá nhận hỗ trợ</TableCell>
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
                  <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                    {row.name}
                  </Typography>
                  <Typography variant="subtitle2" sx={{ fontWeight: 400 }}>
                    {row.gmail}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: 500, textDecoration: "underline", cursor: "pointer" }}
                    onClick={() => handleLink("detail")}>
                    Chưa giải quyết: {row.nbOfReport}/{row.nbOfReport + 1}
                  </Typography>
                </TableCell>
                <TableCell sx={{ maxWidth: "100px" }}>
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: 500, textDecoration: "underline", cursor: "pointer" }}
                    onClick={(e) => onOpenDescribeEvent(e, row.eventJoined)}
                    noWrap>
                    {row.eventJoined}
                  </Typography>
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
            <Popover
              open={openDescribeEvent}
              anchorEl={anchorEl}
              onClose={onCloseDescribeEvent}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}>
              <Box sx={{ p: 2 }} width="md">
                <Typography variant="subtitle1" sx={{ fontWeight: 400 }}>
                  Tiêu đề: {eventPick}
                </Typography>
                <Typography variant="subtitle1" sx={{ fontWeight: 400 }}>
                  Tóm tắt: {eventPick}
                </Typography>
              </Box>
            </Popover>
            <DialogManagerUser open={openDialogManageUser} closeDialog={closeDialog} data={dataPick} />
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
