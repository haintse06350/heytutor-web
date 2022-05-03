import React, { useState, useEffect, useContext } from "react";
import { useStyles } from "./ManagerCTV.style";
import {
  Grid,
  Box,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  IconButton,
  Tooltip,
  Typography,
  // Avatar,
  TextField,
  InputAdornment,
  MenuItem,
  Chip,
  TablePagination,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  // Container,
  DialogActions,
  // Autocomplete,
  Popover,
  Select,
  SelectChangeEvent,
  FormControl,
  // FormGroup,
} from "@mui/material";
// icon
// import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import SearchIcon from "@mui/icons-material/Search";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import moment from "moment";

// component

import DialogEditManageCTV from "./DialogEditManageCTV";
import { NotificationCtx } from "../../../context/notification/state";
import { useNavigate } from "react-router-dom";
import { DateRange } from "@mui/lab/DateRangePicker";
import DateRangePicker from "../../ListData/DateTimePicker/DateRangePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { Manager } from "../../../models/manager";
import { UserCtx } from "../../../context/user/state";

const ManagerCTV = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { user } = useContext(UserCtx);

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [openDialog, setOpenDialog] = React.useState(false);
  const { setNotificationSuccess, setNotificationError } = React.useContext(NotificationCtx);
  const [openDatePicker, setOpenDatePicker] = useState(false);
  // const [filters, setFilters]: any = useState({ status: "joined" });
  const [visible, setVisible] = useState("isActive");
  const [valueFilterStartDate, setValueFilterStartDate] = useState<Date | null>(moment().subtract(7, "days").toDate());
  const [valueFilterEndDate, setValueFilterEndDate] = useState<Date | null>(moment().startOf("day").toDate());
  const [searchBy, setSearchBy] = React.useState("nameOfUser");

  const [sortBy, setSortBy]: any = useState("desc");
  const [dateData, setDateData] = useState<DateRange<Date>>([null, null]);
  // const [filter, setFilter] = useState<string>("");
  // const [query, setQuery] = useState<string>("");
  // const [dataPick, setDataPick] = useState(null);
  const [createAdmin, setCreateAdmin] = useState({
    name: "",
    phone: "",
    email: "",
    role: "",
    address: "",
    facebook: "",
  });
  const onChangeUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCreateAdmin({ ...createAdmin, name: e.target.value });
  };
  const onChangePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCreateAdmin({ ...createAdmin, phone: e.target.value });
  };
  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCreateAdmin({ ...createAdmin, email: e.target.value });
  };
  const onChangeRole = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCreateAdmin({ ...createAdmin, role: e.target.value.toLowerCase() });
  };
  const onChangeAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCreateAdmin({ ...createAdmin, address: e.target.value });
  };
  const onChangeFacebook = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCreateAdmin({ ...createAdmin, facebook: e.target.value });
  };

  const roleProps = {
    options:
      user.role === "superadmin"
        ? [
            { id: 1, title: "ADMIN" },
            { id: 2, title: "CTV" },
          ]
        : [{ id: 1, title: "CTV" }],
    getOptionLabel: (option: any) => option.title,
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const [userSelected, setUserSelected] = useState();
  const [openDialogEdit, setOpenDialogEdit] = React.useState(false);

  const handleOpenEdit = (userInfo: any) => {
    setUserSelected(userInfo);
    setOpenDialogEdit(true);
  };
  const closeDialogEdit = () => {
    setOpenDialogEdit(false);
  };

  const onCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleChangeTab = (path: string, id: number) => {
    navigate(`/dashboard/manage-ctv/${path}?id=${id}`);
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
  const [
    data = {
      selected: [],
      open: false,
      sortByOpts: [
        { value: "asc", label: "Số lượng tăng dần" },
        { value: "desc", label: "Số lượng giảm dần" },
        { value: "isActive", label: "Hoạt động" },
        { value: "isBlock", label: "Bị khóa" },
      ],
      sortOpts: [
        { value: "isActive", label: "Đang quản lí" },
        { value: "isPending", label: "Đang chờ phê duyệt" },
        { value: "status", label: "Trạng thái hoạt động" },
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

  const onCloseDatePicker = () => {
    setOpenDatePicker(false);
    // setFinishPickDate(true);
  };

  const onCreateCollaborator = async () => {
    const res = await Manager.createCollaborator(createAdmin);
    if (res) {
      setNotificationSuccess("Thêm thành công");
      getListCollaborator();
      setOpenDialog(false);
    } else {
      setNotificationError("Thêm thất bại");
    }
  };

  const renderDialog = () => {
    return (
      <Dialog open={openDialog} maxWidth="md" fullWidth>
        <DialogTitle>Thêm cộng tác viên</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={4}>
              <FormControl fullWidth>
                <TextField
                  required
                  id="create-useremail"
                  label="Email"
                  type="email"
                  value={createAdmin.email}
                  onChange={onChangeEmail}
                  fullWidth
                />
              </FormControl>
              <FormControl fullWidth sx={{ mt: 1 }}>
                <TextField
                  required
                  id="create-userrole"
                  select
                  label="Vai trò người dùng"
                  value={createAdmin.role}
                  onChange={onChangeRole}
                  helperText="Chọn vai trò của người dùng">
                  {roleProps.options.map((option: any, index: number) => (
                    <MenuItem key={index} value={option.title.toLowerCase()}>
                      {option.title}
                    </MenuItem>
                  ))}
                </TextField>
              </FormControl>
            </Grid>
            <Grid item xs={8}>
              <FormControl fullWidth>
                <TextField
                  id="create-name"
                  label="Tên"
                  value={createAdmin.name}
                  onChange={onChangeUsername}
                  required
                  fullWidth
                />
              </FormControl>
              <FormControl fullWidth sx={{ mt: 1 }}>
                <TextField
                  id="create-userphonenumber"
                  label="Số điện thoại"
                  type="phone"
                  value={createAdmin.phone}
                  onChange={onChangePhone}
                  fullWidth
                />
              </FormControl>
              <FormControl fullWidth sx={{ mt: 1 }}>
                <TextField
                  id="create-useraddress"
                  label="Địa chỉ"
                  value={createAdmin.address}
                  onChange={onChangeAddress}
                  fullWidth
                />
              </FormControl>
              <FormControl fullWidth sx={{ mt: 1 }}>
                <TextField
                  id="create-userfacebook"
                  label="Facebook"
                  value={createAdmin.facebook}
                  onChange={onChangeFacebook}
                  fullWidth
                />
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={onCloseDialog}>Hủy</Button>
          <Button onClick={onCreateCollaborator} color="primary" variant="contained">
            Tạo mới
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  const handleVisible = (event: any) => {
    setVisible(event.target.value);
    event.target.value === "status" ? setSortBy("isActive") : setSortBy("desc");
  };
  const [dataUser, setDataUser] = useState([]);
  const getListCollaborator = async () => {
    const rows = await Manager.getListCollaborator();
    setDataUser(rows);
  };
  useEffect(() => {
    getListCollaborator();
  }, []);

  // useEffect(() => {
  //   if (query === "") {
  //     //resest data
  //   } else {
  //     //search
  //     let filterData;
  //     if (searchBy === "nameOfUser") {
  //       filterData = data.data.filter((item: any) => item.name.includes(query));
  //     } else if (searchBy === "nameOfEvent") {
  //       filterData = data.data.filter((item: any) => item.name.includes(query));
  //     }
  //   }
  // }, []);

  return (
    <div className={classes.root}>
      {renderDialog()}
      <Box sx={{ mb: 2 }}>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            startIcon={<AddCircleOutlineRoundedIcon />}
            variant="contained"
            color="primary"
            onClick={() => setOpenDialog(true)}>
            Thêm cộng tác viên
          </Button>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Grid container item xs={12} spacing={1} sx={{ mt: 1, width: "100%" }}>
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
                  onChange={(event) => handleVisible(event)}>
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
                  defaultValue="asc"
                  value={sortBy}
                  onChange={(e: any) => setSortBy(e.target.value)}>
                  {visible !== "status" &&
                    data?.sortByOpts.slice(0, 2).map((option: any) => (
                      <MenuItem key={option.value} value={option.value} defaultValue="desc">
                        {option.label}
                      </MenuItem>
                    ))}
                  {visible === "status" &&
                    data?.sortByOpts.slice(2, 4).map((option: any) => (
                      <MenuItem key={option.value} value={option.value} defaultValue="isActive">
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
      <Grid container>
        <Grid item xs={12}>
          <TableContainer component={Paper}>
            <Table aria-label="ctv table">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Tên</TableCell>
                  <TableCell>Thông số sự kiện</TableCell>
                  <TableCell>Cập nhật bởi</TableCell>
                  <TableCell>Trạng thái</TableCell>
                  <TableCell>Quản lí</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {dataUser
                  ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row: any, index: number) => (
                    <TableRow key={index}>
                      <TableCell component="th" scope="row">
                        {row?.userInfo.id}
                      </TableCell>
                      <TableCell>
                        <Box sx={{ display: "flex" }}>
                          <Box>
                            <Typography
                              variant="subtitle1"
                              sx={{ fontWeight: 500, textDecoration: "underline", cursor: "pointer" }}
                              onClick={() => handleChangeTab("profile", row?.userInfo.id)}>
                              {row?.userInfo.name}
                            </Typography>
                            <Typography variant="subtitle2" sx={{ fontWeight: 400 }}>
                              {row?.userInfo.email}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                          Đang quản lí : {row.nbOfActiveEvents}
                        </Typography>
                        <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                          Chờ phê duyệt : {row.nbOfPendingEvents}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                          {row?.updateName}
                        </Typography>
                      </TableCell>

                      <TableCell sx={{ color: row.status === 1 ? "green" : "red" }}>
                        {row?.userInfo.isActive === 1 ? (
                          <Chip label="Hoạt động" color="primary" />
                        ) : (
                          <Chip label="Bị khóa" color="error" />
                        )}
                      </TableCell>
                      <TableCell>
                        {/* Ban cộng tác viên */}
                        <IconButton aria-label="Quản lí cộng tác viên" onClick={() => handleOpenEdit(row?.userInfo)}>
                          <Tooltip title="Quản lí cộng tác viên">
                            <EditIcon color="error" />
                          </Tooltip>
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
              <DialogEditManageCTV open={openDialogEdit} onClose={closeDialogEdit} data={userSelected} />
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 20]}
            component="div"
            count={dataUser?.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Grid>
      </Grid>
    </div>
  );
};
export default ManagerCTV;
