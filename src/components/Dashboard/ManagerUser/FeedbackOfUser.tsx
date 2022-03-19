import React, { useState } from "react";
import { useStyles } from "./ManagerUser.style";
import {
  TableCell,
  TableHead,
  TableRow,
  TableBody,
  Table,
  TableContainer,
  Paper,
  Tooltip,
  Menu,
  MenuItem,
  IconButton,
  Button,
  Grid,
  InputLabel,
  Select,
} from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
const FeedBackOfUser = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [orderById, setOrderById] = useState(true);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClickSort = () => {
    setOrderById(!orderById);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const [selectRoleUser, setSelectRoleUser] = useState(1);
  const [selectTime, setSelectTime] = useState(1);
  const [selectErrorType, setSelectErrorType] = useState(1);

  function createData(id: number, content: string, ability: string, timeFeedback: string, nameUser: string) {
    return {
      id,
      content,
      ability,
      timeFeedback,
      nameUser,
    };
  }
  const rows = [
    createData(1, "Màu sắc chưa nổi mật", "màu sắc ở home", "Hôm qua", "Cao Duc Anh"),
    createData(2, "Button đang gây hơi lệnh dòng", "vị trí button", "Hôm qua", "Nguyen Trung Hai"),
    createData(3, "chưa việt hóa title", "nôị dung title", "Hôm qua", "Cao Duc Em"),
  ];
  return (
    <>
      <Grid container className={classes.fillterFeedBack}>
        <Grid item lg={4} md={4} xs={12}>
          <InputLabel id="select-role-user">Vai trò</InputLabel>
          <Select value={selectRoleUser} onChange={(e) => setSelectRoleUser(e.target.value as number)}>
            <MenuItem value={1}>Người dùng bình thường</MenuItem>
            <MenuItem value={2}>Người đi giúp đỡ</MenuItem>
            <MenuItem value={3}>Người cần giúp đỡ</MenuItem>
          </Select>
        </Grid>
        <Grid item lg={4} md={4} xs={12}>
          <InputLabel id="select-role-user">Thời gian</InputLabel>
          <Select
            labelId="select-role-user"
            value={selectTime}
            onChange={(e) => setSelectTime(e.target.value as number)}>
            <MenuItem value={1}>Hôm nay</MenuItem>
            <MenuItem value={2}>Tuần này</MenuItem>
            <MenuItem value={3}>Tháng này</MenuItem>
            <MenuItem value={4}>Chọn thời gian</MenuItem>
          </Select>
        </Grid>
        <Grid item lg={4} md={4} xs={12}>
          <InputLabel id="select-role-user">Kiểu phản hồi</InputLabel>
          <Select value={selectErrorType} onChange={(e) => setSelectErrorType(e.target.value as number)}>
            <MenuItem value={1}>Lỗi</MenuItem>
            <MenuItem value={2}>Ý tưởng mới</MenuItem>
            <MenuItem value={3}>Khác</MenuItem>
          </Select>
        </Grid>
      </Grid>
      <TableContainer component={Paper} sx={{ mt: 2 }}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <div className={classes.tableBox}>
                <TableCell>Id</TableCell>
                {orderById ? (
                  <ArrowDownwardIcon onClick={handleClickSort} />
                ) : (
                  <ArrowUpwardIcon onClick={handleClickSort} />
                )}
              </div>

              <TableCell align="right">Nội dung góp ý</TableCell>
              <TableCell align="right">Tính năng</TableCell>
              <TableCell align="right">Thời gian</TableCell>
              <TableCell align="right">Tên người dùng</TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell align="right">{row.content}</TableCell>
                <TableCell align="right">{row.ability}</TableCell>
                <TableCell align="right">{row.timeFeedback}</TableCell>

                <TableCell align="right">{row.nameUser}</TableCell>
                <TableCell align="right" className={classes.iconMoreHoriz}>
                  <IconButton
                    aria-controls={open ? "account-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? "true" : undefined}
                    onClick={handleClick}>
                    <Tooltip title="Xem thêm">
                      <MoreHorizIcon />
                    </Tooltip>
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    id="account-menu"
                    open={open}
                    onClose={handleCloseMenu}
                    transformOrigin={{ horizontal: "right", vertical: "top" }}
                    anchorOrigin={{ horizontal: "right", vertical: "bottom" }}>
                    <MenuItem>
                      <VisibilityIcon /> Xem chi tiết
                    </MenuItem>
                  </Menu>
                </TableCell>
                <TableCell>
                  <Button>Trả lời</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
export default FeedBackOfUser;
