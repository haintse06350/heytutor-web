import React, { useState } from "react";

import {
  Box,
  Card,
  Grid,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Menu,
  Tooltip,
  MenuItem,
} from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import VisibilityIcon from "@mui/icons-material/Visibility";
const HomeManageCTV = () => {
  function createData(name: string, calories: number, fat: number, carbs: number, protein: number) {
    return { name, calories, fat, carbs, protein };
  }

  const rows = [
    createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
    createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
    createData("Eclair", 262, 16.0, 24, 6.0),
    createData("Cupcake", 305, 3.7, 67, 4.3),
    createData("Gingerbread", 356, 16.0, 49, 3.9),
  ];

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  return (
    <Box>
      <Grid container>
        {/* header */}
        <Grid container item spacing={2}>
          {/* thong tin event can xu li */}
          <Grid item xs={12} md={4} lg={4}>
            <Card sx={{ p: 2 }}>
              <Typography variant="subtitle1">Người dùng bị báo cáo</Typography>
              <Typography variant="subtitle2">Báo cáo mới: 5/12</Typography>
              <Box sx={{ display: "flex", overFlow: "scroll" }}>
                <Card sx={{ width: "fit-content", mr: 1, display: "flex", p: 1 }}>
                  <Typography variant="subtitle2">#hashTagEvent</Typography>
                  <Typography variant="subtitle2" sx={{ color: "red", ml: 0.5 }}>
                    2
                  </Typography>
                </Card>
                <Card sx={{ width: "fit-content", mr: 1, display: "flex", p: 1 }}>
                  <Typography variant="subtitle2">#hashTagEvent</Typography>
                  <Typography variant="subtitle2" sx={{ color: "red", ml: 0.5 }}>
                    2
                  </Typography>
                </Card>
                <Card sx={{ width: "fit-content", mr: 1, display: "flex", p: 1 }}>
                  <Typography variant="subtitle2">#PRJ</Typography>
                  <Typography variant="subtitle2" sx={{ color: "red", ml: 0.5 }}>
                    1
                  </Typography>
                </Card>
              </Box>
            </Card>
          </Grid>
          <Grid item xs={12} md={4} lg={4}>
            <Card sx={{ p: 2 }}>
              <Typography variant="subtitle1">Bài đăng bị báo cáo</Typography>
              <Typography variant="subtitle2">Báo cáo mới: 5/12</Typography>

              <Box sx={{ display: "flex", overFlow: "scroll" }}>
                <Card sx={{ width: "fit-content", mr: 1, display: "flex", p: 1 }}>
                  <Typography variant="subtitle2">#hashTagEvent</Typography>
                  <Typography variant="subtitle2" sx={{ color: "red", ml: 0.5 }}>
                    2
                  </Typography>
                </Card>
                <Card sx={{ width: "fit-content", mr: 1, display: "flex", p: 1 }}>
                  <Typography variant="subtitle2">#hashTagEvent</Typography>
                  <Typography variant="subtitle2" sx={{ color: "red", ml: 0.5 }}>
                    2
                  </Typography>
                </Card>
                <Card sx={{ width: "fit-content", mr: 1, display: "flex", p: 1 }}>
                  <Typography variant="subtitle2">#PRJ</Typography>
                  <Typography variant="subtitle2" sx={{ color: "red", ml: 0.5 }}>
                    1
                  </Typography>
                </Card>
              </Box>
            </Card>
          </Grid>
          <Grid item xs={12} md={4} lg={4}>
            <Card sx={{ p: 2 }}>
              <Typography variant="subtitle1">Sự kiện được giao quản lí</Typography>
              <Typography variant="subtitle2">Sự kiện được giao mới: 5</Typography>
            </Card>
          </Grid>
        </Grid>
        {/* content */}
        <Grid container item spacing={2} sx={{ mt: 1 }}>
          <Grid item>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Tên sự kiên</TableCell>
                    <TableCell align="left">Số người bị báo cáo</TableCell>
                    <TableCell align="left">Số người báo cáo</TableCell>
                    <TableCell align="left"></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow key={row.name} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell align="left">{row.calories}</TableCell>
                      <TableCell align="left">{row.carbs}</TableCell>
                      <TableCell align="left">
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
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default HomeManageCTV;
