/* eslint-disable no-unused-vars */
import React from "react";
// import { useNavigate } from "react-router-dom";
import { useStyles } from "./DetailPage.style";
import Page from "../../layout/Page";
import {
  Box,
  Paper,
  TextField,
  InputAdornment,
  MenuItem,
  Grid,
  TableHead,
  TableRow,
  TableCell,
  Checkbox,
  TableSortLabel,
  TableContainer,
  Table,
  TableBody,
  TablePagination,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import BreadcrumbsTab from "../Common/Breadcrumbs/Breadcrumbs";
import { visuallyHidden } from "@mui/utils";

const filterOptions = [
  {
    value: "all",
    label: "All",
  },
  {
    value: "registered",
    label: "Registered",
  },
  {
    value: "confirmed",
    label: "Confirmed",
  },
  {
    value: "pending",
    label: "Pending",
  },
  {
    value: "active",
    label: "Active",
  },
  {
    value: "done",
    label: "Done",
  },
];

type Order = "asc" | "desc";

interface Post {
  id: number;
  title: string;
  content: string;
  hashtag: string;
  registeredCount: number;
  commentCount: number;
  createdAt: string;
}

const headCells = [
  {
    id: "id",
    numeric: true,
    disablePadding: true,
    label: "#",
  },
  {
    id: "title",
    numeric: false,
    disablePadding: false,
    label: "Title",
  },
  {
    id: "content",
    numeric: false,
    disablePadding: false,
    label: "Content",
  },
  {
    id: "hashtag",
    numeric: false,
    disablePadding: false,
    label: "Hashtag",
  },
  {
    id: "registeredCount",
    numeric: true,
    disablePadding: false,
    label: "Registered Count",
  },
  {
    id: "commentCount",
    numeric: true,
    disablePadding: false,
    label: "Comment Count",
  },
  {
    id: "createdAt",
    numeric: false,
    disablePadding: false,
    label: "Created At",
  },
];

function createData(
  id: number,
  title: string,
  content: string,
  hashtag: string,
  registeredCount: number,
  commentCount: number,
  createdAt: string
): Post {
  return {
    id,
    title,
    content,
    hashtag,
    registeredCount,
    commentCount,
    createdAt,
  };
}

const rows = [
  createData(1, "help me with csd", "co ai nhan support PE mon CSD khong", "CSD", 67, 43, "2022-02-28 09:43:09"),
  createData(
    2,
    "Nhan sp PRO, DBI, WED",
    "Mình nhận sp PE các môn code PRO, DBI, WED nhé Các bạn cần có thể ib mình",
    "CSD",
    51,
    49,
    "2022-02-28 09:43:09"
  ),
  createData(
    3,
    "Help lap thay haint",
    "Các ac ơi,HL có gv nào dạy lab dễ dễ ko ạ. Chứ em học thầy hailt tới bh mới kiếm đc 110 loc.",
    "CSD",
    24,
    60,
    "2022-02-28 09:43:09"
  ),
  createData(
    4,
    "Nhan sp MAD101, MAE101",
    "Nhận sp progress test 2 MAD101, MAE101 , assignment, homework...",
    "CSD",
    24,
    40,
    "2022-02-28 09:43:09"
  ),
  createData(
    5,
    "Can ng sp PRN211",
    "Mình cần người SP môn prn211giá cả thoả thận ạ",
    "CSD",
    49,
    39,
    "2022-02-28 09:43:09"
  ),
  createData(6, "Nhan sp DBI,JAVA, JAVAWEB", "Mình nhận làm sp PRJ", "CSD", 87, 65, "2022-02-28 09:43:09"),
];

export const DetailPage = () => {
  const classes = useStyles();
  // const navigate = useNavigate();
  const urlParams = new URLSearchParams(window.location.search);
  const pathname = window.location.pathname;
  const detail = urlParams.get("detail");

  const isMyRequest = pathname.includes("my-request");
  const isRegistered = pathname.includes("registered-request");

  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [selected, setSelected] = React.useState<readonly number[]>([]);
  const [order, setOrder] = React.useState<Order>("asc");
  const [orderBy, setOrderBy] = React.useState<keyof Post>("createdAt");

  const [filter, setFilter] = React.useState("all");

  const onChangeFilter = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilter(event.target.value);
  };

  React.useEffect(() => {
    if (detail) {
      setFilter(detail);
    }
  }, [detail]);

  const EnhancedTableHead = (props: any) => {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
    const createSortHandler = (property: keyof Post) => (event: React.MouseEvent<unknown>) => {
      onRequestSort(event, property);
    };

    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox
              color="primary"
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
              inputProps={{
                "aria-label": "select all desserts",
              }}
            />
          </TableCell>
          {headCells.map((headCell: any) => (
            <TableCell
              key={headCell.id}
              align={"center"}
              padding={"normal"}
              sortDirection={orderBy === headCell.id ? order : false}>
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : "asc"}
                onClick={createSortHandler(headCell.id)}>
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === "desc" ? "sorted descending" : "sorted ascending"}
                  </Box>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      // const newSelecteds = rows.map((n) => n.name);
      // setSelected(newSelecteds);
      // return;
    }
    setSelected([]);
  };

  const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof Post) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  function stableSort<T>(array: readonly T[], comparator: (a: T, b: T) => number) {
    const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) {
        return order;
      }
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

  function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  function getComparator<Key extends keyof any>(
    order: Order,
    orderBy: Key
  ): (a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number {
    return order === "desc"
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  const handleClick = (event: React.MouseEvent<unknown>, id: number) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: readonly number[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }

    setSelected(newSelected);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;
  const isSelected = (id: number) => selected.indexOf(id) !== -1;

  return (
    <Box sx={{ mt: 10 }}>
      <Page className={classes.detailRoot}>
        <Box sx={{ pb: 5 }}>
          <BreadcrumbsTab
            history={[{ title: "Home", href: "/" }]}
            current={{ title: isMyRequest ? "My requests" : isRegistered ? "Registered Requests" : "" }}
          />
        </Box>
        <Box sx={{ pb: 3 }}>
          <Paper elevation={2}>
            <Box sx={{ p: 2, width: "100%" }}>
              <Box component="form" noValidate autoComplete="off">
                <TextField
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  }}
                  id="outlined-basic"
                  placeholder={`Search for a ${isRegistered ? "request" : "post"}`}
                  variant="outlined"
                />
              </Box>
            </Box>

            <Grid container spacing={1}>
              <Grid item xs={6}>
                <Box sx={{ px: 2, pb: 2, width: "100%" }}>
                  <Box component="form" noValidate autoComplete="off">
                    <TextField
                      fullWidth
                      id="outlined-select-currency"
                      select
                      label="Request status"
                      value={filter}
                      onChange={onChangeFilter}>
                      {filterOptions.map((option: any) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Box>
                </Box>
              </Grid>
              <Grid item xs={6}>
                <Box sx={{ px: 2, pb: 2, width: "100%" }}>
                  <Box component="form" noValidate autoComplete="off">
                    <TextField
                      fullWidth
                      id="outlined-select-currency"
                      select
                      label="Request status"
                      value={filter}
                      onChange={onChangeFilter}>
                      {filterOptions.map((option: any) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Box>
        <Box sx={{ pb: 5, width: "100%" }}>
          <Paper sx={{ width: "100%" }} elevation={2}>
            <TableContainer>
              <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size={dense ? "small" : "medium"}>
                <EnhancedTableHead
                  numSelected={selected.length}
                  order={order}
                  orderBy={orderBy}
                  onSelectAllClick={handleSelectAllClick}
                  onRequestSort={handleRequestSort}
                  rowCount={rows.length}
                />
                <TableBody>
                  {/* if you don't need to support IE11, you can replace the `stableSort` call with:
              rows.slice().sort(getComparator(order, orderBy)) */}
                  {stableSort(rows, getComparator(order, orderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => {
                      const isItemSelected = isSelected(row.id);
                      const labelId = `enhanced-table-checkbox-${index}`;

                      return (
                        <TableRow
                          hover
                          onClick={(event) => handleClick(event, row.id)}
                          role="checkbox"
                          aria-checked={isItemSelected}
                          tabIndex={-1}
                          key={row.id}
                          selected={isItemSelected}>
                          <TableCell padding="checkbox">
                            <Checkbox
                              color="primary"
                              checked={isItemSelected}
                              inputProps={{
                                "aria-labelledby": labelId,
                              }}
                            />
                          </TableCell>
                          <TableCell align="center">{row.id}</TableCell>
                          <TableCell size="medium" align="center">
                            {row.title}
                          </TableCell>
                          <TableCell align="center">{row.content}</TableCell>
                          <TableCell align="center">{row.hashtag}</TableCell>
                          <TableCell align="center">{row.commentCount}</TableCell>
                          <TableCell align="center">{row.registeredCount}</TableCell>
                          <TableCell align="center">{row.createdAt}</TableCell>
                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow
                      style={{
                        height: (dense ? 33 : 53) * emptyRows,
                      }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </Box>
      </Page>
    </Box>
  );
};
