import React, { useState } from "react";
import { useStyles } from "./ManagerUser.style";
import { Tooltip, Menu, MenuItem, IconButton } from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import VisibilityIcon from "@mui/icons-material/Visibility";
import MoodBadIcon from "@mui/icons-material/MoodBad";
import { TableCell, TableHead, TableRow, TableBody, Table, TableContainer, Paper } from "@mui/material";
export const ManagerUser = () => {
  const classes = useStyles();
  const [orderById, setOrderById] = useState(true);

  function createData(id: number, name: string, status: number, position: string) {
    return {
      id,
      name,
      status,
      position,
    };
  }

  const rows = [
    createData(1, "Cao Duc Anh", 1, "supporter"),
    createData(2, "Cao Duc Anh", 2, "supporter"),
    createData(3, "Nguyen Trung Hai", 1, "supporter"),
    createData(4, "Le Huy Chuong", 1, "user"),
    createData(5, "Nguyen DN Long", 2, "user"),
  ];

  const handleClickSort = () => {
    setOrderById(!orderById);
  };

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  return (
    <div className={classes.wrapTableManager}>
      <TableContainer component={Paper}>
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
              <TableCell align="right">Tên</TableCell>
              <TableCell align="right">Trạng thái</TableCell>
              <TableCell align="right">Vị trí</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell align="right">{row.name}</TableCell>
                <TableCell align="right">{row.status}</TableCell>
                <TableCell align="right">{row.position}</TableCell>
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
                    <MenuItem>
                      <MoodBadIcon /> Cấm/bỏ cấm
                    </MenuItem>
                  </Menu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ManagerUser;
