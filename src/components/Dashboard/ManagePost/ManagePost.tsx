import React, { useState, useEffect } from "react";
import {
  Grid,
  // Typography,
  Box,
  // Button,
  TextField,
  MenuItem,
  InputAdornment,
  Popover,
  Select,
  SelectChangeEvent,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  Typography,
  Chip,
} from "@mui/material";
// import SearchIcon from "@mui/icons-material/Search";
import { useStyles } from "./ManagePost.style";
import { Manager } from "../../../models/manager";

// icon
// import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

import SearchIcon from "@mui/icons-material/Search";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DatePicker from "@mui/lab/DatePicker";
import DateRangePicker from "../../ListData/DateTimePicker/DateRangePicker";
import { DateRange } from "@mui/lab/DateRangePicker";
import moment from "moment";
// import { useNavigate } from "react-router-dom";

const ManagePost = () => {
  const classes = useStyles();
  const [value, setValue] = useState("1");
  const [visible, setVisible] = useState("isReported");
  const [sortBy, setSortBy]: any = useState("desc");
  const [dateData, setDateData] = useState<DateRange<Date>>([null, null]);
  const [valueFilterStartDate, setValueFilterStartDate] = useState<Date | null>(moment().subtract(7, "days").toDate());
  const [valueFilterEndDate, setValueFilterEndDate] = useState<Date | null>(moment().startOf("day").toDate());
  const [searchBy, setSearchBy] = React.useState("nameOfUser");
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const [
    data = {
      selected: [],
      open: false,
      sortByOpts: [
        { value: "asc", label: "S??? l?????ng t??ng d???n" },
        { value: "desc", label: "S??? l?????ng gi???m d???n" },
        { value: "isActive", label: "Ho???t ?????ng" },
        { value: "isBlock", label: "B??? kh??a" },
      ],
      sortOpts: [
        { value: "isReported", label: "B??o c??o x???u" },
        { value: "status", label: "Tr???ng th??i" },
      ],
      timeOpts: [
        { value: "currentWeek", label: "Tu???n n??y" },
        { value: "currentMonth", label: "Th??ng n??y" },
      ],
    },
  ]: // setData,
  any = useState();

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
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
  const onChangeSearchBy = (e: SelectChangeEvent) => {
    setSearchBy(e.target.value);
  };
  const handleVisible = (event: any) => {
    setVisible(event.target.value);
    event.target.value === "status" ? setSortBy("isActive") : setSortBy("desc");
  };
  const onCloseDatePicker = () => {
    setOpenDatePicker(false);
    // setFinishPickDate(true);
  };
  const [rows, setRows] = useState([]);
  const getListPostManage = async () => {
    const res = await Manager.getListPostManage();
    setRows(res?.listReportedPost);
  };

  // const navigate = useNavigate();

  // const onReferenceToPost = (id: string) => {
  //   navigate(`/post-detail?postId=${id}&from=event`);
  // };
  useEffect(() => {
    getListPostManage();
  }, []);
  const renderManagerPost = () => {
    return (
      <Box sx={{ mb: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 1 }}>
          <Grid container item xs={12} spacing={1} sx={{ mt: 1, width: "100%" }}>
            <Grid item xs={12} lg={4} md={4}>
              <Box component="form" noValidate autoComplete="off">
                <TextField
                  fullWidth
                  classes={{ root: classes.textField }}
                  id="outlined-select-currency"
                  select
                  label="Th???i gian"
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
                  label="Ng??y b???t ?????u"
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
                  label="Ng??y k???t th??c"
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
                        <MenuItem value="nameOfUser">T??n ng?????i d??ng</MenuItem>
                        <MenuItem value="nameOfEvent">Ti??u ????? s??? ki???n</MenuItem>
                      </Select>
                    ),
                  }}
                  id="outlined-basic"
                  placeholder="T??m ki???m ..."
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
                  label="Hi???n th??? theo"
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
                  label="S???p x???p"
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
        <Grid container>
          <Grid item xs={12}>
            <TableContainer component={Paper}>
              <Table aria-label="ctv table">
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Ti??u ?????</TableCell>
                    <TableCell>Thu???c s??? ki???n</TableCell>
                    <TableCell>L?? do</TableCell>
                    <TableCell>Tr???ng th??i</TableCell>
                    <TableCell>Qu???n l??</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row: any, index: number) => (
                    <TableRow key={index} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                      <TableCell component="th" scope="row">
                        <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                          {row?.id}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography
                          variant="subtitle1"
                          sx={{ fontWeight: 500, textDecoration: "underline", cursor: "pointer" }}>
                          {row?.content}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                          {row?.title}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                          {row?.reason}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        {row?.isResolved === 0 ? (
                          <Chip label="Ho???t ?????ng" color="primary" />
                        ) : (
                          <Chip label="???? ???n" color="error" />
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <TablePagination
                rowsPerPageOptions={[5, 10, 20]}
                component="div"
                count={rows?.length || 0}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </TableContainer>
          </Grid>
        </Grid>
      </Box>
    );
  };

  return (
    <>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="B??? b??o c??o" value="1" />
          </TabList>
        </Box>
        {/* th??ng tin CTV */}
        {/* S??? ki???n ??ang qu???n l?? */}
        <TabPanel value="1">{renderManagerPost()}</TabPanel>
      </TabContext>
    </>
  );
};

export default ManagePost;
