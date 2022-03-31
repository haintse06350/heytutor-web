import React from "react";
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
  Avatar,
  TextField,
  InputAdornment,
  MenuItem,
  Chip,
  TablePagination,
  Button,
} from "@mui/material";
// icon
import VisibilityIcon from "@mui/icons-material/Visibility";
import ChatIcon from "@mui/icons-material/Chat";
import EditIcon from "@mui/icons-material/Edit";
import SearchIcon from "@mui/icons-material/Search";
// help
import { stringAvatar } from "../../UserProfile/helper";
// component
import DialogDetailCTV from "./DialogDetailCTV";
import DialogEditManageCTV from "./DialogEditManageCTV";
const ManagerCTV = () => {
  const classes = useStyles();
  function createData(
    id: number,
    name: string,
    gmail: string,
    nbOfEventManager: number,
    nbOfEventDone: number,
    nbOfEventReported: number,
    approvedBy: string,
    status: number
  ) {
    return { id, name, gmail, nbOfEventManager, nbOfEventDone, nbOfEventReported, approvedBy, status };
  }

  const data = [
    createData(1, "Cao Duc Anh", "anhcd1@gmail.com", 1, 1, 1, "anhcdh4", 1),
    createData(2, "Cao Duc Anh", "anhcd5@gmail.com", 2, 2, 2, "anhcdh4", 2),
    createData(3, "Nguyen Trung Hai", "haint1@gmail.com", 1, 1, 1, "anhcdh4", 1),
    createData(4, "Le Huy Chuong", "chuonglh1@gmail.com", 1, 1, 1, "anhcdh4", 1),
    createData(5, "Nguyen DN Long", "longndn1@gmail.com", 2, 2, 2, "anhcdh4", 2),
    createData(6, "Nguyen DN Long", "longndn1@gmail.com", 2, 2, 2, "anhcdh4", 2),
    createData(7, "Le Huy Chuong", "chuonglh1@gmail.com", 1, 1, 1, "anhcdh4", 1),
    createData(8, "Nguyen Trung Hai", "haint1@gmail.com", 1, 1, 1, "anhcdh4", 1),
    createData(9, "Cao Duc Anh", "anhcd5@gmail.com", 2, 2, 2, "anhcdh4", 2),
    createData(10, "Cao Duc Anh", "anhcd1@gmail.com", 1, 1, 1, "anhcdh4", 1),
    createData(11, "Cao Duc Anh", "anhcd1@gmail.com", 1, 1, 1, "anhcdh4", 1),
    createData(12, "Cao Duc Anh", "anhcd5@gmail.com", 2, 2, 2, "anhcdh4", 2),
    createData(13, "Nguyen Trung Hai", "haint1@gmail.com", 1, 1, 1, "anhcdh4", 1),
    createData(14, "Le Huy Chuong", "chuonglh1@gmail.com", 1, 1, 1, "anhcdh4", 1),
    createData(15, "Nguyen DN Long", "longndn1@gmail.com", 2, 2, 2, "anhcdh4", 2),
  ];
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const [openDialogViewDetail, setOpenDialogViewDetail] = React.useState(false);
  const handleOpenViewDetail = () => {
    setOpenDialogViewDetail(true);
  };

  const closeDialogViewDetail = () => {
    setOpenDialogViewDetail(false);
  };

  const [openDialogEdit, setOpenDialogEdit] = React.useState(false);
  const handleOpenEdit = () => {
    setOpenDialogEdit(true);
  };
  const closeDialogEdit = () => {
    setOpenDialogEdit(false);
  };

  return (
    <div className={classes.root}>
      <Box sx={{ mb: 2 }}>
        <Box sx={{ display: "flex" }}>
          <Box sx={{ mr: 2 }}>
            <TextField
              id="outlined-search"
              label="Tìm kiếm"
              sx={{ backgroundColor: "white" }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              variant="outlined"
            />
          </Box>
          <Box sx={{ mr: 2 }}>
            <TextField
              id="outlined-status"
              select
              label="Trạng thái"
              defaultValue={1}
              sx={{ backgroundColor: "white" }}>
              <MenuItem value={1}>Tất cả</MenuItem>
              <MenuItem value={2}>Có hiệu lực</MenuItem>
              <MenuItem value={3}>Đã khóa</MenuItem>
            </TextField>
          </Box>
          <Box sx={{ mr: 2 }}>
            <TextField
              id="outlined-event"
              select
              label="Sự kiện"
              defaultValue={1}
              sx={{ backgroundColor: "white", minWidth: "150px" }}>
              <MenuItem value={1}>Đang quản lí tăng dần</MenuItem>
              <MenuItem value={2}>Đang quản lí giảm dần</MenuItem>
              <MenuItem value={3}>Tạo mới tăng dần</MenuItem>
              <MenuItem value={4}>Tạo mới giảm dần</MenuItem>
            </TextField>
          </Box>
          <Box sx={{ mr: 2 }}>
            <TextField
              id="outlined-user"
              select
              label="Người dùng"
              defaultValue={1}
              sx={{ backgroundColor: "white", minWidth: "150px" }}>
              <MenuItem value={1}>Người dùng bị báo cáo tăng dần</MenuItem>
              <MenuItem value={2}>Người dùng bị báo cáo giảm dần</MenuItem>
              <MenuItem value={3}>Bài đăng báo cáo tăng dần</MenuItem>
              <MenuItem value={4}>Bài đăng báo cáo giảm dần</MenuItem>
            </TextField>
          </Box>
          <Box sx={{ mr: 2 }}>
            <TextField
              id="outlined-view"
              select
              label="Hiển thị"
              defaultValue={1}
              sx={{ backgroundColor: "white", minWidth: "150px" }}>
              <MenuItem value={1}>Thông số sự kiện</MenuItem>
              <MenuItem value={2}>Thông số người</MenuItem>
              <MenuItem value={3}>Cả hai</MenuItem>
            </TextField>
          </Box>
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
                  <TableCell>Thông số báo cáo</TableCell>
                  <TableCell>Thêm bởi</TableCell>
                  <TableCell>Trạng thái</TableCell>
                  <TableCell>Hành động</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
                  <TableRow key={row.id}>
                    <TableCell component="th" scope="row">
                      {row.id}
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: "flex" }}>
                        <Box sx={{ mr: 1 }}>
                          <Avatar {...stringAvatar(row.name)}></Avatar>
                        </Box>
                        <Box>
                          <Typography variant="subtitle1">{row.name}</Typography>
                          <Typography variant="subtitle2">{row.gmail}</Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle1">Đang quản lí : {row.nbOfEventManager}</Typography>
                      <Typography variant="subtitle1">Chờ phê duyệt : {row.nbOfEventManager}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle1">Người dùng : {row.nbOfEventManager}</Typography>
                      <Typography variant="subtitle1">Bài đăng : {row.nbOfEventManager}</Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle1">{row.approvedBy}</Typography>
                    </TableCell>

                    <TableCell sx={{ color: row.status === 1 ? "green" : "red" }}>
                      {row.status === 1 ? (
                        <Chip label="Có hiệu lực" variant="outlined" color="primary" />
                      ) : (
                        <Chip label="Bị khóa" variant="outlined" color="error" />
                      )}
                    </TableCell>
                    <TableCell>
                      {/* xem chi tiết */}
                      <IconButton aria-label="Xem chi tiết" onClick={handleOpenViewDetail}>
                        <Tooltip title="Xem chi tiết">
                          <VisibilityIcon color="primary" />
                        </Tooltip>
                        <DialogDetailCTV open={openDialogViewDetail} onClose={closeDialogViewDetail} />
                      </IconButton>

                      {/* Trao đổi với CTV */}
                      <IconButton aria-label="Trao đổi với CTV">
                        <Tooltip title="Trao đổi">
                          <ChatIcon sx={{ color: "#1172f4" }} />
                        </Tooltip>
                      </IconButton>
                      {/* Ban cộng tác viên */}

                      <Button endIcon={<EditIcon />} onClick={handleOpenEdit}>
                        Chỉnh sửa
                      </Button>
                      <DialogEditManageCTV open={openDialogEdit} onClose={closeDialogEdit} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 20]}
            component="div"
            count={data.length}
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
