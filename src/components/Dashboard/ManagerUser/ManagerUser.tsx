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
  FormControl,
  CircularProgress,
} from "@mui/material";

// import DateRangePicker from "../../ListData/DateTimePicker/DateRangePicker";
// import { DateRange } from "@mui/lab/DateRangePicker";
// icon
import SearchIcon from "@mui/icons-material/Search";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import StarIcon from "@mui/icons-material/Star";
import DialogManagerUser from "./DialogManageUser";
import moment from "moment";
import { Manager } from "../../../models/manager";

export const ManagerUser = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  // const [openDatePicker, setOpenDatePicker] = useState(false);
  // const [dateData, setDateData] = useState<DateRange<Date>>([null, null]);
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  // const [sortBy, setSortBy]: any = useState("asc");
  // const [visible, setVisible] = useState("isNotResolve");
  const [searchBy, setSearchBy] = React.useState("nameOfUser");
  const [searchValue, setSearchValue] = React.useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const openDescribeEvent = Boolean(anchorEl);
  const [rows, setRows]: any = useState(null);
  const [eventTitlePick, setEventTitlePick] = useState("");
  const [eventDesPick, setEventDesPick] = useState("");
  const [dataPick, setDataPick]: any = useState(null);
  const [dataFetch, setDataFetch]: any = useState(null);

  // const [dataFetchVisibleAndSort, setDataFetchVisibleAndSort]: any = useState(null);
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const renderLabelStatus = (item: string) => {
    switch (item) {
      case "1-1":
        return "H???n ch??? ????ng b??i trong 1 ng??y";
      case "1-2":
        return "H???n ch??? ????ng b??i trong 3 ng??y";
      case "1-3":
        return "H???n ch??? ????ng b??i trong 5 ng??y";
      case "1-4":
        return "H???n ch??? ????ng b??i trong 7 ng??y";
      case "2-1":
        return "H???n ch??? ????ng k?? trong 1 ng??y";
      case "2-2":
        return "H???n ch??? ????ng k?? trong 3 ng??y";
      case "2-3":
        return "H???n ch??? ????ng k?? trong 5 ng??y";
      case "2-4":
        return "H???n ch??? ????ng k?? trong 7 ng??y";
      case "3-1":
        return "H???n ch??? b??nh lu???n trong 1 ng??y";
      case "3-2":
        return "H???n ch??? b??nh lu???n trong 3 ng??y";
      case "3-3":
        return "H???n ch??? b??nh lu???n trong 5 ng??y";
      case "3-4":
        return "H???n ch??? b??nh lu???n trong 7 ng??y";
      case "4":
        return "Kh??a v??nh vi???n";
      default:
        return "Ho???t ?????ng";
    }
  };

  const renderColorStatus = (item: string) => {
    if (item === null) {
      return "primary";
    } else {
      return "error";
    }
  };

  const renderStatus = (status: any) => {
    if (status.length === 0) {
      return <Chip label="Ho???t ?????ng" color="primary" />;
    } else {
      return status.map((item: any, index: number) => (
        <Box key={index} sx={{ mt: 1 }}>
          <Chip label={renderLabelStatus(item?.type || null)} color={renderColorStatus(item?.type)}></Chip>
        </Box>
      ));
    }
  };

  const renderTime = (status: any) => {
    if (status.length === 0) {
      return <Typography>C??n hi???u l???c</Typography>;
    } else {
      return status.map((item: any, index: number) => (
        <Typography key={index}>{moment(item?.unbanDate).fromNow()}</Typography>
      ));
    }
  };

  const handleLink = (userId: any, eventId: any) => {
    navigate(`/dashboard/manage-user/detail?userId=${userId}&eventId=${eventId}`);
  };
  const [openDialogManageUser, setOpenDialogManageUser] = useState(false);
  const closeDialog = () => {
    setOpenDialogManageUser(false);
  };
  const handleDialogManageUser = (row: any) => {
    setOpenDialogManageUser(true);
    setDataPick(row);
  };

  // const onCloseDatePicker = () => {
  //   setOpenDatePicker(false);
  // };

  const onOpenDescribeEvent = (event: any, title: any, description: any) => {
    setAnchorEl(event.currentTarget);
    setEventTitlePick(title);
    setEventDesPick(description);
  };
  const onCloseDescribeEvent = (event: SelectChangeEvent) => {
    setAnchorEl(null);
  };

  // const [
  //   data = {
  //     selected: [],
  //     open: false,
  //     sortByOpts: [
  //       { value: "asc", label: "S??? l?????ng t??ng d???n" },
  //       { value: "desc", label: "S??? l?????ng gi???m d???n" },
  //     ],
  //     sortOpts: [
  //       { value: "isNotResolve", label: "B??o c??o x???u ch??a gi???i quy???t" },
  //       { value: "reviewRegisterPoint", label: "X???p h???ng y??u c???u h??? tr???" },
  //       { value: "reviewRequesterPoint", label: "X???p h???ng h??? tr???" },
  //     ],
  //     timeOpts: [
  //       { value: "currentWeek", label: "Tu???n n??y" },
  //       { value: "currentMonth", label: "Th??ng n??y" },
  //     ],
  //   },
  // ]: any = useState();
  const onChangeSearchBy = (e: SelectChangeEvent) => {
    setSearchBy(e.target.value);
  };

  const getListUser = async () => {
    const res = await Manager.getUserManage();
    setDataFetch(res);
    setRows(res);
  };

  useEffect(() => {
    getListUser();
  }, []);

  // useEffect(() => {
  //   let filterData;
  //   if (sortBy === "desc") {
  //     //isNotResolve, reviewRegisterPoint,reviewRequesterPoint : number
  //     if (visible === "isNotResolve") {
  //       filterData = dataFetch.sort((a: any, b: any) =>
  //         a.nbOfNotResolvedReport.length > b.nbOfNotResolvedReport.length ? -1 : 1
  //       );
  //     }
  //     setDataFetchVisibleAndSort(filterData);
  //     console.log(dataFetchVisibleAndSort, "dataFetchVisibleAndSort");
  //   } else {
  //     console.log("bbbbbbbbbbb");
  //   }
  // }, [visible, sortBy]);

  useEffect(() => {
    if (searchValue === null || searchValue === undefined || searchValue === "") {
      //reset data
      setRows(dataFetch);
    } else {
      let filterData;
      if (searchBy === "nameOfUser") {
        filterData = dataFetch?.filter((item: any) => {
          return item?.userInfo?.name?.toLowerCase().includes(searchValue.toLowerCase());
        });
      } else if (searchBy === "nameOfEvent") {
        filterData = dataFetch?.filter((item: any) => {
          return item?.eventInfo?.title?.toLowerCase().includes(searchValue.toLowerCase());
        });
      }
      setRows(filterData);
    }
  }, [searchValue, searchBy]);

  return (
    <div className={classes.wrapTableManager}>
      <Box sx={{ mb: 2 }}>
        <Box sx={{ display: "flex" }}>
          <Grid container spacing={1} sx={{ width: "100%" }}>
            <Grid item xs={6} md={4} lg={4} sx={{ minWidth: "20%" }}>
              <Box component="form" noValidate autoComplete="off">
                <FormControl fullWidth>
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
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                  />
                </FormControl>
              </Box>
            </Grid>
            {/* <Grid item xs={6} md={4} sx={{ minWidth: "20%" }}>
              <Box component="form" noValidate autoComplete="off">
                <TextField
                  fullWidth
                  classes={{ root: classes.textField }}
                  id="outlined-select-currency"
                  select
                  label="Hi???n th??? theo"
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
                  label="S???p x???p theo hi???n th???"
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
            </Grid> */}
          </Grid>
        </Box>
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>T??n</TableCell>
              <TableCell>B??o c??o x???u</TableCell>
              <TableCell>Thu???c s??? ki???n</TableCell>
              <TableCell>????nh gi?? nh???n h??? tr???</TableCell>
              <TableCell>????nh gi?? y??u c???u h??? tr???</TableCell>
              <TableCell>Tr???ng th??i</TableCell>
              <TableCell>Th???i gian hi???u l???c</TableCell>
              <TableCell>Qu???n l??</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows === null || rows === undefined ? (
              <CircularProgress />
            ) : (
              rows?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row: any, index: number) => (
                <TableRow key={index}>
                  <TableCell component="th" scope="row">
                    {row?.userInfo.id}
                  </TableCell>
                  <TableCell>
                    <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                      {row?.userInfo.name}
                    </Typography>
                    <Typography variant="subtitle2" sx={{ fontWeight: 400 }}>
                      {row?.userInfo.gmail}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="subtitle1"
                      sx={{ fontWeight: 500, textDecoration: "underline", cursor: "pointer" }}
                      onClick={() => handleLink(row?.userInfo.id, row?.eventInfo.id)}>
                      Ch??a gi???i quy???t: {row?.nbOfNotResolvedReport.reportDetail.length}/{row?.nbOfReport.length}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ maxWidth: "100px" }}>
                    <Typography
                      variant="subtitle1"
                      sx={{ fontWeight: 500, textDecoration: "underline", cursor: "pointer" }}
                      onClick={(e) => onOpenDescribeEvent(e, row?.eventInfo.title, row?.eventInfo.description)}
                      noWrap>
                      {row?.eventInfo.title}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ color: "#5ab4ec" }}>
                    {row?.rankInfo === null ? 0 : row?.rankInfo?.rankPoint}{" "}
                    {row?.rankInfo === null ? <StarIcon sx={{ color: "gray" }} /> : <StarIcon color="warning" />}/ (
                    {row?.rankInfo === null ? 0 : row?.rankInfo?.voteCount || 0} l?????t )
                  </TableCell>
                  <TableCell sx={{ color: "#ff3a16" }}>
                    {row?.rankInfo === null ? 0 : row?.rankInfo?.requestPoint || 0}{" "}
                    {row?.rankInfo === null ? <StarIcon sx={{ color: "gray" }} /> : <StarIcon color="warning" />}/ ({" "}
                    {row?.rankInfo === null ? 0 : row?.rankInfo?.requestVoteCount} l?????t )
                  </TableCell>
                  <TableCell>
                    {/* render status */}
                    {renderStatus(row?.userBanInfo)}
                  </TableCell>
                  <TableCell>{renderTime(row?.userBanInfo)}</TableCell>
                  <TableCell className={classes.iconMoreHoriz}>
                    <Tooltip title="Qu???n l?? tr???ng th??i">
                      <IconButton aria-label="Kh??a ng?????i d??ng" onClick={() => handleDialogManageUser(row)}>
                        <BorderColorIcon color="error" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))
            )}
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
                  Ti??u ?????: {eventTitlePick}
                </Typography>
                <Typography variant="subtitle1" sx={{ fontWeight: 400 }}>
                  T??m t???t: {eventDesPick}
                </Typography>
              </Box>
            </Popover>

            <DialogManagerUser open={openDialogManageUser} closeDialog={closeDialog} data={dataPick} />
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
    </div>
  );
};

export default ManagerUser;
