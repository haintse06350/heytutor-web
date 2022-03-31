import React from "react";
import { useStyles } from "./ManagerUser.style";

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
  Divider,
} from "@mui/material";
// import DialogAddCTV from "../ManagerCTV/DialogAddCTV";
// icon
import SearchIcon from "@mui/icons-material/Search";
import VisibilityIcon from "@mui/icons-material/Visibility";
import BlockIcon from "@mui/icons-material/Block";
import StarIcon from "@mui/icons-material/Star";
export const ManagerUser = () => {
  const classes = useStyles();
  // const [openDialog, setOpenDialog] = useState(false);
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
    status: number
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
      1
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
      1
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
      2
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
      1
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
      2
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
      2
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
      1
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
      1
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
      1
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
      1
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
      1
    ),
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

  return (
    <div className={classes.wrapTableManager}>
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
              label="Sự kiện tham gia"
              defaultValue={1}
              sx={{ backgroundColor: "white", minWidth: "150px" }}>
              <MenuItem value={1}>Tăng dần</MenuItem>
              <MenuItem value={2}>Giảm dần</MenuItem>
            </TextField>
          </Box>
          <Box sx={{ mr: 2 }}>
            <TextField
              id="outlined-user"
              select
              label="Đã đăng"
              defaultValue={1}
              sx={{ backgroundColor: "white", minWidth: "150px" }}>
              <MenuItem value={1}>Đăng kí tăng dần</MenuItem>
              <MenuItem value={2}>Đăng kí giảm dần</MenuItem>
              <MenuItem value={3}>Bị báo cáo tăng dần</MenuItem>
              <MenuItem value={4}>Bị báo cáo giảm dần</MenuItem>
            </TextField>
          </Box>
        </Box>
      </Box>
      <TableContainer component={Paper}>
        <Typography variant="h6">Thống kê đang diễn ra</Typography>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell>Tên</TableCell>
              <TableCell>Sự kiện</TableCell>
              <TableCell>Vấn đề</TableCell>
              <TableCell>Hỗ trợ vấn đề</TableCell>
              <TableCell>Bị báo cáo</TableCell>
              <TableCell>
                <Box>Điểm đánh giá</Box>

                <Box sx={{ display: "flex" }}>
                  <Typography variant="subtitle2" sx={{ color: "#5ab4ec" }}>
                    Cần hỗ trợ
                  </Typography>

                  <Divider orientation="vertical" flexItem sx={{ mr: 1, ml: 1 }} />

                  <Typography variant="subtitle2" sx={{ color: "#b244ee" }}>
                    Đi hỗ trợ
                  </Typography>
                </Box>
              </TableCell>
              <TableCell>Trạng thái</TableCell>
              <TableCell>Hành động</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell>
                  <Typography variant="subtitle1">{row.name}</Typography>
                  <Typography variant="subtitle2">{row.gmail}</Typography>
                </TableCell>
                <TableCell>{row.nbOfEventJoined + Math.floor(Math.random() * 10) + 1}</TableCell>
                <TableCell>{row.nbOfRegisted + Math.floor(Math.random() * 10) + 1}</TableCell>
                <TableCell>{row.nbOfRequested + Math.floor(Math.random() * 10) + 1}</TableCell>
                <TableCell>
                  <Typography variant="subtitle2">
                    Chưa giải quyết:{row.nbOfReport + Math.floor(Math.random() * 10) + 1}/
                    {row.nbOfReport + Math.floor(Math.random() * 10) + 2}
                  </Typography>
                </TableCell>
                <TableCell sx={{ display: "flex", alignItem: "center", justifyContent: "center" }}>
                  <Typography sx={{ color: "#5ab4ec" }}>
                    {row.ratePoint} <StarIcon />
                  </Typography>
                  <Typography sx={{ color: "#b244ee" }}>
                    {" "}
                    {row.ratePoint}
                    <StarIcon />
                  </Typography>
                </TableCell>
                <TableCell sx={{ color: row.status === 1 ? "green" : "red" }}>
                  {row.status === 1 ? (
                    <Chip label="Có hiệu lực" variant="outlined" color="primary" />
                  ) : (
                    <Chip label="Bị khóa" variant="outlined" color="error" />
                  )}
                </TableCell>

                <TableCell className={classes.iconMoreHoriz}>
                  <Tooltip title="Xem chi tiết">
                    <VisibilityIcon color="primary" />
                  </Tooltip>
                  <BlockIcon color="error" />
                </TableCell>
              </TableRow>
            ))}
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
