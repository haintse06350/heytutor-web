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
  DialogActions,
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

// component

import DialogEditManageCTV from "./DialogEditManageCTV";
import { NotificationCtx } from "../../../context/notification/state";
import { useNavigate } from "react-router-dom";
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
  const [searchBy, setSearchBy] = React.useState("nameOfUser");
  const [searchValue, setSearchValue] = React.useState("");
  const [managerName, setManagerName] = React.useState("");
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

  const handleOpenEdit = (userInfo: any, managerName: any) => {
    setUserSelected(userInfo);
    setOpenDialogEdit(true);
    setManagerName(managerName);
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

  const onChangeSearchBy = (e: SelectChangeEvent) => {
    setSearchBy(e.target.value);
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

  const [dataUser, setDataUser] = useState([]);
  const [dataForSearch, setDataForSearch] = useState([]);
  const getListCollaborator = async () => {
    const res = await Manager.getListCollaborator();
    setDataUser(res);
    setDataForSearch(res);
  };
  useEffect(() => {
    getListCollaborator();
  }, []);

  useEffect(() => {
    if (searchValue === null || searchValue === undefined || searchValue === "") {
      setDataForSearch(dataUser);
    } else {
      let filterData: any;
      if (searchBy === "nameOfUser") {
        filterData = dataUser?.filter((item: any) => {
          return item?.userInfo?.name?.toLowerCase().includes(searchValue.toLowerCase());
        });
      } else if (searchBy === "nameOfManager") {
        filterData = dataUser?.filter((item: any) => {
          return item?.updateName.toLowerCase().includes(searchValue.toLowerCase());
        });
      }
      setDataForSearch(filterData);
    }
  }, [searchBy, searchValue]);

  return (
    <div className={classes.root}>
      {renderDialog()}
      <Box sx={{ mb: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Grid container item xs={12} spacing={1} sx={{ width: "100%" }}>
            <Grid item xs={8} md={8} sx={{ minWidth: "20%" }}>
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
                        <MenuItem value="nameOfManager">Tên người quản lí</MenuItem>
                      </Select>
                    ),
                  }}
                  id="outlined-basic"
                  placeholder="Tìm kiếm ..."
                  variant="outlined"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                />
              </Box>
            </Grid>
            <Grid item xs={4} md={4}>
              <Box display="flex" sx={{ justifyContent: "flex-end" }}>
                <Button
                  startIcon={<AddCircleOutlineRoundedIcon />}
                  variant="contained"
                  color="primary"
                  onClick={() => setOpenDialog(true)}>
                  Thêm cộng tác viên
                </Button>
              </Box>
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
                {dataForSearch
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
                        <IconButton
                          aria-label="Quản lí cộng tác viên"
                          onClick={() => handleOpenEdit(row?.userInfo, row?.updateName)}>
                          <Tooltip title="Quản lí cộng tác viên">
                            <EditIcon color="error" />
                          </Tooltip>
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
              <DialogEditManageCTV
                open={openDialogEdit}
                onClose={closeDialogEdit}
                data={userSelected}
                managerName={managerName}
                getListCollaborator={getListCollaborator}
              />
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
